"use client"
import Image from "next/image";
import bear from '../../../assets/bear.webp'
import heart_fire from '../../../assets/heart-fire.webp'
import { scrollToDiv } from "../../../../utils/scrollToDiv";
import { usePlan } from "../../../../context/changePlanContext";
import GlowEffect from "@/app/components/glowEffect/glowEffec";
import { useRouter } from "next/navigation";


interface inputProps {
    setSelectedInput: (type: number) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Prices({ setSelectedInput }: inputProps) {
    const route = useRouter()
    const { setSelectPlan } = usePlan()

    return (
        <>
            <div id="Prices" className=" text-white max-w-[1100px] w-full m-auto flex flex-col items-center mt-64 mb-20 px-3">
                <h1 className="text-4xl font-bold mb-10">Preço</h1>

                <div className="flex md:flex-row flex-col justify-center gap-8  w-full">
                    <div className="">
                        <GlowEffect />
                        <div className="bg-[#161b22d2] border-2 border-redDefault rounded-lg p-6 md:w-96  relative shadow-md">
                            {/* <div className="absolute -top-3 right-3 bg-[#ff6d6d] text-white text-xs font-bold px-3 py-1 rounded-md">
                                Mais Escolhido
                            </div> */}
                            <div className="flex  items-center">
                                <div className="flex flex-col ">
                                    <h2 className="text-xl font-semibold mb-4">Premium</h2>
                                    <p className="text-3xl font-bold mb-4">
                                        R$19,90 <span className="line-through text-gray-500 text-base">R$54,99</span>
                                    </p>
                                </div>

                                <Image
                                    src={heart_fire}
                                    alt="Coração com fogo"
                                    width={80}
                                    height={80}
                                    className="mx-auto mb-4"
                                />
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    ✔ <span>Pra sempre</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    ✔ <span>7 fotos</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    ✔ <span>Timeline infinita moderna</span>
                                </li>
                            </ul>
                            <button onClick={() => { route.push("/7memories") }} className="mt-6 w-full  bg-redDefault hover:bg-purple-800 duration-300 text-white py-2 rounded-md">
                                Quero fazer minha timeline Infinita
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}