"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Separator, Stack, Textarea, } from "@chakra-ui/react";
import Confetti from "react-confetti"
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import logo from '../../assets/logoLove.png'
import pix from '../../assets/Logo-Pix.png'
import card from '../../assets/credit-card.png'
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import comovaificar from '../../assets/como vai ficar 👇.png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import app from "../../lib/firebase";
import CountUp from 'react-countup';

import { createCouple, updatecustomerId } from '../../../actions/couple';
import { loadStripe } from '@stripe/stripe-js';
import Footer from '../components/footer';
interface responseUpload {
    imgUpload?: string[] | undefined // Propriedade opcional para URLs de imagem
    errorImg?: string; // Propriedade opcional para mensagens de erro
}
interface customerProps {
    customerId?: string;
    erro?: string;
}

interface ClientProps {
    name_couple: string;
    date: string;
    time_couple: string;
    cpfcnpj: string;
    name_client: string;
}
import { useForm } from 'react-hook-form';
import { scrollToDiv } from '../../../utils/scrollToDiv'
import {
    useDisclosure,
} from '@chakra-ui/react'
import { validateCpf } from '../../../utils/cpfValid';
import { FaCopy, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import HowItWorks from '../components/howItork';
import Link from 'next/link';
import { Radio, RadioGroup } from '@/components/ui/radio';

export default function Presentation() {
    const { onOpen, onClose } = useDisclosure()
    const storage = getStorage(app)
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name_couple: "",
            date: "",
            time_couple: "",
            cpfcnpj: "",
            name_client: "",
            email: ""
        }
    });
    // const toast = useToast()
    const [hour, setHour] = useState<string>("")
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [formPayment, setFormPayment] = useState<string>('');
    const [imageQrCode, setImageQrCode] = useState<string>("");
    const [qrCode, setQrCode] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nameCouple, setNameCouple] = useState<string>("")
    const [cpfCnpj, setCpfCnpj] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [youtubeLink, setYoutubeLink] = useState<string>("")
    const [typeProduct, setTypeProduct] = useState<number>(1)
    const [dataCouple, setDataCouple] = useState<string>("")
    const [imageCouple, setImageCouple] = useState<any>([])
    const [message, setMessage] = useState<string>("")
    const [copied, setCopied] = useState<boolean>(false)
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
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 11) value = value.substring(0, 11); // Limita o CPF a 11 dígitos

        // Aplica a máscara do CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        setCpfCnpj(value);
    };
    useEffect(() => {
        const elementos = document.querySelectorAll(".bolha");

        elementos.forEach((elemento: any) => {
            const i = getComputedStyle(elemento).getPropertyValue("--i");
            elemento.style.animation = `animar2 calc(30s / ${i}) ease-in-out infinite`;
        });
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

            await stripeClient.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Erro ao redirecionar para o checkout:', error);
            // toast({
            //     title: 'Erro',
            //     description: 'Não foi possível iniciar o checkout.',
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true,
            // });
        } finally {
            setLoading(false);
        }
    };

    async function validateFieldsPix(data: ClientProps) {
        console.log(data, errors)
        const validCpf = await validateCpf(data.cpfcnpj);
        if (!validCpf && formPayment === "1") {
            alert("CPF inválido!")
            return { erro: "CPF inválido!" }
        }
        setLoading(true)
        const { imgUpload, errorImg } = await handleUpload()
        if (imgUpload && !errorImg) {
            const { success } = await createCouple(idUser, nameCouple, dataCouple, hour, imgUpload, message, youtubeLink)
            if (success && formPayment === "1") {
                await generatorPix()
            } else {

                return handleCheckout()
            }
            setLoading(false)
            return
        }

        // toast({
        //     title: 'Algum dado não foi preenchido',
        //     description: "",
        //     status: 'error',
        //     duration: 9000,
        //     isClosable: true,
        // })
        setLoading(false)
    }

    async function submit() {
        if (!nameCouple || !hour || !dataCouple) {
            // toast({
            //     title: 'Algum campo não foi preenchido',
            //     description: 'Preencha todos campos!',
            //     status: 'error',
            //     duration: 5000,
            //     isClosable: true,
            // });
            return
        }
        if (imageCouple.length == 0) {
            // toast({
            //     title: 'Preencha as imagens!',
            //     description: "",
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true,
            // })
            return
        }
        onOpen()

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



    const handleCopy = () => {
        try {
            const text = navigator.clipboard.writeText(qrCode);
            setCopied(true)
            //   setInputValue(text);
        } catch (err) {
            console.error("Falha ao colar conteúdo: ", err);
        }
    };


    async function generatoClient(name: string, cpfCnpj: string): Promise<customerProps> {

        const response = await fetch('/api/create-client-pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                cpfCnpj: cpfCnpj.replace(/[.-]/g, '')
            })
        });

        const customer = await response.json();
        return { customerId: customer.customersData.id }
    }
    async function generatorPix() {

        const { customerId, erro } = await generatoClient(name, cpfCnpj)

        if (erro) {
            return alert("CPF inválido!")
        }
        if (!customerId) {
            console.log(customerId)
            return alert("Cliente inválido!")
        }
        await updatecustomerId(idUser, customerId, email)

        const res = await fetch('/api/create-pix', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                customerid: customerId,
                value: typeProduct === 1 ? 14.99 : 34.99, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
                description: "1"
            })
        })
        const pixCustomers = await res.json();
        await getQrCodPix(pixCustomers.pixCustomersData.id)
    }

    async function getQrCodPix(paymentId: string) {
        const res = await fetch('/api/get-pix-client', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                paymentId
            })
        })
        const getPixCustomers = await res.json();
        console.log(getPixCustomers)
        setImageQrCode(getPixCustomers.pixCustomersData.encodedImage)
        setQrCode(getPixCustomers.pixCustomersData.payload)
        setLoadingPayment(true)

    }
    let myeconder = `data:image/png;base64,${imageQrCode}`
    async function startConfetti() {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

    }
    const cpfPattern = /^(?!000\.000\.000-00)(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/
    return (
        <>

            <main className="  m-auto  ">
                <div className='useViewBg md:h-[33rem] relative overflow-hidden  '>
                    <div className='max-w-[1100px] m-auto px-3'>
                        <div className="flex absolute justify-between w-full  ">
                            <span style={{ "--i": "4" } as React.CSSProperties} className="bolha h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "3" } as React.CSSProperties} className="bolha h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "2" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "4" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "1" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "1" } as React.CSSProperties} className="bolha h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "5" } as React.CSSProperties} className="bolha h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "8" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "4" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "6" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "2" } as React.CSSProperties} className="bolha h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "7" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "9" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                            <span style={{ "--i": "3" } as React.CSSProperties} className="bolha md:h-[2px] md:w-[2px] h-[2px] w-[2px] bg-white"></span>
                        </div>
                        <div><Image alt='logo' width={150} className='m-auto pb-10 py-2' src={logo} /></div>
                        <section className="">
                            <div className='max-w-[700px]'>
                                <h1 className="text-redDefault md:text-6xl text-5xl font-black  md:text-left text-center">Surpreenda seu love!</h1>
                            </div>
                            <p className="text-white md:text-left text-center md:text-lg text-xs max-w-[600px] font-medium md:leading-7 leading-5 pt-2">

                                Crie um contador dinâmico para acompanhar o tempo do seu relacionamento. Preencha o formulário e receba seu site personalizado, junto com um QR Code para compartilhar com a pessoa especial!🙂
                            </p>
                            <div className='flex md:flex-row flex-col justify-center items-center gap-4 mt-3 max-w-[600px]'>
                                <Button className='shadow-[#4500E5] shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6] m-auto text-white max-w-[300px] w-full ' onClick={() => scrollToDiv("my_form")}>
                                    Criar meu contador dinâmico
                                </Button>
                                <h1 className='text- text-white'>OU</h1>
                                <Link className=' max-w-[300px] w-full m-auto' href={"/sendRequest"}>
                                    <div></div>
                                    <Button className='relative shadow-[#4500E5] shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6] text-white max-w-[300px] w-full m-auto  px-4'>
                                        <span className="absolute top-[-13px] right-[-10px] bg-[#ff8000] text-xs font-bold text-white px-2 py-1 rounded-full">
                                            Destaque
                                        </span>
                                        Enviar um pedido especial
                                    </Button>
                                </Link>
                            </div>
                            <div className='DESTAQUES flex flex-col md:flex-row justify-center gap-4 md:my-20 my-14 items-center'>
                                <p className='text-white text-xl'>Em destaque no</p>
                                <div className='flex items-center gap-4'>
                                    <a href="https://www.tiktok.com/@gabriela.rodrigue9315/video/7430304676643425542" className="">
                                        <FaTiktok className='hover:scale-110 duration-150 text-white text-6xl ' />

                                    </a>
                                    {/* <a href="https://www.youtube.com/@tikloveyuu/shorts">
                                        <FaYoutube className='hover:scale-110 duration-150 text-white text-3xl ' />

                                    </a>
                                    <a href="https://www.instagram.com/tikloveyuu/reels/">
                                        <FaInstagram className='hover:scale-110 duration-150 text-white text-3xl ' />
                                    </a> */}
                                </div>
                                <div className='flex items-center md:flex-row flex-col gap-3'>
                                    <CountUp prefix='+' start={0} end={1001644} duration={3} className='text-xl text-white font-bold' /> <span className='text-white text-xl'>Milhões de Pessoas já viram</span>
                                </div>
                            </div>

                        </section>
                    </div>

                    {/* <HowToMake /> */}
                </div>
                {/* <div className='AnyProofs my-10 max-w-[1100px] m-auto px-3'>

                    <h1 className='text-white text-2xl font-bold text-center my-5'>Algumas <span className='text-redDefault'>Surpresas!</span></h1>
                    <div className='flex md:flex-row flex-col justify-between items-center gap-10'>
                        <div className='rounded-md border border-white'>
                            <Image quality={100} width={180} alt='prova-1' src={proof_1} />
                        </div>
                        <div className='rounded-md border border-white'>
                            <Image  quality={100} width={180} alt='prova-2' src={proof_2} />
                        </div>
                        <div className='rounded-md border border-white'>
                            <Image  quality={100} width={180} alt='prova-3' src={proof_3} />
                        </div>
                    </div>
                </div> */}
                {/* <div className='flex md:flex-row flex-col max-w-[1100px] justify-between m-auto items-center md:items-start'>
                    <h1 className='text-white text-center md:text-5xl text-3xl font-bold'>Como  <span className='text-redDefault'>funciona</span></h1>
                    <div className='grid md:grid-cols-2 m-auto gap-10 '>
                        <div className='h-80 border-gray-800 border max-w-72 flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>1 - Preencha os dados</h1>
                            <Image className='m-auto translate-y-10' quality={100} height={250} width={250} alt='fields' src={fields} />
                        </div>
                        <div className='h-80 border-gray-800 border max-w-72 flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>2 - Faça o pagamento</h1>
                            <Image className='m-auto  p-5 translate-y-10' quality={100} height={250} width={250} alt='payment' src={payment} />
                        </div>
                        <div className='h-96 border-gray-800 border max-w-72 flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>3 - Receba seu QR Code no <br/>e-mail</h1>
                            <Image className='m-auto  p-5 translate-y-14' quality={100} height={250} width={250} alt='email' src={emailCouple} />
                        </div>
                        <div className='h-96 border-gray-800 border max-w-72 flex flex-col items-end bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>4 - Surpreenda seu amor</h1>
                            <Image className='m-auto  p-5 translate-y-' quality={100} height={250} width={250} alt='couple' src={couple} />
                        </div>
                    </div>
                </div> */}
                <HowItWorks />

                <div className="flex md:flex-row flex-col px-3 max-w-[1100px] pb-10 m-auto justify- items-center md:gap-10 gap-5">
                    <section className="max-w-[800px] w-full">
                        <div id='my_form'>
                            <FormPaymentInputs setSelectedInput={(e) => setTypeProduct(e)} />
                            <form className="flex md:flex-row flex-col items-end md:gap-4 gap-4 mt-5">
                                <label className="w-full text-white">
                                    <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                        Nome do casal:
                                    </p>
                                    <div className='relative'>
                                        <Input onChange={handleChange} fontSize={13} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white text-sm px-1 border-white border" />
                                        {/* {!nameCouple && <p className='text-red-500 text-xs absolute'>Campo vazío</p>} */}
                                    </div>
                                </label>
                                <div className='flex flex-row items-end w-full gap-3 justify-center'>
                                    <label className="md:max-w-40 w-full text-white flex flex-col  ">
                                        <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Inicio do relacionamento:
                                        </p>
                                        <div className='relative'>
                                            <Input onChange={(e) => setDataCouple(e.target.value)} fontSize={13} value={dataCouple} type="date" id="date_couple" className=" text-white text-sm border-white border px-1" />
                                            {/* {!dataCouple && <p className='text-red-500 text-xs absolute'>Campo vazío</p>} */}

                                        </div>
                                    </label>
                                    <label className="text-white md:max-w-40 w-full">
                                        <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Hora:
                                        </p>
                                        <div className='relative'>
                                            <Input onChange={(e) => setHour(e.target.value)} fontSize={13} value={hour} type="time" id="time_couple" className="text-white text-sm border-white border px-1" />
                                            {/* {!hour && <p className='text-red-500 text-xs absolute'>Campo vazío</p>} */}
                                        </div>
                                    </label>
                                </div>
                            </form>
                            <div className="flex flex-col gap-3 ">
                                <Textarea fontSize={13} onChange={(e) => setMessage(e.target.value)} value={message} height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white border-white border px-2">

                                </Textarea>
                                <div className="flex flex-col">
                                    <p className="text-white">Escolha até {typeProduct === 1 ? "3" : "6"} fotos</p>
                                    <Input id='imagesFile' ref={fileInputRef} onChange={handleFileChange} type="file" accept=".png, .jpg, .jpeg" multiple={true} className="placeholder:text-white text-white flex justify-center items-center border-white border" />
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
                                <div className='border-b border-white py-1'></div>
                                {hour && <p className=' text-white text-center mt-3 text-xs'>{message}</p>}
                            </div>

                            {
                                !nameCouple || !dataCouple || !hour || imageCouple < 1 ?
                                    <button disabled={true} className='border  bg-transparent duration-200  flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                        <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">Criar meu site</p>
                                        <p className=" flex gap-2 items-center justify-center font-medium  rounded-lg text-xs   text-white ">Preencha os campos necessários</p>
                                    </button>
                                    :
                                    <DialogTrigger asChild>
                                        <button disabled={loading} onClick={() => submit()} className='border hover:bg-slate-600 bg-transparent duration-200 cursor-pointer flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                            <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">{loading ? "Criando site" : "Criar meu site"}
                                                {loading && <div className="pt-1 lds-circle"><div></div></div>}
                                            </p>
                                        </button>
                                    </DialogTrigger>
                            }
                            <DialogContent className='bg-white'>
                                {
                                    !loadingPayment ?
                                        <>
                                            <DialogHeader>
                                                <DialogTitle className='text-black'>Escolha a forma de pagamento</DialogTitle>
                                            </DialogHeader>

                                            <DialogBody>
                                                <RadioGroup variant={'subtle'} defaultValue={"2"} value={formPayment} onValueChange={(e) => setFormPayment(e.value)}>

                                                    <div className='flex flex-row gap-3 items-center'>
                                                        <Image quality={100} alt='pixlogo' width={30} height={30} src={pix} />
                                                        <Radio className='text-black' value='1'>Pagar com Pix</Radio>
                                                    </div>
                                                    {formPayment === "1" &&
                                                        <div className='flex flex-col gap-7'>
                                                            <div className='relative'>
                                                                <Input className='border px-2'  {...register('name_client', { required: "Nome é obrigatório", pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "Nome inválido" } })} onChange={(e) => setName(e.target.value)} value={name} placeholder='Nome' />
                                                                {errors.name_client && <p className='text-red-500 text-xs absolute'>{errors.name_client.message}</p>}
                                                            </div>

                                                            <div className='relative'>
                                                                <Input className='border px-2' {...register('cpfcnpj', {
                                                                    required: "CPF é obrigatório",
                                                                    pattern: {
                                                                        value: cpfPattern,
                                                                        message: "CPF inválido. Ex: 123.456.789-00"
                                                                    }
                                                                })} onChange={handleCpfChange} value={cpfCnpj} placeholder='CPF' />
                                                                {errors.cpfcnpj && <p className='text-red-500 text-xs absolute'>{errors.cpfcnpj?.message}</p>}
                                                            </div>

                                                            <div className='relative'>
                                                                <label>
                                                                    <p className='text-black'>Digite seu e-mail para receber o QR Code
                                                                    </p>
                                                                    <Input className='border px-2' {...register('email', {
                                                                        required: "Email é obrigatório para receber seu Qrcode",
                                                                        pattern: {
                                                                            value: emailPattern,
                                                                            message: "Email inválido."
                                                                        }
                                                                    })} placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email} />
                                                                </label>

                                                                {errors.email && <p className='text-red-500 text-xs absolute'>{errors.email?.message}</p>}
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className='flex gap-3 flex-row items-center pt-3'>
                                                        <Image quality={100} alt='cardlogo' width={30} height={30} src={card} />
                                                        <Radio className='text-black' value='2'>Pagar com cartão</Radio>
                                                    </div>
                                                </RadioGroup>
                                            </DialogBody>
                                            <DialogFooter>
                                                <DialogActionTrigger asChild>
                                                    <Button className='text-black' variant="outline">Cancel</Button>
                                                </DialogActionTrigger>
                                                <Button disabled={loading} px={2} bg={"blue.400"} mr={3} onClick={handleSubmit(validateFieldsPix)}>
                                                    <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white  ">
                                                        {loading ? "Aguarde" : "ir para o Pagamento"}
                                                        {loading && <div className="pt-1 lds-circle"><div></div></div>}
                                                    </p>
                                                </Button>
                                            </DialogFooter>
                                            <DialogCloseTrigger />
                                        </>
                                        :
                                        <>
                                            <Image width={300} height={300} className='m-auto' alt='qrCode' src={myeconder} />
                                            <div className='flex flex-col items-center bg-gray-100'>
                                                <p className='font-bold text-xs text-yellow-600'>Atenção</p>
                                                <p className='text-center text-black text-xs font-bold px-2'>Assim que fizer o pagamento você receberá no email o QrCode do seu site!</p>
                                            </div>
                                            <p className='text-black text-center px-3 py-2'>{qrCode}</p>
                                            <Button bg={"green"} onClick={handleCopy} className='select-none ' ><p className=' text-white  font-medium px-2'>{copied ? "copiado" : "Copiar"}</p> <span className=' border border-white rounded-md p-1'><FaCopy className=' text-white' /></span></Button>
                                        </>
                                }
                            </DialogContent>
                            {/* </DialogRoot> */}
                        </div>
                    </aside>
                </div >
            </main >
            <Footer />
        </>
    )
}