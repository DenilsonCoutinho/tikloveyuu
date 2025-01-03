import Image from "next/image";
import bear from '../../assets/bear.webp'
import heart_fire from '../../assets/heart-fire.webp'
import { scrollToDiv } from "../../../utils/scrollToDiv";
import { useState } from "react";
import { usePlan } from "../../../context/changePlanContext";


interface inputProps {
    setSelectedInput: (type: number) => void;
}
export default function Prices({setSelectedInput}:inputProps) {

    const [typeProduct, setTypeProduct] = useState<number>(1)
    const { setSelectPlan } = usePlan()

    return (
        <>
            <div className=" text-white max-w-[1100px] w-full m-auto flex flex-col items-center my-20 px-3">
                <h1 className="text-4xl font-bold mb-10">Preços</h1>
                <div className="flex md:flex-row flex-col justify-between gap-8  w-full">
                    {/* Card Básico */}
                    <div className="bg-[#161b22] rounded-lg p-6 md:w-96 w-full relative shadow-md">
                        <div className="flex  items-center">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold mb-4">Básico</h2>
                                <p className="text-3xl font-bold mb-4">R$14,99</p>
                            </div>
                            <Image
                                src={bear}
                                alt="Ursinho com coração"
                                width={80}
                                height={80}
                                className="mx-auto mb-4"
                            />
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                {/* ✔ <span>1 ano de acesso</span> */}
                            </li>
                            <li className="flex items-center gap-2">
                                ✔ <span>3 fotos</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-500">
                                ✖ <span>Sem música</span>
                            </li>
                        </ul>
                        <button onClick={() => {scrollToDiv("my_form");setSelectedInput(1);setSelectPlan(false)}} className="mt-6 w-full bg-redDefault hover:bg-purple-800 duration-300 text-white py-2 rounded-md">
                            Quero fazer meu site
                        </button>
                    </div>

                    {/* Card Premium */}
                    <div className="bg-[#161b22] border-2 border-redDefault rounded-lg p-6 md:w-96  relative shadow-md">
                        <div className="absolute -top-3 right-3 bg-[#ff6d6d] text-white text-xs font-bold px-3 py-1 rounded-md">
                            Mais Escolhido
                        </div>
                        <div className="flex  items-center">
                            <div className="flex flex-col ">
                                <h2 className="text-xl font-semibold mb-4">Premium</h2>
                                <p className="text-3xl font-bold mb-4">
                                    R$34,99 <span className="line-through text-gray-500 text-base">R$54,99</span>
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
                                {/* ✔ <span>Pra sempre</span> */}
                            </li>
                            <li className="flex items-center gap-2">
                                ✔ <span>6 fotos</span>
                            </li>
                            <li className="flex items-center gap-2">
                                ✔ <span>Com música</span>
                            </li>
                        </ul>
                        <button onClick={() => {scrollToDiv("my_form");setSelectedInput(2);setSelectPlan(true)}} className="mt-6 w-full  bg-redDefault hover:bg-purple-800 duration-300 text-white py-2 rounded-md">
                            Quero fazer meu site
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}