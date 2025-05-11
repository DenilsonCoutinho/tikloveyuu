"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { FaCamera } from "react-icons/fa"

import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-button"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input, Textarea } from "@chakra-ui/react"

import ModalPaymentMom from '@/app/components/modalPaymentMom'
export default function CellPhoneForm() {
  const [typeRequest, setTypeRequest] = useState("1")
  const [nameCall, setNameCall] = useState("")
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File[]>([])
  const [selectPlan, setSelectPlan] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: any) => {

    if (event.acceptedFiles) {
      const files: any = event.acceptedFiles.map((file: any) => URL.createObjectURL(file)); // Converte FileList para array de File
      const filesToUpload: any = event.acceptedFiles // Converte FileList para array de File
      setImage(filesToUpload)
    }
  };
  return (
    <div className="bg-defaultBg">
      <Link href="/">
        {/* <Image alt="logo" width={150} className="m-auto pb-10 py-2" src={logo} /> */}
      </Link>

      <div className="max-w-[1100px] m-auto px-3 pb-20">
        <h1 className="text-white text-5xl font-bold pt-5">
          <span className="relative">Q</span>uase lá!
        </h1>
        <p className="text-white max-w-[590px]">
          Preencha os dados do pedido e receba o link no email para compartilhar diretamente com a pessoa desejada,{" "}
          <span className="shadow-redDefault border-b">enviado ao seu e-mail.</span>
        </p>

        <div>
          <div className="flex md:flex-row gap-3 border  border-redDefault max-w-[180px] justify-center rounded-md mt-10 p-1">
            <button type="button" value={1} onClick={() => { setSelectPlan(false) }} className={`payment-1 ${!selectPlan ? "bg-redDefault text-white" : "bg-transparent text-white"}    text-sm  duration-150 font-bold text-center px-4 py-4  rounded-md`}>
              3 fotos - R$14,99
            </button>

          </div>
        </div>

        <div className="max-w-[700px]">
          <label className="w-full text-white">
            <p className="text-white text-xs max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
              Coloque o nome que vai aparecer na ligação:
            </p>
            <div className="relative">
              <Input
                value={nameCall}
                onChange={(e) => setNameCall(e.target.value)}
                type="text"
                id="name_couple"
                placeholder={"Seu nome aqui"}
                className="text-white border border-white px-3 placeholder:text-slate-400 text-sm"
              />
            </div>
          </label>



          <label className="w-full text-white">
            <p className="text-white text-xs max-w-[400px] font-medium md:leading-7 leading-2 pt-2">
              Digite a mensagem para sua mãe ❤
            </p>
            <Textarea
              className="border max-h-56 min-h-56 border-white px-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <FileUploadRoot ref={fileInputRef} accept={["image/png", "image/gif", "image/jpeg"]} onFileChange={handleFileChange} maxFiles={3}>
            <FileUploadTrigger asChild>
              <Button variant="outline" className='text-white border-redDefault border w-full py-4' size="sm">
                <FaCamera className='text-white' />Escolha até 3 fotos
              </Button>
            </FileUploadTrigger>
          </FileUploadRoot>
          <p className="text-white">{image.length} de 3 fotos foram selecionadas</p>
          {nameCall && message && image.length > 0 ? (
            <DialogTrigger asChild>
              <button className="border text-white px-2 max-w-[300px] w-full hover:text-black hover:bg-white bg-transparent duration-200 cursor-pointer flex flex-col justify-center items-center rounded-md mt-3 py-2">
                Criar pedido
              </button>
            </DialogTrigger>
          ) : (
            <button
              disabled
              className="border text-white bg-transparent duration-200 px-2 max-w-[300px] w-full flex flex-col justify-center items-center rounded-md mt-3 py-2"
            >
              Criar pedido
              <p className="text-slate-400 text-xs">Campos a serem preenchidos</p>
            </button>
          )}
        </div>
      </div>
      <DialogContent className='bg-white'>
        <ModalPaymentMom images={image} message={message} namecall={nameCall} />
      </DialogContent>
    </div>
  )
}
