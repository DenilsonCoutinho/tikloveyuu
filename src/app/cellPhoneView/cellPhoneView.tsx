"use client"

import { Button } from '@/components/ui/button';
import { Alex_Brush, Dancing_Script, Lora } from 'next/font/google';
import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import { useRef, useState } from "react";
import { FaLockOpen, FaPhoneAlt, FaUser } from 'react-icons/fa'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { getCoupleById } from '../../../actions/couple';
import Image from 'next/image';
import { getMomById } from '../../../actions/mom';
import { useSearchParams } from 'next/navigation';
interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}
const lora = Dancing_Script({
  subsets: ['latin'],
  weight: '700',
  style: 'normal'
})
const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 3, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={` bg-clip-text  ${disabled ? '' : 'animate-shine'} ${className} `}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0) 40%)',
        backgroundSize: '200% 5%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

// components/AutoPlayAudio.tsx

interface UserViewProps {
  id: string;
  nameCall: string | null;
  images: string[];
  idCall: string;
  email: string | null;
  paid: string | null;
  messages: string | null;
  idCostumerAsaas: string | null;
}



 function CellPhoneView() {


  const audioRef = useRef<HTMLAudioElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dragX, setDragX] = useState(0);
  const [steps, setSteps] = useState(0);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number | null>(null);
  const [data, setData] = useState<UserViewProps | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startXRef.current;
      const limitedX = Math.min(Math.max(deltaX, 0), 120);
      setDragX(limitedX);
    }
  };

  const handleTouchEnd = async () => {

    if (dragX > 100) {
      document.querySelector(".container-top")?.classList.add("fade-out")
      document.querySelector(".container-bottom")?.classList.add("fade-out")
      await new Promise(resolve => setTimeout(resolve, 1700))
      setSteps(2)
    }
    if (audioRef.current) {
      document.querySelector(".my-audio")?.classList.add("hidden")


      audioRef.current.volume = 0;
    }
    startXRef.current = null;
  };

  async function step_0() {
    audioRef.current?.play(); document.querySelector('.uiverse')?.classList.add("fade-out")
    await new Promise(resolve => setTimeout(resolve, 700))
    setSteps(1)
  }

  async function step_2() {
    await new Promise(resolve => setTimeout(resolve, 2200))
    document.querySelector('.images-mom')?.classList.remove("opacityTo-0")
    document.querySelector('.images-mom')?.classList.add("opacityTo-1")
    document.querySelector('.text-rgb-shine')?.classList.remove("text-7xl", "w-40")
    document.querySelector('.text-rgb-shine')?.classList.add("text-3xl")
    document.querySelector('.message')?.classList.remove("hidden")

  }
  useLayoutEffect(() => {
    if (steps === 2) {
      step_2()
    }
  }, [steps])
  useEffect(() => {


    async function getDataCouple() {
      try {
        if (!id) {
          throw new Error("Seu ID não está disponivel, Recarregue a página!")
        }
        const res = await getMomById(id)
        if (res.error) {
          setData(null)
          throw new Error(res?.error as string)
        }
        setData(res?.res || null)

        await new Promise(resolve => setTimeout(resolve, 1000))
        setLoading(false)

      } catch (error) {

      } finally {
        setLoading(false)
      }

    }
    getDataCouple()
  }, [])


  return (
    <div className="bg-[#181818]  h-screen overflow-y-auto px-2 py-2 flex justify-center">

      {steps < 2 && <audio className='my-audio' ref={audioRef} src="/toque-de-ligacao-iphone-hxujgs29dy0_BCpf5pyi.mp3" preload="auto" loop />}
      <div
        className="relative w-full h-[89%] rounded-2xl border-[2px] border-[#282828] p-[2px]  overflow-hidden"
      >
        <div className="absolute inset-0 bgCellPhone z-0" />

        {steps === 0 && <>
          <div className="absolute bottom-64 left-0 w-full  flex justify-center z-20 container-bottom">
            <button className="uiverse" onClick={() => { step_0() }}>
              <div className="wrapper">
                <span>Desbloquear</span>
                <div className="circle circle-12"></div>
                <div className="circle circle-11"></div>
                <div className="circle circle-10"></div>
                <div className="circle circle-9"></div>
                <div className="circle circle-8"></div>
                <div className="circle circle-7"></div>
                <div className="circle circle-6"></div>
                <div className="circle circle-5"></div>
                <div className="circle circle-4"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-1"></div>
              </div>
            </button>
          </div>
        </>}

        {steps === 1 && <div className='z-10 r'>
          <div
            className="absolute inset-0 container-top  rounded-[25px]  flex flex-col items-center  pt-10 text-white"
          >
            <div className="absolute inset-0 bgCellPhone z-0" />

            <div className="pulse-container relative w-14 h-14 ">
              <div className="bg-white w-14 h-14 rounded-full pulse-ring absolute top-0 left-0 ">
              </div>
              <div className="bg-white w-14 h-14 rounded-full flex justify-center items-center  absolute top-0 left-0 ">
                <FaUser className='text-gray-400'/>

              </div>
            </div>
            <div className="text-xs mt-1 text-slate-600 z-20">Ligação</div>
            <h1 className=" text-slate-600 text-base font-bold text-center leading-[35px] z-20">
              {data?.nameCall}
            </h1>
          </div>

          {/* Slide para atender */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center z-10 container-bottom">
            <div className="relative w-[160px] h-[45px] bg-[#A3A3A3] backdrop-blur-sm rounded-full overflow-hidden ">
              <div
                ref={dragRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="absolute top-0 left-0 w-[45px] h-[45px] rounded-full bg-white shadow-md flex items-center justify-center text-white font-bold text-sm active:scale-95 transition-transform"
                style={{
                  transform: `translateX(${dragX}px)`,
                }}
              >
                <FaPhoneAlt className='text-green-500' />
              </div>
              <ShinyText text='atender' className='text-[#0000005e] absolute shine w-full top-1/2 left-1/2 -translate-x-[1.2rem] font-semibold -translate-y-1/2' />

              {/* <div className="absolute shine w-full top-1/2 left-1/2 -translate-x-[1.2rem] font-semibold -translate-y-1/2 text-slate-600 text-sm opacity-70 pointer-events-none">
                atender
              </div> */}
            </div>
          </div>
        </div>}

        {steps === 2 && <div
          className="absolute inset-0 container-top rounded-[25px]  flex flex-col items-center  pt-10 text-white">
          <h1 className={`text-center text-7xl w-40 text-rgb-shine px-3 ${lora?.className}`}>
            Feliz dia das mães
          </h1>
          <div
            className="h-80 w-52 images-mom border opacityTo-0  duration-1000 rounded-xl border-slate-300">
            <>
              <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {
                  data?.images.map((img: any, i: any) => {
                    return <SwiperSlide id='' key={"image" + i}>
                      <div className="relative bg-cover text-transparent bg-no-repeat bg-center h-full" >
                        <img
                          className=" w-full h-full object-cover "
                          width={222}
                          height={222}
                          alt='323'
                          src={img}
                        />
                      </div>

                    </SwiperSlide>
                  })
                }
              </Swiper>
            </>
          </div>
          <div className='message max-h-32 overflow-y-auto hidden '>
            <h1 className="text-center text-[#ffffff] text-xs font-medium px-3 texto-reluzente ">
              {data?.messages}
            </h1>
          </div>
        </div>}
        {/* Moldura superior */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[35%] h-[18px] bg-black rounded-b-[10px]">
          <div className="absolute top-[2px] right-1/2 translate-x-1/2 w-[40%] h-[2px] rounded bg-[#141414]" />
          <div className="absolute top-[6px] right-[84%] translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white/5">
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-blue-500/20" />
          </div>
        </div>
      </div>

      {/* Animação do gradiente */}

    </div>
  );
}


export default function CellPhone() {
    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<CellPhoneView />}
        </Suspense>
    );
}