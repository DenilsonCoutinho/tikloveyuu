"use client"
import { Input, Textarea } from "@chakra-ui/react";
import FormPaymentInputs from "../components/formPaymentInputs";
import { useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import Image from "next/image";
export default function Presentation() {

    const [hour, setHour] = useState<any>()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = regexEmoji(e);
        setNameCouple(cleanedValue);
    };

    const [nameCouple, setNameCouple] = useState<string>("")
    const [dataCouple, setDataCouple] = useState<string>("")
    return (
        <main className="">
            <section className="">
                <h1 className="text-redDefault text-7xl font-bold pulsando-sombra">Surpreenda o Mozão</h1>
                <p className="text-white max-w-[900px] font-medium leading-7 pt-2">
                    Crie um contador dinâmico para acompanhar o tempo do seu relacionamento. Preencha o formulário e receba seu site personalizado, junto com um QR Code para compartilhar com o seu amor🙂
                </p>
            </section>
            <div className="flex justify- items-center gap-10">
                <section className="max-w-[800px] w-full">
                    <div>
                        <FormPaymentInputs setSelectedInput={(e) => console.log(e)} />
                        <div className="flex flex-row items-end gap-5 mt-5">
                            <label className="w-full text-white">
                                Nome do casal:
                                <Input onChange={handleChange} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white " />
                            </label>
                            <label className="max-w-72 w-full text-white flex flex-col  ">
                                Inicio do relacionamento:
                                <Input onChange={(e) => setDataCouple(e.target.value)} value={dataCouple} type="date" id="date_couple" className=" text-white " />
                            </label>
                            <label className="text-white max-w-44 w-full">
                                <Input onChange={(e) => setHour(e.target.value)} value={hour} type="time" id="time_couple" className="text-white " />
                            </label>
                        </div>
                        <div className="flex flex-col gap-3 ">
                            <Textarea height={300} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80  text-white placeholder:text-white">

                            </Textarea>
                            <Input type="file"  className=""/>
                        </div>
                    </div>
                </section>
                <aside>
                    <div className=" border bg-[#180d21]  border-white rounded-xl  w-80 px-10">
                        <div className="mt-4 bg-white h-7 w-full flex justify-center items-center rounded-md">
                            <p className="text-black text-center">dominio.com/{nameCouple.trim().replaceAll(" ", "-")}</p>
                        </div>
                        <div className="my-10 flex justify-center items-center mt-4 h-72 rounded-md  w-full px-4 border border-slate-100">
                            <Image alt="icon-imagem" src={iconImg} width={40} height={40} />
                        </div>
                        {hour && <ContadorEterno initialDate={dataCouple} initialHour={hour} />}
                    </div>
                </aside>
            </div>
        </main>
    )
}