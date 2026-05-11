"use client";
import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-button";
import Image from "next/image";
import Link from "next/link";
import { FaCamera } from "react-icons/fa";
import logo from "../../../assets/logoLove.png";
import pix from "../../../assets/Logo-Pix.png";
import card from "../../../assets/credit-card.png";
import Footer from "../../home/components/footer";
import { validateCpf } from "../../../../utils/cpfValid"
import { loadStripe } from '@stripe/stripe-js';
interface ClientProps {
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
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import FormPaymentInputsCreateCard from "@/app/components/formPaymentInputsCreateCard";
import { handleUploadCreateSurprise } from "@/services/uploadImagesCreateCard";
import generatorPix from "@/services/generatorPix";
import { getQrCodPix } from "@/services/getQrCodPix";
import { createSurpriseSend } from "../../../../actions/surpriseSend";
import { useRouter, useSearchParams } from "next/navigation";
import Affiliate from "../../../../actions/affiliate";


function CreateSurpriseForm() {
    const searchParams = useSearchParams();

    const [typeRequest, setTypeRequest] = useState<string>("1");
    const [image, setImage] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");
    const [formPayment, setFormPayment] = useState<string>("1");
    const [loading, setLoading] = useState(false);
    const [nameCoupleSurprise, setNameCoupleSurprise] = useState<string>("");
    const [musicSpotify, setMusicSpotify] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpfCnpj, setCpfCnpj] = useState<string>("");
    const [idUser, setIdUser] = useState<string>("");
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            cpfcnpj: "",
            name_client: "",
            email: ""
        }
    });

    useEffect(() => {
        const newId = uuidv4();
        try {
            localStorage.setItem("idUserResMyLoverTik", newId);
            setIdUser(newId);
        } catch (error) {
            // handle error
        }
    }, []);

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.substring(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpfCnpj(value);
    };

    async function validateFieldsPix(data: ClientProps) {
        setLoading(true);
        const ref = searchParams.get("ref");
        console.log(ref)
        const validCpf = await validateCpf(data.cpfcnpj);
        if (!validCpf && formPayment === "1") {
            alert("CPF inválido!")
            return { erro: "CPF inválido!" }
        }
        const { imgUpload } = await handleUploadCreateSurprise(image, idUser)
        if (!imgUpload) return alert("Erro na hora de enviar fotos")

        const { success } = await createSurpriseSend(idUser, message, imgUpload, nameCoupleSurprise, musicSpotify, ref)
        if (success && formPayment === "1") {
            const { pixCustomersDataId } = await generatorPix(idUser as string, name, cpfCnpj, email, 5, "5", 19.99)
            const { encodedImage, qrCode } = await getQrCodPix(pixCustomersDataId as string)

            location.href = `/createSurprise/payment?encodedImage=${encodedImage}&qrCode=${encodeURIComponent(qrCode)}`

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
                    typeRequest: 5,
                    idUser,
                    productId: "price_1RTrvwHt6s00L0BL3ubKur65"
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
            setLoading(false);

        }
    };
    const handleFileChange = (event: any) => {
        if (event.target.files) {
            setImage(Array.from(event.target.files));
        }
    };

    // Patterns
    const cpfPattern = /^(?!000\.000\.000-00)(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/;

    // Dummy submit handler
    const onSubmit = (data: any) => {
        setLoading(true);

        validateFieldsPix(data)
    };


    return (
        <>
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
                    <Image alt="logo" width={150} className="m-auto pb-10 py-2" src={logo} />
                </Link>
                <div className="max-w-[1100px] m-auto px-3 pb-20">
                    <h1 className="text-white text-5xl font-bold pt-5">
                        <span className="relative ">Q</span>uase lá!
                    </h1>
                    <p className="text-white max-w-[590px]">
                        Preencha os dados, faça o pagamento e receba o link para compartilhar diretamente com a pessoa desejada,{" "}
                        <span className="shadow-redDefault border-b">enviado ao seu e-mail.</span>
                    </p>
                    <FormPaymentInputsCreateCard setSelectedInput={(e: string) => setTypeRequest(e)} />
                    <div className="max-w-[700px]">
                        <label className="w-full text-white">
                            <p className="text-white text-xs max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
                                Nome do casal aqui:
                            </p>
                            <div className="relative">
                                <Input
                                    value={nameCoupleSurprise}
                                    onChange={(e) => setNameCoupleSurprise(e.target.value)}
                                    type="text"
                                    id="name_couple"
                                    placeholder={
                                        "João e Maria"
                                    }
                                    className="text-white border border-white px-3 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                        </label>
                        <label className="w-full text-white">
                            <p className="text-white text-xs max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
                                Escolha uma musica do spotify para a surpresa (opcional):
                            </p>
                            <div className="relative">
                                <Input
                                    value={musicSpotify}
                                    onChange={(e) => setMusicSpotify(e.target.value)}
                                    type="text"
                                    id="music_spotify"
                                    placeholder={
                                        "EX:... https://open.spotify.com/track/2g9fVupIy2qbQwabYzVnUv?si=t00Jwz_NQqS34cRM2ZlM6A"
                                    }
                                    className="text-white border border-white px-3 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                        </label>
                        <label className="w-full text-white">
                            <p className="text-white text-xs max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
                                Mensagem para o(a) amado(a):
                            </p>
                            <Textarea
                                className="border max-h-56 min-h-56 border-white px-3"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder=""
                            />
                        </label>

                        <div className="mb-2 mt-4">
                            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-3">
                                <h3 className="text-yellow-400 font-semibold text-sm mb-2 flex items-center">
                                    💡 Dicas para fotos perfeitas:
                                </h3>
                                <ul className="text-yellow-200 text-xs space-y-1">
                                    <li>• Use fotos em modo retrato (vertical) para melhor visualização</li>
                                    <li>• Certifique-se de que as fotos estejam bem iluminadas</li>
                                    <li>• Evite fotos muito escuras ou desfocadas</li>
                                    <li>• Escolha suas melhores memórias juntos!</li>
                                </ul>
                            </div>
                        </div>

                        <FileUploadRoot accept=".png, .jpg, .jpeg" onChange={handleFileChange} maxFiles={4}>
                            <FileUploadTrigger asChild>
                                <Button
                                    id="buttonModal"
                                    className="border md:text-base text-wrap text-xs border-white rounded-sm my-4 px-3 w-full text-white text-center"
                                    variant="outline"
                                    size="sm"
                                >
                                    <FaCamera /> Selecione até 4 fotos (preferencialmente no modo retrato)
                                </Button>
                            </FileUploadTrigger>
                            <FileUploadList />
                        </FileUploadRoot>
                        {message && image.length > 0 ? (
                            <DialogTrigger asChild>
                                <button className="border text-white px-2 max-w-[300px] w-full hover:text-black hover:bg-white bg-transparent duration-200 cursor-pointer flex flex-col justify-center items-center rounded-md mt-3 py-2">
                                    Criar Surpresa
                                </button>
                            </DialogTrigger>
                        ) : (
                            <button
                                disabled
                                className="border text-white bg-transparent duration-200 px-2  w-full flex flex-col justify-center items-center rounded-md mt-3 py-2"
                            >
                                Criar Surpresa
                                {message && image.length > 0 ? null : (
                                    <p className="text-slate-400 text-xs">Campos a serem preenchidos</p>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default function FormPaymentSurprise() {
    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<CreateSurpriseForm />}
        </Suspense>
    );
}
