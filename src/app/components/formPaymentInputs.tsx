"use client"
import { Input } from "@chakra-ui/react";
import { useState } from "react";
interface inputProps {
    setSelectedInput: (type: number) => void;
}
export default function FormPaymentInputs({ setSelectedInput }: inputProps) {
    const [selectInput, setSelectInput] = useState(false)
    return (
        <div>
            <div className="flex md:flex-row gap-3 border border-white max-w-[650px] justify-center rounded-md mt-10 p-1">
               <a href="https://buy.stripe.com/test_dR69DNaKc4Xmasg5kk" >
                    <button type="button" value={1} onClick={() => { setSelectInput(false); setSelectedInput(1) }} className={`payment-1 ${!selectInput ? "bg-white text-black" : "bg-transparent text-white"}   text-sm  text-center px-3 h-10 rounded-lg`}>
                        1 ano, 3 fotos e sem música - R$14,99
                    </button>
                </a>
                <button type="button" value={2} onClick={() => { setSelectInput(true); setSelectedInput(2) }} className={`payment-1 ${selectInput ? "bg-white  text-black" : "bg-transparent text-white"}   text-sm  text-center px-3 h-10 rounded-lg`}>
                    Pra sempre, 7 fotos e com música - R$34,99
                </button>
            </div>
        </div>
    )
}