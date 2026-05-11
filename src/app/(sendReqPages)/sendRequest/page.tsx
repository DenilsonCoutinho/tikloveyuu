"use client"

interface ClientProps {
    cpfcnpj: string;
    name_client: string;
}

interface customerProps {
    customerId?: string;
    erro?: string;
}
interface responseUpload {
    imgUpload?: string[]
    errorImg?: string; // Propriedade opcional para mensagens de erro
}
import { loadStripe } from '@stripe/stripe-js';
import app from "../../../lib/firebase";

import { Button, Input, Textarea } from "@chakra-ui/react"
import { Radio, RadioGroup } from '@/components/ui/radio';

import { Checkbox } from "@/components/ui/checkbox"

import FormPaymentInputsReq from "../../components/formPaymentInputsReq"
import logo from '../../../assets/logoLove.png'
import pix from '../../../assets/Logo-Pix.png'
import card from '../../../assets/credit-card.png'

import { v4 as uuidv4 } from 'uuid';
import { FaCamera } from "react-icons/fa";

import { useEffect, useState } from "react"
import Footer from "../../home/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { validateCpf } from "../../../../utils/cpfValid"
import { FaCopy } from "react-icons/fa";
import { createReqSend, updatecustomerReqId } from "../../../../actions/requestSend";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-button';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Snowfall from 'react-snowfall'
import chapeu from '../../../assets/chapeuNatal.png'
import generatorPix from '@/services/generatorPix';
import { getQrCodPix } from '@/services/getQrCodPix';

export default function SendRequest() {
    const storage = getStorage(app)

    const [typeRequest, setTypeRequest] = useState<string>("1")
    const [image, setImage] = useState<any>([])
    const [valueNo, setValueNo] = useState<boolean>(false)
    const [valueYes, setValueYes] = useState<boolean>(false)
    const [request, setRequest] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [formPayment, setFormPayment] = useState<string>('');
    const [imageQrCode, setImageQrCode] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [cpfCnpj, setCpfCnpj] = useState<string>("")
    const [idUser, setIdUser] = useState<string>("")
    const route = useRouter()

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 11) value = value.substring(0, 11); // Limita o CPF a 11 dígitos

        // Aplica a máscara do CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        setCpfCnpj(value);
    };
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            cpfcnpj: "",
            name_client: "",
            email: ""
        }
    });
    const handleCopy = () => {
        try {
            const text = navigator.clipboard.writeText(qrCode);
            setCopied(true)
            //   setInputValue(text);
        } catch (err) {
            console.error("Falha ao colar conteúdo: ", err);
        }
    };
    const cpfPattern = /^(?!000\.000\.000-00)(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/


    useEffect(() => {
        const newId = uuidv4();
        try {
            localStorage.setItem("idUserResMyLoverTik", newId);
            setIdUser(newId);
        } catch (error) {
            console.error("Erro ao armazenar o ID do usuário:", error);
        }
    }, [])

    async function validateFieldsPix(data: ClientProps) {
        setLoading(true);
        const validCpf = await validateCpf(data.cpfcnpj);
        if (!validCpf && formPayment === "1") {
            alert("CPF inválido!")
            return { erro: "CPF inválido!" }
        }
        const { imgUpload } = await handleUpload()
        if (!imgUpload) return alert("Erro na hora de enviar fotos")
        const { success } = await createReqSend(idUser, request, valueYes, valueNo, message, typeRequest, imgUpload[0])
        if (success && formPayment === "1") {
            const { pixCustomersDataId } = await generatorPix(idUser as string, name, cpfCnpj, email, 2, "2",10.99)
            const { encodedImage, qrCode } = await getQrCodPix(pixCustomersDataId as string)
            location.href = `/payment?encodedImage=${encodedImage}&qrCode=${encodeURIComponent(qrCode)}`

        } else {
            return handleCheckout()
        }
    }
    const handleCheckout = async () => {

        try {

            const response = await fetch(`/api/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    typeRequest: 2,
                    idUser,
                    productId: "price_1QXCG5Ht6s00L0BLxhlcHgyL"
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

        }
    };

    async function handleUpload(): Promise<responseUpload> {
        const uploads = image?.map((image: any) => {
            const storageRef = ref(storage, `requestSend/${idUser}/images/${image?.name}`);
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

    async function generatoClient(name: string, cpfCnpj: string): Promise<customerProps> {

        const response = await fetch('/api/create-client-pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                cpfCnpj: cpfCnpj.replace(/[.-]/g, ''),
                // description:typeRequest
            })
        });

        const customer = await response.json();
        return { customerId: customer.customersData.id }
    }
    // async function generatorPix() {
    //     try {
    //         const { customerId, erro } = await generatoClient(name, cpfCnpj)

    //         if (erro) {
    //             return alert("CPF inválido!")
    //         }
    //         if (!customerId) {
    //             return alert("Cliente inválido!")
    //         }
    //         await updatecustomerReqId(idUser, customerId, email)

    //         const res = await fetch('/api/create-pix', {
    //             method: 'POST',
    //             mode: 'no-cors',
    //             headers: {
    //                 'content-type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 customerid: customerId,
    //                 value: 10.99, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
    //                 description: "2"
    //             })
    //         })
    //         const pixCustomers = await res.json();
    //         await getQrCodPix(pixCustomers.pixCustomersData.id)
    //     } catch (error) {
    //         setLoadingPayment(false)
    //     }

    // }

    // async function getQrCodPix(paymentId: string) {
    //     console.log(paymentId)
    //     const res = await fetch('/api/get-pix-client', {
    //         method: 'POST',
    //         mode: 'no-cors',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             paymentId
    //         })
    //     })
    //     const getPixCustomers = await res.json();

    //     setImageQrCode(getPixCustomers.pixCustomersData.encodedImage)
    //     setQrCode(getPixCustomers.pixCustomersData.payload)
    //     setLoadingPayment(true)

    // }
    let myeconder = `data:image/png;base64,${imageQrCode}`
    const handleFileChange = async (event: any) => {
        if (event.target.files) {
            setImage(Array.from(event.target.files))
        }
    };
    const onSubmit = (data: any) => {
        setLoading(true);

        validateFieldsPix(data)
    };

    return (
        <>
            {/* <Snowfall /> */}
            {/* <DialogContent className='bg-white'>
                {
                    !loadingPayment ?
                        <>
                            <DialogHeader>
                                <DialogTitle className='text-black'>Escolha a forma de pagamento</DialogTitle>
                            </DialogHeader>

                            <DialogBody>
                                <RadioGroup variant={'subtle'} defaultValue={"1"} value={formPayment} onValueChange={(e) => setFormPayment(e.value)}>

                                    <div className='flex flex-row gap-3 items-center'>
                                        <Image quality={100} alt='pixlogo' width={30} height={30} src={pix} />
                                        <Radio className='text-black' value="1">Pagar com Pix</Radio>
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
                                                    <p className='text-black'>Digite seu e-mail para receber o seu link
                                                    </p>
                                                    <Input className='border px-2' {...register('email', {
                                                        required: "Email é obrigatório para receber seu link",
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
                                    {<Button disabled={loading} variant="outline" className='text-black'>Cancelar</Button>}
                                </DialogActionTrigger>
                                <Button disabled={loading} px={2} bg={"blue.400"} mr={3} onClick={handleSubmit(validateFieldsPix)}>
                                    <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">
                                        {loading ? "Aguarde" : "Fazer Pagamento"}
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
                                <p className='text-center text-black text-xs font-bold px-2'>Assim que fizer o pagamento você receberá no E-mail o seu link!</p>
                            </div>
                            <p className='text-black text-center px-3 py-2'>{qrCode}</p>
                            <Button bg={"green"} onClick={handleCopy} className='select-none ' ><p className=' text-white  font-medium px-2'>{copied ? "copiado" : "Copiar"}</p> <span className=' border border-white rounded-md p-1'><FaCopy className=' text-white' /></span></Button>
                        </>
                }
            </DialogContent> */}

            <DialogContent className="bg-white">
                {
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-black">Escolha a forma de pagamento</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <RadioGroup
                                variant="subtle"
                                defaultValue="1"
                                value={formPayment}
                                onValueChange={(e) => setFormPayment(e.value)}
                            >
                                <div className="flex flex-row gap-3 items-center">
                                    <Image quality={100} alt="pixlogo" width={30} height={30} src={pix} />
                                    <Radio className="text-black" value="1">
                                        Pagar com Pix
                                    </Radio>
                                </div>
                                {formPayment === "1" && (
                                    <div className="flex flex-col gap-7">
                                        <div className="relative">
                                            <label>

                                                <p className="text-black">
                                                    Digite seu nome
                                                </p>
                                                <Input
                                                    className="border px-2 text-black"
                                                    {...register("name_client", {
                                                        required: "Nome é obrigatório",
                                                        pattern: {
                                                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                                                            message: "Nome inválido"
                                                        }
                                                    })}
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    placeholder="Nome"
                                                />
                                            </label>
                                            {errors.name_client && (
                                                <p className="text-red-500 text-xs absolute">{errors.name_client.message}</p>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label>
                                                <p className="text-black">
                                                    Digite seu CPF
                                                </p>
                                                <Input
                                                    className="border px-2 text-black"
                                                    {...register("cpfcnpj", {
                                                        required: "CPF é obrigatório",
                                                        pattern: {
                                                            value: cpfPattern,
                                                            message: "CPF inválido. Ex: 123.456.789-00"
                                                        }
                                                    })}
                                                    onChange={handleCpfChange}
                                                    value={cpfCnpj}
                                                    placeholder="CPF"
                                                />
                                            </label>
                                            {errors.cpfcnpj && (
                                                <p className="text-red-500 text-xs absolute">{errors.cpfcnpj?.message}</p>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label>
                                                <p className="text-black">
                                                    Digite seu e-mail para receber o seu link
                                                </p>
                                                <Input
                                                    className="border px-2 text-black"
                                                    {...register("email", {
                                                        required: "Email é obrigatório para receber seu link",
                                                        pattern: {
                                                            value: emailPattern,
                                                            message: "Email inválido."
                                                        }
                                                    })}
                                                    placeholder="E-mail"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                />
                                            </label>
                                            {errors.email && (
                                                <p className="text-red-500 text-xs absolute">{errors.email?.message}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-3 flex-row items-center pt-3">
                                    <Image quality={100} alt="cardlogo" width={30} height={30} src={card} />
                                    <Radio className="text-black" value="2">
                                        Pagar com cartão
                                    </Radio>
                                </div>
                            </RadioGroup>
                        </DialogBody>
                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Button disabled={loading} variant="outline" className="text-black">
                                    Cancelar
                                </Button>
                            </DialogActionTrigger>
                            <Button
                                disabled={loading}
                                px={2}
                                bg={"blue.400"}
                                mr={3}
                                onClick={handleSubmit(onSubmit)}
                            >
                                <p className="flex gap-2 items-center justify-center font-bold rounded-lg text-xl text-white">
                                    {loading ? "Aguarde" : "Fazer Pagamento"}
                                    {loading && <div className="pt-1 lds-circle"><div></div></div>}
                                </p>
                            </Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                    </>
                }
            </DialogContent>
            <div className="bg-defaultBg">
                <Link href={"/"}>
                    <Image alt='logo' width={150} className='m-auto pb-10 py-2' src={logo} />
                </Link>

                <div className="max-w-[1100px] m-auto px-3 pb-20">
                    <h1 className="text-white text-5xl font-bold pt-5"><span className='relative '>Q</span>uase lá!</h1>
                    <p className="text-white  max-w-[590px]">Preencha os dados do pedido e receba o link para compartilhar diretamente com a pessoa desejada, <span className=' shadow-redDefault border-b'>enviado ao seu e-mail.</span></p>
                    <FormPaymentInputsReq setSelectedInput={(e) => setTypeRequest(e)} />
                    <div className="max-w-[700px]">
                        <label className="w-full text-white">
                            <p className="text-white text-xs  max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
                                Coloque seu pedido aqui:
                            </p>
                            <div className='relative'>
                                <Input value={request} onChange={(e) => setRequest(e.target.value)} type="text" id="name_couple" placeholder={typeRequest === "1" ? `Ex:.... quer namorar comigo?` : `Ex:.... vamos sair hoje?`} className="text-white  border border-white px-3 placeholder:text-slate-400 text-sm" />
                            </div>
                        </label>
                        <div className='bg-[#ffffff28] rounded-sm px-2 my-2'>
                            <Checkbox defaultChecked variant={'subtle'} checked={valueNo} onCheckedChange={(e) => setValueNo(!!e.checked)} className="py-5"> <p className="text-white">A opção "Não" vai se mover quando tentar clicar</p></Checkbox>
                            <Checkbox variant={"subtle"} checked={valueYes} onCheckedChange={(e) => setValueYes(!!e.checked)} className=""> <p className="text-white">A opção "Sim" vai se mover quando tentar clicar (ideal para fugir do pedido de casamento🤣)</p></Checkbox>
                        </div>

                        <label className="w-full text-white">
                            <p className="text-white text-xs  max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
                                Mensagem quando ela dizer "sim"
                            </p>
                            <Textarea className="border max-h-56 min-h-56 border-white px-3" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="">

                            </Textarea>
                        </label>
                        <FileUploadRoot accept=".png, .jpg, .jpeg, .gif" onChange={handleFileChange}>
                            <FileUploadTrigger asChild>
                                <Button id='buttonModal' className='border md:text-base text-wrap text-xs border-white rounded-sm my-4 px-3 w-full text-white text-center' variant="outline" size="sm">
                                    <FaCamera /> Selecione uma imagem caso o pedido seja "SIM"
                                </Button>
                            </FileUploadTrigger>
                            <FileUploadList />
                        </FileUploadRoot>
                        {
                            request && message && image.length > 0 ?
                                <DialogTrigger asChild>
                                    <button className='border text-white px-2 max-w-[300px] w-full hover:text-black hover:bg-white bg-transparent duration-200 cursor-pointer flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                        Criar pedido
                                    </button>
                                </DialogTrigger>
                                :
                                <button disabled className='border text-white   bg-transparent duration-200 px-2 max-w-[300px] w-full flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                    Criar pedido
                                    {request && message && image.length > 0 ? <></> : <p className="text-slate-400 text-xs">Campos a serem preenchidos</p>}
                                </button>
                        }
                    </div>
                </div>

            </div>
            <Footer />

        </>

    )
}

