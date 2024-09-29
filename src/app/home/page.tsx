"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import app from "../../lib/firebase";
// import CheckoutButton from '../components/checkoutButton';
import { createCouple } from '../../../actions/couple';
import { loadStripe, Stripe } from '@stripe/stripe-js';
interface responseUpload {
    imgUpload?: string[] | undefined; // Propriedade opcional para URLs de imagem
    errorImg?: string; // Propriedade opcional para mensagens de erro
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Presentation() {
    const storage = getStorage(app)

    const toast = useToast()
    const [hour, setHour] = useState<string>("")
    const [nameCouple, setNameCouple] = useState<string>("")
    const [youtubeLink, setYoutubeLink] = useState<string>("")
    const [typeProduct, setTypeProduct] = useState<number | undefined>(undefined)
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
    console.log(typeProduct)
    const handleFileChange = async (event: any) => {
        // console.log(event)
        if (event.target.files) {
            const files: any = Array.from(event.target.files); // Converte FileList para array de File
            // console.log(files)
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
        const idUserLocal = localStorage.getItem("idUserMyLoverTik");
        if (idUserLocal) return setIdUser(idUserLocal)

        const newId = localStorage.setItem("idUserMyLoverTik", uuidv4());
        if (newId !== null) {
            return
        }
        setIdUser(newId)

    }, [])


    async function handlerSubmit() {
        setLoading(true)
        const { imgUpload, errorImg } = await handleUpload()
        if (imgUpload && !errorImg) {
            const { error, success } = await createCouple(idUser, nameCouple, dataCouple, hour, imgUpload, message, youtubeLink)
            if (success) {
                return handleCheckout()
            }
            setLoading(false)
            console.log(error)
            return
        }

        toast({
            title: 'Algo deu errado',
            description: "",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        setLoading(false)

    }


    async function handleUpload(): Promise<responseUpload> {
        let images: string[] = []; // Definindo o tipo das imagens como string[]

        for (const image of imageCouple) {
            const storageRef = ref(storage, `user/${idUser}/images/${image?.name}`);
            await uploadBytes(storageRef, image);

            const downLoadURL = await getDownloadURL(storageRef);
            images.push(downLoadURL);
            console.log(downLoadURL);
        }

        if (images.length > 2) {
            return { imgUpload: images }; // Retorna o array de imagens se houver mais de 2
        }

        return { errorImg: "Sem imagem carregada!" }; // Retorna mensagem de erro se não houver imagens
    }


    const deleteFolder = async (userId: string | null) => {
        const folderRef = ref(storage, `user/${userId}/images`);
        const listRef = await listAll(folderRef);

        for (const item of listRef.items) {
            await deleteObject(item);
        }
    };


    const [loading, setLoading] = useState(false);
    {/* <CheckoutButton productName={typeProduct === 1 ? "1 ano, 3 fotos e sem música - R$14,99" : "Pra sempre, 7 fotos e com música - R$34,99"} productPrice={typeProduct} /> */ }

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const amount = typeProduct === 1 ? 1499 : typeProduct === 2 ? 3499 : 0; // Defina o valor correto em centavos

            const response = await fetch(`/api/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    idUser
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar a sessão de pagamento');
            }

            const { id } = await response.json();

            const stripe: Stripe | null = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({ sessionId: id });
                if (error) {
                    console.error('Erro ao redirecionar para o checkout:', error);
                }
            }
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
    return (
        <main className="md:p-10">
            <section className="">
                <h1 className="text-redDefault md:text-6xl text-3xl font-black pulsando-sombra">Surpreenda alguem especial!</h1>
                <p className="text-white md:text-xl text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                    Crie um contador dinâmico para acompanhar o tempo do seu relacionamento. Preencha o formulário e receba seu site personalizado, junto com um QR Code para compartilhar com a pessoa especial!🙂
                </p>
            </section>
            <div className="flex md:flex-row flex-col justify- items-center md:gap-10 gap-4">
                <section className="max-w-[800px] w-full">
                    <div>
                        <FormPaymentInputs setSelectedInput={(e) => setTypeProduct(e)} />
                        <div className="flex md:flex-row flex-col items-end md:gap-5 mt-5">
                            <label className="w-full text-white">
                                <p className="text-white md:text- text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                    Nome do casal:
                                </p>
                                <Input onChange={handleChange} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white " />
                            </label>
                            <div className='flex flex-row items-end w-full gap-3 justify-center'>
                                <label className="max-w-56 w-full text-white flex flex-col  ">

                                    <p className="text-white md:text- text-sm max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                        Inicio do relacionamento:
                                    </p>
                                    <Input onChange={(e) => setDataCouple(e.target.value)} value={dataCouple} type="date" id="date_couple" className=" text-white " />
                                </label>
                                <label className="text-white max-w-44 w-full">
                                    <Input onChange={(e) => setHour(e.target.value)} value={hour} type="time" id="time_couple" className="text-white " />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 ">
                            <Textarea onChange={(e) => setMessage(e.target.value)} value={message} height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white">

                            </Textarea>
                            <div className="flex flex-col">
                                <p className="text-white">Escolha até {typeProduct === 1 ? "3" : "6"} fotos</p>
                                <Input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" multiple={true} className="placeholder:text-white text-white flex justify-center items-center" />
                                {typeProduct === 2 &&
                                    <label className="text-white  w-full mt-3">
                                        <p className="text-white">Música Youtube: (Opcional)</p>
                                        <Input onChange={(e) => setYoutubeLink(e.target.value)} type="text" value={youtubeLink} className="placeholder:text-white text-white flex justify-center items-center" />
                                    </label>}
                            </div>
                        </div>
                    </div>

                </section>
                <aside>
                    <div className="flex flex-col">
                        <div className=" border bg-[#180d21]  border-white rounded-xl  w-80 px-10">
                            <div className="mt-4 bg-white h-7 w-full flex justify-center items-center rounded-md">
                                <div className="w-96 h-7 overflow-hidden myscroll overflow-x-auto whitespace-nowrap">
                                    <p className="text-center px-2 ">
                                        dominio.com/{nameCouple.trim().replaceAll(" ", "-")}
                                    </p>
                                </div>
                            </div>
                            <div className="previewURLsPhoto my-10 flex justify-center items-center mt-4 h-72 rounded-md  w-full px-4 ">
                                {
                                    previewURLs.length > 0 ?
                                        <MySwiper previewURLs={previewURLs} />
                                        :
                                        <Image alt="icon-imagem" src={iconImg} width={40} height={40} />
                                }
                            </div>
                            {hour && <ContadorEterno initialDate={dataCouple} initialHour={hour} />}
                        </div>


                        {/* <Button bg={"slategray"} onClick={() => handleUpload()} textColor={'white'} className="border text-white mt-3"> enviar fotos</Button> */}
                        <Button bg={"slategray"} onClick={() => handlerSubmit()} textColor={'white'} className="border text-white mt-3"> {loading ? "Salvando..." : "Salvar"}</Button>
                    </div>
                </aside>
            </div>

        </main>
    )
}