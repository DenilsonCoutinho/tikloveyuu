"use client"

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
import Footer from "@/app/home/components/footer";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { TbCopyCheckFilled } from "react-icons/tb";
import logo from '../../../assets/logoLove.png'
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createToaster } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getReqById } from "../../../../actions/requestSend";
 function CopyLinkComponent() {
    const [copied, setCopied] = useState<boolean>(false)
    const searchParams = useSearchParams();
    const route = useRouter()
    const [data, setData] = useState<ReqProps | null>(null)
    const { toast } = useToast()

    const id = searchParams.get("id");
    const handleCopy = () => {
        try {
            const text = navigator.clipboard.writeText(`https://www.tikloveyuu.com/yesOrNo?id=${id}`);
            setCopied(true)
            toast({
                variant: 'correct',
                title: "Copiado!",
                description: <p className="text-white md:text-base text-[10px]" ></p>,
                action: <ToastAction  className="border rounded-lg p-1 border-white text-[11px]" altText="Refresh">ok</ToastAction>,
            })
        } catch (err) {
            console.error("Falha ao colar conteúdo: ", err);
        }
    };

    async function getDataReq() {
        if (!id) {
            route.push("/")
            return
        }

        const res = await getReqById(id)
        setData(res)
    }

    
    useEffect(() => {
        getDataReq()

    }, []);
    return (
        <>
        {/* <Toaster /> */}
            <div className="h-screen flex  flex-col justify-center items-center bg-defaultBg">
                <Image src={logo} alt="logo" width={200} />
                <div className=" max-w-[400px] w-full h-[10rem] border border-gray-600 rounded-md p-3 flex flex-col gap-3 justify-center items-center">
                    <p className="text-white text-justify px-3">Enviamos este mesmo link para o seu e-mail. Você também pode copiá-lo abaixo e enviá-lo para a pessoa desejada. :)</p>
                    <Button bg={"green"} onClick={() => handleCopy()} className='select-none w-full' ><p className='md:text-base text-xs text-white  font-medium px-2'>{copied ? "copiado" : "Copiar o link para enviar para a pessoa"}</p> <span className=' border border-white rounded-md p-1'>{copied ? <TbCopyCheckFilled className=' text-white' /> : <FaCopy className=' text-white' />}</span></Button>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default function CopyLink() {

    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            <CopyLinkComponent />
        </Suspense>
    )
}