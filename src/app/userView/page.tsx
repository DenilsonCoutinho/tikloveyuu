"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation";
import { Dancing_Script } from "next/font/google"
import { ToastAction } from "@radix-ui/react-toast";
import { emojiBlast } from "emoji-blast";

import { getCoupleById } from "../../../actions/couple"
import Particles from "../../../components/Particles/Particles";
import FuzzyText from "../../../components/FuzzyText/FuzzyText";
import ContadorEterno from "../components/counter"
import MySwiper from "../components/mySwiper";
import ButtonLike from "../components/button-like";
import { useToast } from "@/hooks/use-toast";

const alexBrush = Dancing_Script({
    subsets: ["latin"],
    weight: "700",
})

const HEART_EMOJIS = ["\u{1F49D}", "\u{1F49E}", "\u{1F496}", "\u{1F49C}", "\u{1F498}"];

interface UserViewProps {
    id: string;
    nameCouple: string | null;
    idCouple: string | null;
    images: string[];
    initialDate: string;
    initialHours: string;
    messages: string | null;
    ytbMusic: string | null;
    createdAt: string;
    paid: string | null
    idCostumerAsaas: string | null
    idSession: string | null
}

function getYoutubeEmbedUrl(url?: string | null) {
    if (!url) return null;

    try {
        const parsedUrl = new URL(url);
        const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

        const videoId =
            parsedUrl.hostname.includes("youtu.be")
                ? pathParts[0]
                : parsedUrl.searchParams.get("v") ?? pathParts[pathParts.length - 1];

        if (!videoId) return null;

        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    } catch {
        return null;
    }
}

function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function blastHearts(count: number) {
    emojiBlast({
        emojis: HEART_EMOJIS,
        physics: {
            fontSize: { max: 24, min: 24 },
            gravity: 1,
            initialVelocities: {
                rotation: 12
            },
            framerate: 82
        },
        position: {
            x: innerWidth / 2,
            y: innerHeight / 12
        },
        emojiCount: () => count
    })
}

function UserViewComponent() {
    const { toast } = useToast()
    const [data, setData] = useState<UserViewProps | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const searchParams = useSearchParams();
    const id = searchParams.get("id")?.trim();
    const youtubeEmbedUrl = useMemo(() => getYoutubeEmbedUrl(data?.ytbMusic), [data?.ytbMusic]);

    useEffect(() => {
        let ignore = false;

        async function getDataCouple() {
            try {
                setLoading(true)
                setIsError(false)

                if (!id) {
                    throw new Error("Seu ID nao esta disponivel. Recarregue a pagina!")
                }

                const res = await getCoupleById(id)

                if (res.error) {
                    throw new Error(res.error)
                }

                if (!res.couple) {
                    throw new Error("Site nao encontrado. Verifique se o link esta correto.")
                }

                if (ignore) return;

                setData(res.couple)

                await new Promise(resolve => setTimeout(resolve, 1000))
                if (!ignore) blastHearts(24)
            } catch (error) {
                if (ignore) return;

                const message = error instanceof Error ? error.message : "Erro ao buscar os dados.";
                setData(null)
                setIsError(true)
                toast({
                    variant: "destructive",
                    title: "Alerta!",
                    description: <p className="text-white md:text-base text-[10px]">{message}</p>,
                    action: <ToastAction onClick={() => location.reload()} className="border rounded-lg p-1 border-white text-[11px]" altText="Refresh">Refresh</ToastAction>,
                })
            } finally {
                if (!ignore) setLoading(false)
            }
        }

        getDataCouple()

        return () => {
            ignore = true;
        }
    }, [id, toast])

    if (loading) {
        return <div className="bg-defaultBg flex justify-center items-center h-screen w-full">
            <div className="lds-heart"><div></div></div>
        </div>
    }

    if (isError) {
        return (
            <div className="flex-col bg-defaultBg overflow-x-hidden overflow-y-hidden relative min-h-screen overflow-auto bg-contain py-10 flex justify-center items-center">
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
                    Site nao encontrado
                </FuzzyText>
            </div>
        )
    }

    return (
        <div className="notranslate bg-defaultBg overflow-x-hidden overflow-y-hidden relative min-h-screen overflow-auto bg-contain py-2 flex justify-center items-center">
            <Particles
                className="fixed z-10 w-full h-full top-0 bg-defaultBg"
                particleColors={["#fff"]}
                particleCount={500}
                particleSpread={15}
                speed={0.08}
                cameraDistance={52}
                particleBaseSize={80}
                moveParticlesOnHover={false}
                alphaParticles={false}
                disableRotation={false}
            />
            <div className="flex flex-col-reverse z-20">
                <div>
                    <div className="relative bg-transparent my-3 overflow-hidden px-1 border-slate-600 rounded-xl">
                        <h1 className={`${alexBrush.className} text-[#9500ff] text-center text-4xl`}>{data?.nameCouple}</h1>
                        <div className="previewURLsPhoto my-10 flex justify-center items-center mt-4 rounded-md w-full">
                            {data && data.images.length > 0 && <MySwiper previewURLs={data.images} />}
                        </div>
                        <ButtonLike onClick={() => blastHearts(4)} />
                        <ContadorEterno initialDate={data?.initialDate} initialHour={data?.initialHours} />
                    </div>
                    <div className="border-b border-white opacity-15 mb-3 px-3 max-w-72 mx-auto"></div>
                    <p className="text-center m-auto max-w-96 px-3 text-sm text-white overflow-y-auto z-50 relative leading-8">{data?.messages}</p>
                    <div className="pt-5">
                        {youtubeEmbedUrl && (
                            <iframe
                                width="330"
                                height="186"
                                className="m-auto rounded-2xl z-50"
                                src={youtubeEmbedUrl}
                                title="YouTube video player"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function UserView() {
    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart"><div></div></div></div>}>
            <UserViewComponent />
        </Suspense>
    );
}
