"use client"
import { Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getReqById } from "../../../../actions/requestSend";
import ButtonRandom from "../../components/buttonRandom";
import ButtonRandomNo from "../../components/buttonRandomNo";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

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
    }

    async function nextStepNo() {
        setStep("4")
    }
    useEffect(() => {
        getDataReq()

    }, []);


    return (
        <div className="bg-defaultBg h-screen flex flex-col items-center justify-center">
            {step === "1" ? <>
                <h1 className="md:text-4xl text-2xl text-white text-center select-none">{data?.requestSend}</h1>
                <div className="flex justify-center items-center gap-4">
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
                            <Button onClick={()=>nextStepNo()} id="" className='shadow-[#e52600] shadow-lg bg-[#e50000] hover:bg-[#ff4545] hover:shadow-[#ff9090] text-white w-[150px] mt-3'>
                                NÃO
                            </Button>
                    }
                </div>
            </>
                : step === "2" ?
                    <>
                        <div className="md:h-[400px] h-[300px] flex flex-col items-center border rounde overflow-hidden rounded-lg">
                            {data?.images && <Image
                                className=" w-full h-full object-cover "
                                width={200}
                                quality={100}
                                height={200}
                                src={data?.images} alt="imagem" />}
                        </div>
                        <p className="text-white md:text-xl text-sm py-2 text-center">
                            {data?.message}
                        </p>
                    </>
                    :
                    <div className="border flex flex-col justify-center items-center border-white rounded-md w-full max-w-[300px] h-24 ">
                        <FaCheckCircle  className="text-green-500"/>
                        <h1 className="text-center text-white">Recebemos a sua resposta!</h1>
                    </div>
            }
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