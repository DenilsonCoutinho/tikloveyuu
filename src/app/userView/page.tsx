"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import { getCoupleById } from "../../../actions/couple"
import ContadorEterno from "../components/counter"
import MySwiper from "../components/mySwiper";
import { useRouter, useSearchParams } from "next/navigation";

import { emojiBlast, } from "emoji-blast";
import ButtonLike from "../components/button-like";
import Particles from "../../../components/Particles/Particles";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import FuzzyText from "../../../components/FuzzyText/FuzzyText";
import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";

import { Alex_Brush, Dancing_Script, Allura } from 'next/font/google'

const alexBrush = Dancing_Script({
    subsets: ['latin'],
    weight: '700',

})
interface UserViewProps {
    id: string;
    nameCouple: string | null;
    idCouple: string | null;
    images: string[];
    initialDate: string;
    initialHours: string;
    messages: string | null;
    ytbMusic: string | null;
    createdAt: Date;
    paid: string | null
    idCostumerAsaas: string | null
    idSession: string | null
}

function UserViewComponent() {
    const { toast } = useToast()
    const [data, setData] = useState<UserViewProps | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [IsError, setIsError] = useState<boolean>(false)
    const route = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {


        async function getDataCouple() {
            try {
                if (!id) {
                    setIsError(true)
                    throw new Error("Seu ID não está disponivel, Recarregue a página!")
                }
                const res = await getCoupleById(id)
                if (res.error) {
                    setData(null)
                    throw new Error(res?.error as string)
                }
                setData(res?.couple || null)

                await new Promise(resolve => setTimeout(resolve, 1000))
                setLoading(false)

            } catch (error) {
                if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: "Alerta!",
                        description: <p className="text-white md:text-base text-[10px]" >{error?.message}</p>,
                        action: <ToastAction onClick={() => location.reload()} className="border rounded-lg p-1 border-white text-[11px]" altText="Refresh">Refresh</ToastAction>,
                    })
                    setIsError(true)

                }
            } finally {
                setLoading(false)
            }

        }
        getDataCouple()
    }, [])

    function isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    function isSafari() {
        if (typeof window === "undefined") return false; // Garante que está no browser
        return /^((?!Chrome|Chromium|Android).)*Safari/i.test(navigator.userAgent) && navigator.vendor.includes("Apple");
    }

    if (loading) {
        return <div className="bg-defaultBg flex justify-center items-center h-screen w-full">
            <div className="lds-heart" ><div></div></div>
        </div>
    }

    return (
        IsError ? <>

            <div className={`  flex-col bg-defaultBg overflow-x-hidden overflow-y-hidden relative min-h-screen overflow-auto  bg-contain py-10 flex justify-center items-center`}>
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                    fontSize={isMobile() ? 40 : 34.4}
                >
                    404
                </FuzzyText>
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                    fontSize={isMobile() ? 20 : 34.4}>
                    Site não encontrado
                </FuzzyText>
            </div>
        </> :
            <div className={`  bg-defaultBg overflow-x-hidden overflow-y-hidden relative min-h-screen overflow-auto  bg-contain py-2 flex justify-center items-center`}>
                <SplashCursor
                    SIM_RESOLUTION={isMobile() || isSafari() ? 64 : 128}
                    DYE_RESOLUTION={isMobile() || isSafari() ? 512 : 1440}
                    CAPTURE_RESOLUTION={isMobile() || isSafari() ? 256 : 512}
                    DENSITY_DISSIPATION={isMobile() || isSafari() ? 2 : 3.5}
                    VELOCITY_DISSIPATION={isMobile() || isSafari() ? 1.5 : 2}
                    PRESSURE={0.05}
                    PRESSURE_ITERATIONS={isMobile() || isSafari() ? 10 : 20}
                    CURL={2}
                    SPLAT_RADIUS={0.15}
                    SPLAT_FORCE={isMobile() || isSafari() ? 2000 : 6000}
                    SHADING={true}
                    COLOR_UPDATE_SPEED={10}
                    BACK_COLOR={{ r: 0.5, g: 0, b: 0 }}
                    TRANSPARENT={true}
                />
                <div className="flex flex-col-reverse z-20">
                    <div>
                        <div className="relative  bg-transparent my-3 overflow-hidden px-1  border-slate-600 rounded-xl ">
                            <h1 className={`${alexBrush.className} text-white text-center font- text-4xl`}>{data?.nameCouple}</h1>
                            <div className="previewURLsPhoto my-10 flex flex- justify-center items-center mt-4  rounded-md  w-full ">
                                {
                                    data &&
                                    data?.images.length > 0 &&
                                    <MySwiper previewURLs={data?.images} />
                                }
                            </div>
                            <ButtonLike onClick={() => {
                                emojiBlast({
                                    emojis: ["💝", "💞", "💖", "💜", "💘"],
                                    physics: {
                                        fontSize: { max: 24, min: 24 }
                                    },
                                    position: {
                                        x: innerWidth / 2,
                                        y: innerHeight / 12
                                    }
                                    ,
                                    emojiCount: () => 4

                                })
                            }} />
                            {
                                data?.initialDate && data?.initialHours &&
                                <ContadorEterno initialDate={data?.initialDate} initialHour={data?.initialHours} />
                            }
                        </div>
                        <div className="border-b border-white opacity-15 mb-3 px-3 max-w-72 mx-auto "></div>
                        <p className="text-justify m-auto max-w-96 px-3 text-sm text-white  overflow-y-auto z-50 relative leading-8 ">{data?.messages}</p>
                    </div>
                    {
                        data?.ytbMusic &&
                        <iframe width="330" height="186" className="m-auto rounded-2xl z-50" src={`https://www.youtube.com/embed/${new URL(data?.ytbMusic || "").pathname.split('/')[1]}?autoplay=1&mute=1`} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }
                </div>
            </div>
    )
}


export default function UserView() {
    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<UserViewComponent />}
        </Suspense>
    );
}