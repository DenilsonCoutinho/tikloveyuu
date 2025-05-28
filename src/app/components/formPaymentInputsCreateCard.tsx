"use client"
import { useEffect, useState } from "react";
interface inputProps {
    setSelectedInput: (type: string) => void;
}

export default function FormPaymentInputsCreateCard({ setSelectedInput }: inputProps) {
    const [selectInput, setSelectInput] = useState(false)
    const [userLocale, setUserLocale] = useState("")
    useEffect(() => {
        setSelectedInput("1")
        setUserLocale(navigator.language)
    }, [])


    const PedidoAleatorio = () => {

        if (typeof userLocale === undefined) return
        const priceBRL = 19.99;
        const priceUSD = 19.99;
        const priceEUR = 19.99;

        const formattedPrice =
            userLocale === "pt-BR"
                ? new Intl.NumberFormat(userLocale, {
                    style: "currency",
                    currency: "BRL",
                }).format(priceBRL)
                : userLocale === "en-US"
                    ? new Intl.NumberFormat(userLocale, {
                        style: "currency",
                        currency: "USD",
                    }).format(priceUSD)
                    : userLocale === "es-ES" || userLocale === "fr-FR" || userLocale === "de-DE"
                        ? new Intl.NumberFormat(userLocale, {
                            style: "currency",
                            currency: "EUR",
                        }).format(priceEUR)
                        : ""; // Fallback para locais não suportados

        return <div>Crie sua surpresa - {formattedPrice}</div>;
    };

    return (
        <div>
            <div className="flex md:flex-row gap-3 border  border-white max-w-[380px] justify-center rounded-md mt-10 p-1">
                {/* <button type="button" value={"1"} onClick={() => { setSelectInput(false); setSelectedInput("1") }} className={`payment-1 ${!selectInput ? "bg-white text-black" : "bg-transparent text-white"}     text-md duration-150 font-medium text-center px-3 md:py-0 py-2 md:h-14 rounded-lg`}>
                    Pedido especial - R$12,99
                </button> */}
                <button type="button" value={"1"} onClick={() => { setSelectInput(true); setSelectedInput("1") }} className={`payment-1 bg-white  text-black w-full  text-md duration-150  font-medium text-center px-3 md:py-0 py-2 md:h-14 rounded-lg`}>
                    <PedidoAleatorio />
                </button>
            </div>
        </div>
    )
}