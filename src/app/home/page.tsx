"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Divider, Input, Textarea, useToast } from "@chakra-ui/react";
import Confetti from "react-confetti"
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import logo from '../../assets/logoLove.png'
import comovaificar from '../../assets/como vai ficar 👇.png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import app from "../../lib/firebase";

import { createCouple } from '../../../actions/couple';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import Footer from '../components/footer';
interface responseUpload {
    imgUpload?: string[] | undefined // Propriedade opcional para URLs de imagem
    errorImg?: string; // Propriedade opcional para mensagens de erro
}
interface customerProps {
    customerId: string// Propriedade opcional para URLs de imagem
}

import { useForm } from 'react-hook-form';

export default function Presentation() {
    const storage = getStorage(app)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast()
    const [hour, setHour] = useState<string>("")
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validateFieds, setValidateFieds] = useState<boolean>(false);
    const [nameCouple, setNameCouple] = useState<string>("")
    const [cpfCnpj, setCpfCnpj] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [youtubeLink, setYoutubeLink] = useState<string>("")
    const [typeProduct, setTypeProduct] = useState<number>(1)
    const [dataCouple, setDataCouple] = useState<string>("")
    const [imageCouple, setImageCouple] = useState<any>([])
    const [message, setMessage] = useState<string>("")
    const [previewURLs, setPreviewURLs] = useState<[]>([])
    const [idUser, setIdUser] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = regexEmoji(e);
        setNameCouple(cleanedValue);
    };
    const handleFileChange = async (event: any) => {
        if (event.target.files) {
            startConfetti()
            const files: any = Array.from(event.target.files); // Converte FileList para array de File
            if (typeProduct == 1) {
                let fileTruncated3 = files.slice(0, 3)
                setImageCouple(fileTruncated3);
                const fileURLs = fileTruncated3.map((file: any) => URL.createObjectURL(file));
                setPreviewURLs(fileURLs);
            }
            if (typeProduct == 2) {
                let fileTruncated7 = files.slice(0, 6)
                setImageCouple(fileTruncated7);
                const fileURLs = fileTruncated7.map((file: any) => URL.createObjectURL(file));
                setPreviewURLs(fileURLs);
            }

        }
    };
    useEffect(() => {
        setPreviewURLs([])

        const newId = uuidv4();
        try {
            localStorage.setItem("idUserMyLoverTik", newId);
            setIdUser(newId);
        } catch (error) {
            console.error("Erro ao armazenar o ID do usuário:", error);
        }

    }, [])

    const handleCheckout = async () => {
        setLoading(true);
        try {

            const response = await fetch(`/api/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    typeProduct,
                    idUser
                }),
            });

            const stripeClient = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
            );
            if (!stripeClient) throw new Error("Stripe failed to initialize.");
            const { sessionId } = await response.json();
            console.log(sessionId)
            await stripeClient.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Erro ao redirecionar para o checkout:', error);
            toast({
                title: 'Erro',
                description: 'Não foi possível iniciar o checkout.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };
    // async function validateFields(data: any) {
    //     if (!data.date || !data.name_couple || !data.time_couple) {
    //         return { value: false }
    //     }

    //     return { value: true }
    // }
    async function handlerSubmit(data: any) {
        // const { value } = await validateFields(data)
        // if (!value) {
        //     return setValidateFieds(false)
        // }

        // setValidateFieds(true)

        if (imageCouple.length == 0) {
            return toast({
                title: 'Preencha as imagens',
                description: "",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        console.log("aqui: ", data);
        setLoading(true)
        const { imgUpload, errorImg } = await handleUpload()
        if (imgUpload && !errorImg) {
            const { success } = await createCouple(idUser, nameCouple, dataCouple, hour, imgUpload, message, youtubeLink)
            if (success) {
                return handleCheckout()
            }
            setLoading(false)
            return
        }

        toast({
            title: 'Algum dado não foi preenchido',
            description: "",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        setLoading(false)

    }


    async function handleUpload(): Promise<responseUpload> {
        const uploads = imageCouple.map((image: any) => {
            const storageRef = ref(storage, `user/${idUser}/images/${image?.name}`);
            return uploadBytes(storageRef, image) // Faz o upload de cada foto
                .then((snapshot) => {

                    return getDownloadURL(snapshot.ref); // Obtém a URL de download
                })
                .catch((error) => {
                    console.error(`Erro ao enviar foto ${image}:`, error);
                });
        })

        try {
            const urls = await Promise.all(uploads);
            return { imgUpload: urls }
        } catch (error) {
            console.error("Erro ao enviar as fotos:", error);
            return { errorImg: "Algo deu errado!" }
        }
    }


    async function startConfetti() {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Formatar a data no padrão yyyy-mm-dd
    const dueDate = tomorrow.toISOString().split('T')[0];

    async function generatoClient(name: string, cpfCnpj: string): Promise<customerProps> {
        const response = await fetch('/api/create-client-pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                cpfCnpj: cpfCnpj
            })
        });

        const customer = await response.json();
        return { customerId: customer.customersData.id }
    }
    async function generatorPix() {
        if (!name || !cpfCnpj) return alert("preencha cpf e nome")
        const { customerId } = await generatoClient(name, cpfCnpj)
        if (!customerId) {
            console.log(customerId)
            return alert("Cliente inválido!")
        }
        const res = fetch('https://sandbox.asaas.com/api/v3/payments', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'user-agent': 'tikloveyuu',
                access_token: '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwOTE4NzE6OiRhYWNoXzY4ZWRhYTRlLTY4OWEtNGEzNi05OTllLTQ3ZDVhODI4OTA3MA==' // Substitua 'MyKey' pela sua chave de API real
            },
            body: JSON.stringify({
                customer: customerId,
                billingType: 'PIX',
                value: 1000, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
                dueDate: dueDate

            })
        })

        console.log(await res)
    }
    return (
        <>
            {/* <Button onClick={() => generatorPix()}>Gerador</Button>
            <Input onChange={(e) => setName(e.target.value)} value={name} />
            <Input onChange={(e) => setCpfCnpj(e.target.value)} value={cpfCnpj} /> */}
            <main className=" max-w-[1000px] m-auto  px-3">
                <div><Image alt='logo' width={150} className='m-auto pb-10 py-2' src={logo} /></div>
                <section className="">
                    <h1 className="text-redDefault md:text-6xl text-3xl font-black boujee-text2">Surpreenda alguém especial!</h1>
                    <p className="text-white md:text-xl text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                        Crie um contador dinâmico para acompanhar o tempo do seu relacionamento. Preencha o formulário e receba seu site personalizado, junto com um QR Code para compartilhar com a pessoa especial!🙂
                    </p>
                </section>
                <div className="flex md:flex-row flex-col justify- items-center md:gap-10 gap-4">
                    <section className="max-w-[800px] w-full">
                        <div>
                            <FormPaymentInputs setSelectedInput={(e) => setTypeProduct(e)} />
                            <form className="flex md:flex-row flex-col items-end md:gap-4 mt-5">
                                <label className="w-full text-white">
                                    <p className="text-white md:text-xs text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                        Nome do casal:
                                    </p>
                                    <Input borderColor={errors.name_couple ? "red" : "white"} {...register('name_couple', { required: true })} onChange={handleChange} fontSize={13} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white text-sm" />
                                </label>
                                <div className='flex flex-row items-end w-full gap-3 justify-center'>
                                    <label className="md:max-w-40 w-full text-white flex flex-col  ">
                                        <p className="text-white md:text-xs text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Inicio do relacionamento:
                                        </p>
                                        <Input borderColor={errors.date ? "red" : "white"} {...register('date', { required: true })} onChange={(e) => setDataCouple(e.target.value)} fontSize={13} value={dataCouple} type="date" id="date_couple" className=" text-white text-sm" />
                                    </label>
                                    <label className="text-white md:max-w-40 w-full">
                                        <p className="text-white md:text-xs text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Hora:
                                        </p>
                                        <Input borderColor={errors.time_couple ? "red" : "white"} {...register('time_couple', { required: true })} onChange={(e) => setHour(e.target.value)} fontSize={13} value={hour} type="time" id="time_couple" className="text-white text-sm" />
                                    </label>
                                </div>
                            </form>
                            <div className="flex flex-col gap-3 ">
                                <Textarea fontSize={13} onChange={(e) => setMessage(e.target.value)} value={message} height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white">

                                </Textarea>
                                <div className="flex flex-col">
                                    <p className="text-white">Escolha até {typeProduct === 1 ? "3" : "6"} fotos</p>
                                    <Input id='imagesFile' ref={fileInputRef} onChange={handleFileChange} type="file" accept=".png, .jpg, .jpeg" multiple={true} className="placeholder:text-white text-white flex justify-center items-center" />
                                    {typeProduct === 2 &&
                                        <label className="text-white  w-full mt-3">
                                            <p className="text-white">Música Youtube: (Opcional)</p>
                                            <Input onChange={(e) => setYoutubeLink(e.target.value)} type="text" value={youtubeLink} className="placeholder:text-white text-white flex text-sm justify-center items-center" />

                                        </label>}
                                </div>
                            </div>
                        </div>

                    </section>
                    <aside className='flex gap-4 flex-col items-center'>
                        <Image width={180} quality={100} alt='comovaificar ' src={comovaificar} />
                        <div className="flex flex-col">
                            <div className=" overflow-hidden relative border bg-[#180d21]   rounded-xl max-h-[540px] myscroll overflow-y-auto w-80 px-4">
                                {showConfetti && <Confetti />}
                                <div className="mt-4 bg-white h-7 w-full flex justify-center items-center rounded-md">
                                    <div className="w-96 h-7 overflow-hidden myscroll overflow-x-auto whitespace-nowrap">
                                        <p className="text-center px-2 ">
                                            tikloveyuu.com/{nameCouple.trim().replaceAll(" ", "-")}
                                        </p>
                                    </div>
                                </div>
                                <div className={`previewURLsPhoto my-10 flex relative justify-center items-center mt-4 ${previewURLs.length > 0 ? "" : "h-80"} rounded-md  w-full px-4 `}>
                                    {
                                        previewURLs.length > 0 ?
                                            <MySwiper previewURLs={previewURLs} />
                                            :
                                            <Image alt="icon-imagem" src={iconImg} width={40} height={40} />
                                    }
                                </div>
                                {hour && <ContadorEterno initialDate={dataCouple} initialHour={hour} />}
                                <Divider orientation='horizontal' className='my-3' />
                                {/* {hour && <p className=' text-white text-center mt-3 text-xs'>{message}</p>} */}
                            </div>
                            <button disabled={loading} onClick={handleSubmit(handlerSubmit)} className='border hover:bg-slate-600 bg-transparent duration-200 cursor-pointer flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">{loading ? "Criando site" : "Criar meu site"}
                                    {loading && <div className="pt-1 lds-circle"><div></div></div>}
                                </p>
                                {/* {!validateFieds && <p className='text-xs text-white'>Preencha os dados que faltam</p>} */}
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    )
}