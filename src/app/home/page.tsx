"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Divider, Input, Textarea, useToast } from "@chakra-ui/react";
import Confetti from "react-confetti"
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import logo from '../../assets/logoLove.png'
import comovaificar from '../../assets/como vai ficar 👇.png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import app from "../../lib/firebase";

import { createCouple } from '../../../actions/couple';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import stripe from '@/lib/stripe';
import Footer from '../components/footer';
interface responseUpload {
    imgUpload?: string[] | undefined // Propriedade opcional para URLs de imagem
    errorImg?: string; // Propriedade opcional para mensagens de erro
}


export default function Presentation() {
    const storage = getStorage(app)

    const toast = useToast()
    const [hour, setHour] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countLength, setCountLength] = useState<number>(0);
    const [nameCouple, setNameCouple] = useState<string>("")
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
            setIdUser(newId); // Atualiza o estado com o novo ID
            setLink(newId)

        } catch (error) {
            console.error("Erro ao armazenar o ID do usuário:", error);
            // Aqui você pode implementar um fallback, como redirecionar ou notificar o usuário
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

    async function handlerSubmit() {
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
            console.log("Todas as fotos foram enviadas!", urls);
            return { imgUpload: urls };; // Retorna as URLs das fotos salvas
        } catch (error) {
            console.error("Erro ao enviar as fotos:", error);
            return { errorImg: "Algo deu errado!" }
        }
    }

    // for (const image of imageCouple) {
    //     console.log(imageCouple)
    //     const storageRef = ref(storage, `user/${idUser}/images/${image?.name}`);
    //     await uploadBytes(storageRef, image);

    //     const downLoadURL = await getDownloadURL(storageRef);
    //     images.push(downLoadURL);
    //     setCountLength(images.length)
    // }

    // if (images.length > 0) {
    //     return { imgUpload: images }; 
    // }

    // return { errorImg: "Sem imagem carregada!" }; 


    async function startConfetti() {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

    }
    return (
        <>
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
                            <div className="flex md:flex-row flex-col items-end md:gap-4 mt-5">
                                <label className="w-full text-white">
                                    <p className="text-white md:text-xs text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                        Nome do casal:
                                    </p>
                                    <Input onChange={handleChange} fontSize={13} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white text-sm" />
                                </label>
                                <div className='flex flex-row items-end w-full gap-3 justify-center'>
                                    <label className="md:max-w-40 w-full text-white flex flex-col  ">
                                        <p className="text-white md:text-xs text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Inicio do relacionamento:
                                        </p>
                                        <Input onChange={(e) => setDataCouple(e.target.value)} fontSize={13} value={dataCouple} type="date" id="date_couple" className=" text-white text-sm" />
                                    </label>
                                    <label className="text-white md:max-w-40 w-full">
                                        <p className="text-white md:text-xs text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Hora:
                                        </p>
                                        <Input onChange={(e) => setHour(e.target.value)} fontSize={13} value={hour} type="time" id="time_couple" className="text-white text-sm" />
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <Textarea fontSize={13} onChange={(e) => setMessage(e.target.value)} value={message} height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white">

                                </Textarea>
                                <div className="flex flex-col">
                                    <p className="text-white">Escolha até {typeProduct === 1 ? "3" : "6"} fotos</p>
                                    <Input ref={fileInputRef} onChange={handleFileChange} type="file" accept=".png, .jpg, .jpeg" multiple={true} className="placeholder:text-white text-white flex justify-center items-center" />
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
                                <Divider orientation='horizontal' className='mt-3' />
                                {hour && <p className=' text-white text-center mt-3 text-xs'>{message}</p>}
                            </div>
                            <button disabled={loading} onClick={() => handlerSubmit()} className="border flex gap-2 items-center justify-center font-bold h-12 rounded-lg text-xl hover:bg-slate-600 bg-transparent duration-200 text-white mt-3">Criar meu site
                                {loading && <div className="pt-1 lds-circle"><div></div></div>}
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    )
}