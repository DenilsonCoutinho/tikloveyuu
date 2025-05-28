"use client"

import { useCreateCard } from "@/lib/zustad/useCreateCard"
import Particles from "../../../components/Particles/Particles"
import ImageCouples from "./components/imagesCouple"
import RoundSix from "./components/roundSix"
import SmoothText from "./components/smoothText"
import { Dancing_Script, } from 'next/font/google'
import HoldToConfirmButton from "./components/holdButton"

const dancing_Script = Dancing_Script({
    subsets: ['latin'],
    weight: '700',

})

export default function ContainerCreateCard() {
    const { setStep, step } = useCreateCard()
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-defaultBg" >
            {/* <Particles
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
                        <SmoothText />
                    </>
                    :
                    <>
                        <h1 className={`${dancing_Script.className} text-[#9500ff]   text-center font- text-5xl pt-10`}>Deni e kai</h1>
                        <ImageCouples />
                    </>
            } */}
        </div>
    )
}



