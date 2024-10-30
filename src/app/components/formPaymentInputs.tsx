"use client"
import { useEffect, useState } from "react";
interface inputProps {
    setSelectedInput: (type: number) => void;
}

export default function FormPaymentInputs({ setSelectedInput }: inputProps) {
    const [selectInput, setSelectInput] = useState(false)
    useEffect(() => {
        setSelectedInput(1)
    }, [])
    return (
        <div>
            <div className="flex md:flex-row gap-3 border  border-white max-w-[570px] justify-center rounded-md mt-10 p-1">
                <button type="button" value={1} onClick={() => { setSelectInput(false); setSelectedInput(1) }} className={`payment-1 ${!selectInput ? "bg-white text-black" : "bg-transparent text-white"}    md:text-md text-xs duration-150 font-medium text-center md:px-3 py-4  rounded-md`}>
                    1 ano, 3 fotos e sem música - R$14,99
                </button>
                <button type="button" value={2} onClick={() => { setSelectInput(true); setSelectedInput(2) }} className={`payment-1 ${selectInput ? "bg-white  text-black" : "bg-transparent text-white"}   md:text-md text-xs duration-150  font-medium text-center md:px-3 py-4  rounded-md`}>
                    Pra sempre, 6 fotos e com música - R$34,99
                </button>
            </div>
        </div>
    )
}