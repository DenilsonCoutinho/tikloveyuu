"use client"
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
import pix from '../../assets/Logo-Pix.png'
import card from '../../assets/credit-card.png'
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonPayment from "./button-payment";
import { handleUpload } from "@/services/uploadImages";
import { validateCpf } from "../../../utils/cpfValid";
import { createCouple } from "../../../actions/couple";
import { FaCopy } from "react-icons/fa";
import generatorPix from "@/services/generatorPix";
import { loadStripe } from "@stripe/stripe-js";
import { getQrCodPix } from "@/services/getQrCodPix";
import Loader from "./loading";
import RotatingText from "../../../components/RotatingText/RotatingText";

export default function ModalPayment({ typeProduct, dataCouple, hour, message, nameCouple, youtubeLink, imageCouple }: { typeProduct: number, nameCouple: string, dataCouple: string, hour: string, message: string, youtubeLink: string, imageCouple: File[] }) {
    const [loadingPayment, setLoadingPayment] = useState<boolean>(false);
    const [formPayment, setFormPayment] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [previewURLs, setPreviewURLs] = useState<[]>([])
    // const [imageCouple, setImageCouple] = useState<any>([])
    const [cpfCnpj, setCpfCnpj] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [qrCode, setQrCode] = useState<string>("");
    const [encoder, setEncoder] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(340); // Tempo total: 240 segundos (4 minutos)
    const [progress, setProgress] = useState<number>(100)
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


    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 11) value = value.substring(0, 11); // Limita o CPF a 11 dígitos

        // Aplica a máscara do CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        setCpfCnpj(value);
    };

    const handleCheckout = async () => {
        const idUser = localStorage.getItem("idUserMyLoverTik");

        setLoading(true);
        try {

            const response = await fetch(`/api/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    typeProduct: 1,
                    idUser,
                    productId: typeProduct === 1 ? "price_1Q7LyLHt6s00L0BLMVBkSQwZ" : "price_1Q6nShHt6s00L0BLJmUzKgCc"

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

        } finally {
            setLoading(false);
        }
    };

    async function validateFieldsPix(data: ClientProps) {
        const userId = localStorage.getItem("idUserMyLoverTik");

        const validCpf = await validateCpf(data.cpfcnpj);

        try {
            if (!validCpf && formPayment === "1") throw new Error("CPF inválido!");
            setLoading(true)
            const uploadImages = await handleUpload(imageCouple, userId as string)
            if (uploadImages?.errorImg) throw new Error(uploadImages.errorImg);
            const idUser = localStorage.getItem("idUserMyLoverTik");
            
            const price = typeProduct === 1 ? 14.99 : 34.99
            
            await createCouple(idUser as string, nameCouple, dataCouple, hour, uploadImages.imgUpload!, message, youtubeLink, price)
          
            if (formPayment === "1") {

                const { pixCustomersDataId } = await generatorPix(idUser as string, name, cpfCnpj, email, 1, "1", price)
                const { encodedImage, qrCode } = await getQrCodPix(pixCustomersDataId as string)
                setQrCode(qrCode)
                setEncoder(encodedImage)
                setLoadingPayment(true)
                setLoading(false)
                return
            } else {
                return handleCheckout()
            }

        } catch (error) {
            if (error instanceof Error) {
                setLoading(false)
                console.log(error.name)
            }
        }

        setLoading(false)
    }
    const handleCopy = () => {
        try {
            const text = navigator.clipboard.writeText(qrCode);
            setCopied(true)
        } catch (err) {
            console.error("Falha ao colar conteúdo: ", err);
        }
    };
    useEffect(() => {
        if (!loadingPayment) return
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1;

                // Atualiza a barra de progresso
                setProgress((newTime / 340) * 100);

                if (newTime <= 0) {
                    clearInterval(interval);

                    location.href = '/'
                }

                return newTime;
            });
        }, 1000); // Atualiza a cada segundo

        return () => clearInterval(interval); // Limpa o intervalo
    }, [loadingPayment]);
    const cpfPattern = /^(?!000\.000\.000-00)(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/
    return (
        <>
            {/* <DialogContent className='bg-white'> */}
            {
                !loadingPayment ?
                    <>
                        <DialogHeader>
                            <DialogTitle className='text-black font-bold'>Escolha a forma de pagamento</DialogTitle>
                        </DialogHeader>

                        <DialogBody>
                            <RadioGroup variant={'subtle'} defaultValue={"1"} value={formPayment} onValueChange={(e) => setFormPayment(e.value)}>

                                <div className='flex flex-row gap-3 items-center'>
                                    <Image quality={100} alt='pixlogo' width={30} height={30} src={pix} />
                                    <Radio className='text-black' value='1'>Pagar com Pix</Radio>
                                </div>
                                {formPayment === "1" &&
                                    <div className='flex flex-col gap-7'>
                                        <div className='relative'>
                                            <Input className='border text-black px-2'  {...register('name_client', { required: "Nome é obrigatório", pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "Nome inválido" } })} onChange={(e) => setName(e.target.value)} value={name} placeholder='Nome' />
                                            {errors.name_client && <p className='text-red-500 text-xs absolute'>{errors.name_client.message}</p>}
                                        </div>

                                        <div className='relative'>
                                            <Input className='border px-2 text-black' {...register('cpfcnpj', {
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
                                                <Input className='border px-2 text-black' {...register('email', {
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
                        {formPayment && <DialogFooter>

                            <DialogActionTrigger asChild>
                                <Button display={`${loading ? "none" : ""}`} className='text-black' variant="outline">Cancelar</Button>
                            </DialogActionTrigger>
                            {
                                loading ?
                                    <Button className="bg-green-400 w-full flex ">
                                        <RotatingText
                                            texts={['Aguarde...', `${formPayment === "1" ? "Gerando PIX!" : "Gerando Checkout"}`]}
                                            mainClassName="px-2 sm:px-2 bg-transparent text-white md:max-w-auto text-xl md:px-3  text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                            staggerFrom={"last"}
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            exit={{ y: "-120%" }}
                                            staggerDuration={0.025}
                                            splitLevelClassName="overflow-hidden pb-0.5 bg-transparent sm:pb-1 md:pb-1"
                                            transition={{ type: "", damping: 200, stiffness: 400 }}
                                            rotationInterval={2000}
                                        />
                                        <Loader />
                                    </Button>
                                    :
                                    <ButtonPayment text={"Fazer Pagamento"} disabled={loading} onClick={handleSubmit(validateFieldsPix)} />

                            }
                        </DialogFooter>}
                        {!loading && <DialogCloseTrigger className='text-black' />}
                    </>
                    :
                    <>
                        <div className='px-2 mt-2'>
                            <p className="text-gray-700 text-sm text-center">
                                Tempo restante para o pagamento: <strong>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</strong> minutos
                            </p>
                            <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
                                <div
                                    className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <Image width={200} height={300} className='m-auto' alt='qrCode' src={`data:image/png;base64,${encoder}`} />
                        <div className='flex flex-col items-center bg-gray-100'>
                            <p className='font-bold text-xs text-yellow-600'>Atenção</p>
                            <p className='text-center text-black text-xs font-bold px-2'>Assim que fizer o pagamento você receberá no email o QrCode do seu site!</p>
                        </div>
                        <p className='text-black text-center text-xs px-3 py-2'>{qrCode}</p>
                        <Button bg={"green"} onClick={handleCopy} className='select-none ' ><p className=' text-white  font-medium px-2'>{copied ? "copiado" : "Copiar"}</p> <span className=' border border-white rounded-md p-1'><FaCopy className=' text-white' /></span></Button>
                    </>
            }
            {/* </DialogContent> */}
        </>
    )
}