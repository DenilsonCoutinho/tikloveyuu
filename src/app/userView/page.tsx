"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import { getCoupleById } from "../../../actions/couple"
import ContadorEterno from "../components/counter"
import MySwiper from "../components/mySwiper";

import { useRouter, useSearchParams } from "next/navigation";

import Confetti from "react-confetti"

import Image from "next/image";
import { emojiBlast, emojiBlasts } from "emoji-blast";
import ButtonPayment from "../components/button-payment";

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
    const [data, setData] = useState<UserViewProps | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const route = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [showConfetti, setShowConfetti] = useState(false);



    useEffect(() => {

        if (!id) {
            route.push("/")
            return
        }

        async function getDataCouple() {
            setLoading(true)
            if (!id) return
            const response = await getCoupleById(id)
            setData(response)
        }
        getDataCouple()
        setLoading(false)
    }, [])

    async function startConfetti() {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 9000);

    }
    const heartImageUrl = 'https://images.unsplash.com/photo-1500336629070-b0e356d4ac60';  // Exemplo de URL pública

    useEffect(() => {
        emojiBlast({
            emojis: ["💝", "💞", "", "💖", "💜", "💘"],

            position: {
                x: innerWidth / 2,
                y: innerHeight / 2
            }
            ,
            emojiCount: () => 44
        })

        const elementos = document.querySelectorAll(".bolha");

        elementos.forEach((elemento: any) => {
            const i = getComputedStyle(elemento).getPropertyValue("--i");
            elemento.style.animation = `animar calc(30s / ${i}) linear infinite`;
        });
    }, [])
    return (
        loading ?
            <div className="h-screen flex bg-defaultBg justify-center items-center">
                <div className="lds-heart" ><div></div></div>;
            </div>
            :

            <div className={` ${data?.ytbMusic ? "" : ""} useViewBg overflow-y-hidden relative min-h-screen overflow-auto bg-defaultBg bg-contain py-10 flex justify-center items-center`}>
                {/* <div className="flex absolute justify-between w-full  ">
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
                </div> */}
                <div className="flex flex-col-reverse">
                    <div>
                        <div className="relative border bg-transparent my-3 overflow-hidden  border-slate-600 rounded-xl m-auto w-80 px-5">
                            {/* {showConfetti && <Confetti />} */}
                            <p className="text-white text-center font- text-xl">{data?.nameCouple}</p>

                            <div className="previewURLsPhoto my-10 flex flex- justify-center items-center mt-4  rounded-md  w-full px-4 ">
                                {
                                    data &&
                                    data?.images.length > 0 &&
                                    <MySwiper previewURLs={data?.images} />
                                }
                            </div>
                            <ContadorEterno initialDate={data?.initialDate} initialHour={data?.initialHours} />
                        </div>
                        <p className="text-center m-auto max-w-96 px-3 text-sm text-white  overflow-y-auto">{data?.messages}</p>
                    </div>
                    {
                        data?.ytbMusic &&
                        <iframe width="330" height="186" className="m-auto rounded-2xl" src={`https://www.youtube.com/embed/${new URL(data?.ytbMusic || "").pathname.split('/')[1]}?autoplay=1&mute=1`} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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