"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Textarea, } from "@chakra-ui/react";
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useMemo, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import logo from '../../assets/logoLove.png'
import {
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import comovaificar from '../../assets/como vai ficar 👇.png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import CountUp from 'react-countup';

import Footer from '../components/footer';

import { useForm } from 'react-hook-form';
import { scrollToDiv } from '../../../utils/scrollToDiv'
import {
    useDisclosure,
} from '@chakra-ui/react'
import { FaCamera, FaCopy, FaTiktok, } from 'react-icons/fa';
import HowItWorks from '../components/howItork';
import Link from 'next/link';
import Faq from '../components/faq';
import QrCodeSite from '../components/qrCodeSite';
import Viral from '../components/viral';
import ButtonUiUniverse from '../components/buttonUiUniverse';
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-button';

import Prices from '../components/prices';
import FallingText from '../../../components/FallingText/FallingText';
import ModalPayment from '../components/modalPayment';
import RotatingText from '../../../components/RotatingText/RotatingText';

export default function Presentation() {

    const { onOpen, onClose } = useDisclosure()
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

    const [hour, setHour] = useState<string>("")
    const [maintenance, setMaintenance] = useState<boolean>(false)

    const [loading, setLoading] = useState(false);
    const [nameCouple, setNameCouple] = useState<string>("")
    const [youtubeLink, setYoutubeLink] = useState<string>("")
    const [typeProduct, setTypeProduct] = useState<number>(1)
    const [dataCouple, setDataCouple] = useState<string>("")
    const [imageCouple, setImageCouple] = useState<any>([])
    const [message, setMessage] = useState<string>("")
    const [previewURLs, setPreviewURLs] = useState<[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = regexEmoji(e);
        setNameCouple(cleanedValue);
    };

    const handleFileChange = async (event: any) => {

        if (event.acceptedFiles) {
            const files: any = event.acceptedFiles.map((file: any) => URL.createObjectURL(file)); // Converte FileList para array de File
            const filesToUpload: any = event.acceptedFiles // Converte FileList para array de File

            setPreviewURLs(files);
            setImageCouple(filesToUpload)
        }
    };



    useEffect(() => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const refUser = urlParams.get('ref');
        // if (refUser) {
        //     localStorage.setItem('ref', refUser);
        // }
        setPreviewURLs([])

        const newId = uuidv4();
        try {
            localStorage.setItem("idUserMyLoverTik", newId);
        } catch (error) {
            console.error("Erro ao armazenar o ID do usuário:", error);
        }

    }, [])


    async function submit() {
        if (!nameCouple || !hour || !dataCouple) {
            return
        }
        if (imageCouple.length == 0) {
            return
        }
        onOpen()

    }

    if (maintenance) {
        return <div className='useViewBg h-screen flex flex-col justify-center items-center '>
            <div className='max-w-[900px] mx-auto px-3'>
                <div>
                    <Image alt='logo' width={150} className='m-auto py-2' src={logo} />
                </div>
            </div>
            <h1 className="text-white md:text-6xl text-2xl font-black text-center">Estamos realizando melhorias </h1>
            {/* <p className="text-white text-base font-medium text-center">Nosso site está passando por uma manutenção para trazer uma experiência ainda melhor para você. Voltamos em breve</p> */}
            <FallingText text={`Nosso site está passando por uma manutenção para trazer uma experiência ainda melhor para você. Voltamos em breve`}
                highlightWords={["Nosso", "site", "passando", "manutenção", "experiência", "melhor"]}
                // highlightClass="highlighted"
                className='mx-auto md:text-xl text-xs md:max-w-[1100px] sm:max-w-[400px] '
                trigger="hover"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                // fontSize="1.5rem"
                mouseConstraintStiffness={0.9} />
        </div>
    }
    return (
        <>
            <main className="m-auto">
                <div className='useViewBg md:h-[33rem]  overflow-hidden  '>
                    <div className='max-w-[1100px] m-auto px-3'>
                        <div>
                            <Image alt='logo' width={150} className='m-auto pb-10 py-2' src={logo} />
                        </div>
                        <section className="Presentation">
                            <div className='max-w-[800px] flex md:flex-row flex-col items-center justify-center mx-auto gap-4'>
                                <h1 className="text-redDefault md:text-6xl text-5xl font-black  md:text-left text-center">Surpreenda seu </h1>
                                <RotatingText
                                    texts={['Amor!', 'Love!']}
                                    mainClassName="px-2 sm:px-2 bg-[#9500ff] text-white md:max-w-auto font-semibold md:text-5xl text-5xl md:px-3  text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                    staggerFrom={"first"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 bg-[#9500ff] sm:pb-1 md:pb-1"
                                    transition={{ type: "", damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
                            </div>
                            {/* <p className="text-white  text-center md:text-base text-xs max-w-[690px]  mx-auto font-medium md:leading-6 leading-5 pt-2">
                                Celebre cada momento do seu relacionamento com um contador dinâmico exclusivo! Preencha o formulário e receba um site personalizado com um QR Code especial para compartilhar com quem você ama. Agora, aproveite também a opção de criar um pedido especial!
                            </p> */}
                            <FallingText text={` Celebre cada momento do seu relacionamento com um contador dinâmico exclusivo! Preencha o formulário e receba um site personalizado com um QRCode especial para compartilhar com quem você ama. Agora, aproveite também a opção de criar um pedido especial!`}
                                highlightWords={["Celebre", "momento", "relacionamento", "exclusivo!", "experiência", "QRCode"]}
                                // highlightClass="highlighted"
                                className='mx-auto py-10 md:text-xl text-xs md:max-w-[1100px] sm:max-w-[400px] '
                                trigger="hover"
                                backgroundColor="transparent"
                                wireframes={false}
                                gravity={0.56}
                                // fontSize="1.5rem"
                                mouseConstraintStiffness={0.9} />
                            <div className='flex md:flex-row flex-col justify-center items-center gap-4 mt-3 max-w-[600px] mx-auto'>
                                <Button className='shadow-[#4500E5] shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6] m-auto text-white max-w-[300px] w-full ' onClick={() => scrollToDiv("Prices")}>
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

                                </div>
                                <div className='flex items-center md:flex-row flex-col gap-3'>
                                    <CountUp prefix='+' start={0} end={2451644} duration={3} className='text-xl text-white font-bold' /> <span className='text-white text-xl'>Milhões de Pessoas já viram</span>
                                </div>
                            </div>

                        </section>

                    </div>
                </div>
                <Viral />
                <HowItWorks />
                <Prices setSelectedInput={(e) => { setTypeProduct(e) }} />
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
                                        <Input onChange={handleChange} fontSize={13} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white text-sm px-1 border-redDefault border" />
                                    </div>
                                </label>
                                <div className='flex flex-row items-end w-full gap-3 justify-center'>
                                    <label className="md:max-w-40 w-full text-white flex flex-col  ">
                                        <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Inicio do relacionamento:
                                        </p>
                                        <div className='relative'>
                                            <Input onChange={(e) => setDataCouple(e.target.value)} fontSize={13} value={dataCouple} type="date" id="date_couple" className=" text-white text-sm border-redDefault border px-1" />
                                        </div>
                                    </label>
                                    <label className="text-white md:max-w-40 w-full">
                                        <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                            Hora:
                                        </p>
                                        <div className='relative'>
                                            <Input onChange={(e) => setHour(e.target.value)} fontSize={13} value={hour} type="time" id="time_couple" className="text-white text-sm border-redDefault border px-1" />
                                        </div>
                                    </label>
                                </div>
                            </form>
                            <div className="flex flex-col gap-3 ">
                                <Textarea fontSize={13} onChange={(e) => setMessage(e.target.value)} value={message} height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white border-redDefault border px-2">

                                </Textarea>
                                <div className="flex flex-col">
                                    <p className="text-white">Escolha até {typeProduct === 1 ? "3" : "6"} fotos</p>
                                    <FileUploadRoot ref={fileInputRef} accept={["image/png", "image/gif", "image/jpeg"]} onFileChange={handleFileChange} maxFiles={typeProduct === 1 ? 3 : 6}>
                                        <FileUploadTrigger asChild>
                                            <Button variant="outline" className='text-white border-redDefault border w-full py-4' size="sm">
                                                <FaCamera className='text-white' />Escolha até {typeProduct === 1 ? "3" : "6"} fotos
                                            </Button>
                                        </FileUploadTrigger>
                                    </FileUploadRoot>
                                    {typeProduct === 2 &&
                                        <label className="text-white  w-full mt-3">
                                            <p className="text-white">Música Youtube: (Opcional)</p>
                                            <Input onChange={(e) => setYoutubeLink(e.target.value)} type="text" value={youtubeLink} className="placeholder:text-white border-white border text-white flex text-sm justify-center items-center" />
                                        </label>}
                                </div>
                            </div>
                        </div>

                    </section>
                    <aside className='  flex gap-4 flex-col items-center'>
                        <Image width={180} quality={100} alt='comovaificar ' src={comovaificar} />
                        <div className="flex  flex-col">
                            <div className=" overflow-hidden relative border border-redDefault shadow-md shadow-redDefault bg-[#180d21]   rounded-xl max-h-[540px] myscroll overflow-y-auto w-80 px-4">
                                {/* {<Confetti />} */}

                                <div className={`previewURLsPhoto  my-10 flex relative justify-center items-center mt-4 ${previewURLs.length > 0 ? "" : "h-80"} rounded-md  w-full px-4 `}>
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
                                !nameCouple || !dataCouple || !hour || imageCouple.length < 1 ?
                                    <button disabled={true} className='border  bg-transparent duration-200  flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                        <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">Criar meu Contador</p>
                                        <p className=" flex gap-2 items-center justify-center font-medium  rounded-lg text-xs   text-white ">Preencha os campos necessários</p>
                                    </button>
                                    :
                                    <DialogTrigger className='mt-3' asChild>
                                        <ButtonUiUniverse text=' Criar meu Contador' disabled={loading} onClick={() => {
                                            submit()
                                        }} />

                                    </DialogTrigger>
                            }
                            <DialogContent className='bg-white'>
                                <ModalPayment imageCouple={imageCouple} dataCouple={dataCouple} hour={hour} message={message} nameCouple={nameCouple} typeProduct={typeProduct} youtubeLink={youtubeLink} />
                            </DialogContent>
                        </div>
                    </aside>
                </div >
            </main >
            <Faq />
            <QrCodeSite />
            <Footer />
        </>
    )
}