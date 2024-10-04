"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import comovaificar from '../../assets/como vai ficar 👇.png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import app from "../../lib/firebase";

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
    const [link, setLink] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [countLength, setCountLength] = useState<number>(0);
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
    const handleFileChange = async (event: any) => {
        if (event.target.files) {
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
        const idUserLocal = localStorage.getItem("idUserMyLoverTik");

        // if (idUserLocal) {
        //     setIdUser(idUserLocal);
        //     setLink(idUserLocal)
        //     return;
        // }

        // Gera um novo UUID e define no localStorage
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
                    idUser,
                }),
            });

            // if (!response.ok) {
            //     throw new Error('Erro ao criar a sessão de pagamento');
            // }
            const stripeClient = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
            );
            console.log(stripeClient)
            if (!stripeClient) throw new Error("Stripe failed to initialize.");
            const { sessionId } = await response.json();

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
            const { error, success } = await createCouple(idUser, nameCouple, dataCouple, hour, imgUpload, message, youtubeLink)
            if (error) {
                setLoading(false)
                return alert(error);
            }
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
            setCountLength(images.length)
        }

        if (images.length > 2) {
            return { imgUpload: images }; // Retorna o array de imagens se houver mais de 2
        }

        return { errorImg: "Sem imagem carregada!" }; // Retorna mensagem de erro se não houver imagens
    }


    {/* <CheckoutButton productName={typeProduct === 1 ? "1 ano, 3 fotos e sem música - R$14,99" : "Pra sempre, 7 fotos e com música - R$34,99"} productPrice={typeProduct} /> */ }



    function handleGenerator() {
    }
    return (
        <main className=" md:p-10">
            <section className="">
                <h1 className="text-redDefault md:text-6xl text-3xl font-black pulsando-sombra">Surpreenda alguém especial!</h1>
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
                <aside className='flex gap-4 flex-col items-center'>
                    <Image width={180} quality={100} alt='comovaificar ' src={comovaificar} />
                    <div className="flex flex-col">
                        <div className=" border bg-[#180d21]  border-white rounded-xl max-h-[450px] myscroll overflow-y-auto w-80 px-10">
                            <div className="mt-4 bg-white h-7 w-full flex justify-center items-center rounded-md">
                                <div className="w-96 h-7 overflow-hidden myscroll overflow-x-auto whitespace-nowrap">
                                    <p className="text-center px-2 ">
                                        dominio.com/{nameCouple.trim().replaceAll(" ", "-")}
                                    </p>
                                </div>
                            </div>
                            <div className={`previewURLsPhoto my-10 flex justify-center items-center mt-4 ${previewURLs.length > 0 ? "" : "h-96"} rounded-md  w-full px-4 `}>
                                {
                                    previewURLs.length > 0 ?
                                        <MySwiper previewURLs={previewURLs} />
                                        :
                                        <Image alt="icon-imagem" src={iconImg} width={40} height={40} />
                                }
                            </div>
                            {hour && <ContadorEterno initialDate={dataCouple} initialHour={hour} />}
                            {hour && <p className=' text-white text-center mt-3 text-xs'>{message}</p>}
                        </div>


                        {/* <Button bg={"slategray"} onClick={() => handleUpload()} textColor={'white'} className="border text-white mt-3"> enviar fotos</Button> */}
                        <Button bg={"#DA4A4A"} _hover={"black"} fontSize={13} onClick={() => handlerSubmit()} textColor={'white'} className="border text-xs hover:bg-[#A61111] text-white mt-3"> {loading ? `Salvando fotos ${countLength}/${typeProduct === 1 ? "3" : "6"}` : "Salvar"}</Button>
                    </div>
                </aside>
            </div>

        </main>
    )
}