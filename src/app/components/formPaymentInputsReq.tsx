"use client"
import { useEffect, useState } from "react";
interface inputProps {
    setSelectedInput: (type: string) => void;
}

export default function FormPaymentInputsReq({ setSelectedInput }: inputProps) {
    const [selectInput, setSelectInput] = useState(false)
    useEffect(() => {
        setSelectedInput("1")
    }, [])
    return (
        <div>
            <div className="flex md:flex-row gap-3 border  border-white max-w-[380px] justify-center rounded-md mt-10 p-1">
                <button type="button" value={"1"} onClick={() => { setSelectInput(false); setSelectedInput("1") }} className={`payment-1 ${!selectInput ? "bg-white text-black" : "bg-transparent text-white"}     text-md duration-150 font-medium text-center px-3 h-14 rounded-lg`}>
                    Pedido especial - R$12,99
                </button>
                <button type="button" value={"2"} onClick={() => { setSelectInput(true); setSelectedInput("2") }} className={`payment-1 ${selectInput ? "bg-white  text-black" : "bg-transparent text-white"}    text-md duration-150  font-medium text-center px-3 h-14 rounded-lg`}>
                    Pedido aleatório - R$10,99
                </button>
            </div>
        </div>
    )
}