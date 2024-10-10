"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import { getCoupleById } from "../../../actions/couple"
import ContadorEterno from "../components/counter"
import MySwiper from "../components/mySwiper";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@chakra-ui/react";
import Confetti from "react-confetti"


interface UserViewProps {
    id: string;
    nameCouple: string | null;
    idCouple: string | null;
    images: string[];
    initialDate: string;
    initialHours: string;
    messages: string;
    ytbMusic: string | null;
    createdAt: Date;
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
    useEffect(() => {
        startConfetti()
    }, [])
    return (
        loading ?
            <div className="h-screen flex bg-defaultBg justify-center items-center">
                <div className="lds-heart" ><div></div></div>;
            </div>
            :

            <div className={` ${data?.ytbMusic ? "" : ""} min-h-screen overflow-auto bg-defaultBg bg-contain py-10 flex justify-center items-center`}>
                <div className="flex flex-col-reverse">
                    <div>
                        <div className="relative border bg-[#180d21] my-3 overflow-hidden  border-slate-600 rounded-xl m-auto w-80 px-5">
                            {showConfetti && <Confetti />}

                            <div className="previewURLsPhoto my-10 flex justify-center items-center mt-4  rounded-md  w-full px-4 ">
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