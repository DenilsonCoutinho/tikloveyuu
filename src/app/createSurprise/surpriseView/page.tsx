"use client"

import { useCreateCard } from "@/lib/zustad/useCreateCard"
import Particles from "../../../../components/Particles/Particles"
import ImageCouples from "../components/imagesCouple"
import RoundSix from "../components/roundSix"
import SmoothText from "../components/smoothText"
import { Dancing_Script, } from 'next/font/google'
import HoldToConfirmButton from "../components/holdButton"
import { Suspense, useEffect, useState } from "react"
import { getSurpriseById } from "../../../../actions/surpriseSend"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/app/components/toast"
interface Surprise {
    id: string;
    idSurprise: string;
    typeSurprise: string | null;
    paid: string | null;
    message: string | null;
    spotifyMusic: string | null;
    email: string | null;
    images: string[];
    nameCoupleSurprise: string | null;
    idCostumerAsaas: string | null;
    idSession: string | null;
    createdAt: Date;
}
interface SurpriseResponse {
    res: Surprise | null;
    error?: undefined;
    erro?: undefined;
}

const dancing_Script = Dancing_Script({
    subsets: ['latin'],
    weight: '700',

})

function ContainerCreateCard() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<SurpriseResponse | null>(null)
    const code = searchParams.get("id");
    const { toast } = useToast()

    useEffect(() => {
        async function getData() {
    
            try {
                const data = await getSurpriseById(code as string)
                if (!data.res) throw new Error("Seu ID não está disponivel, Recarregue a página!")
                setData(data)
                setSpotifyMusic(data.res.spotifyMusic)
            } catch (error) {
                if (error instanceof Error) {
                    toast({
                        variant: 'destructive',
                        title: "Alerta!",
                        description: <p className="text-white md:text-base text-[10px]" >{error?.message}</p>,
                        action: <ToastAction onClick={() => location.reload()} className="border rounded-lg p-1 border-white text-[11px]" altText="Refresh">Refresh</ToastAction>,
                    })
                }
            }
        }
        getData()
    }, [])
    const { setStep, step,setSpotifyMusic } = useCreateCard()
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-defaultBg select-none" >
            <Particles
                className='fixed top-0  z-10  h-screen w-full  '
                particleColors={['#fff']}
                particleCount={500}
                particleSpread={15}
                speed={0.08}
                cameraDistance={52}
                particleBaseSize={80}
                alphaParticles={false}
                disableRotation={false}
            />
            {step === 0 ? <HoldToConfirmButton onConfirm={() => setStep(1)} />
                : step === 1 ?
                    <>
                        <RoundSix />
                        <SmoothText text={data?.res?.message} />
                    </>
                    :
                    <>
                        <h1 className={`${dancing_Script.className} text-[#9500ff]   text-center font- text-5xl pt-10`}>{data?.res?.nameCoupleSurprise}</h1>
                        <ImageCouples images={data?.res?.images} />
                    </>
            }
        </div>
    )
}


export default function UserViewSurprise() {
    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<ContainerCreateCard />}
        </Suspense>
    );
}

