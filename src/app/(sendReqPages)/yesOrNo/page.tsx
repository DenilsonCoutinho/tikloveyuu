"use client"
import { Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getReqById } from "../../../../actions/requestSend";
import ButtonRandom from "../../components/buttonRandom";
import ButtonRandomNo from "../../components/buttonRandomNo";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../../assets/logoLove.png'
import Footer from "@/app/components/footer";
import Link from "next/link";
import Flowers from "@/app/components/flower";
import { resolve } from "path";

interface ReqProps {
    requestSend: string;
    idRequestSend: string;
    paid: string | null;
    yesMove: boolean | null;
    noMove: boolean | null;
    message: string | null;
    email: string | null;
    images: string | null;
    idCostumerAsaas: string | null;
    idSession: string | null;
    ytbMusic: string | null;
}
function YesOrNoComponent() {

    const [data, setData] = useState<ReqProps | null>(null)
    const [step, setStep] = useState<string>("1")
    const [animationFlower, setAnimationFlower] = useState<boolean>(false)
    const searchParams = useSearchParams();
    const route = useRouter()

    const id = searchParams.get("id");

    async function getDataReq() {
        if (!id) {
            route.push("/")
            return
        }

        const res = await getReqById(id)
        setData(res)
    }

    async function nextStep() {
        setStep("2")
        setAnimationFlower(true)
        await new Promise(resolve => setTimeout(resolve, 7000))
        setAnimationFlower(false)

    }

    async function nextStepNo() {
        setStep("4")
    }
    useEffect(() => {
        getDataReq()

    }, []);
    useEffect(() => {
        // startConfetti()

        const elementos = document.querySelectorAll(".bolha");

        elementos.forEach((elemento: any) => {
            const i = getComputedStyle(elemento).getPropertyValue("--i");
            elemento.style.animation = `animar calc(30s / ${i}) linear infinite`;
        });
    }, [])

    return (
        <div className="bg-defaultBg ">
            <Link href={"/"}>
                <Image src={logo} alt="logo" width={200} className="m-auto" />
            </Link>

            <div className={`relative overflow-hidden bg-defaultBg ${step === "2" && animationFlower ? "md:h-[65rem] h-screen" : step === "1" && !animationFlower && "h-[23rem]"} py-20 flex flex-col items-center justify-center`}>
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
                {step === "1" ? <>
                    <h1 className="md:text-4xl text-2xl text-white text-center select-none">{data?.requestSend}</h1>
                    <div className="flex justify-center items-center gap-4 ]">
                        {
                            data?.yesMove ?
                                <ButtonRandom yesOrNo={"SIM"} shadowButton={"#4500E5"} hoverColorButton={"#6638C6"} hoverShadowButton={"#6638C6"} colorButton={"#4500E5"} />
                                :
                                <Button onClick={() => nextStep()} className={` shadow-[#4500E5] shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6] text-white w-[150px]  mt-3`}>
                                    SIM
                                </Button>
                        }
                        {
                            data?.noMove ?
                                <ButtonRandomNo yesOrNo={"NÃO"} shadowButton={"#e52600"} hoverColorButton={"#ff4545"} hoverShadowButton={"#ff9090"} colorButton={"#e50000"} />
                                :
                                <Button onClick={() => nextStepNo()} id="" className='shadow-[#e52600] shadow-lg bg-[#e50000] hover:bg-[#ff4545] hover:shadow-[#ff9090] text-white w-[150px] mt-3'>
                                    NÃO
                                </Button>
                        }
                    </div>
                </>
                    : step === "2" && animationFlower ?
                        <>
                            <Flowers />

                        </>
                        : step === "2" && !animationFlower ?
                            <>
                                <div className=" bg-cover h-[400px]  flex flex-col items-center border rounde overflow-hidden rounded-lg">
                                    {data?.images && <Image
                                        className=" w-full  object-cover "
                                        width={222}
                                        quality={100}
                                        height={222}
                                        src={data?.images} alt="imagem" />}
                                </div>
                                <p className="text-white md:text-xl text-sm py-2 text-center max-w-[300px] px-2">
                                    {data?.message}
                                </p>
                            </>
                            :
                            <div className="border flex flex-col justify-center items-center border-white rounded-md w-full max-w-[250px] h-24 ">
                                <FaCheckCircle className="text-green-500" />
                                <h1 className="text-center text-white">Recebemos a sua resposta!</h1>
                            </div>
                }
            </div>
            {!animationFlower && <Footer />}
        </div>
    )
}

export default function YesOrNo() {

    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            <YesOrNoComponent />
        </Suspense>
    )
}