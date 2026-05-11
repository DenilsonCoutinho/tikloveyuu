
import { Button, Input, Textarea, useDisclosure, } from "@chakra-ui/react";
import { FileUploadRoot, FileUploadTrigger } from '@/components/ui/file-button';
import { FaCamera } from 'react-icons/fa';
import { useFormUserContext } from "../../../../../context/FormUserContext";

export default function FormFields() {
    const {
        dataCouple, setDataCouple,
        hour, setHour,
        nameCouple,
        message, setMessage,
        typeProduct,
        youtubeLink, setYoutubeLink,
        fileInputRef,
        handleChange,
        handleFileChange,
    } = useFormUserContext();
    return (
        <>
            <form className="flex flex-col md:gap-4 gap-4 mt-5 w-full">
                <div className='flex md:flex-row flex-col'>
                    <label className="w-full text-white">
                        <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                            Nome do casal:
                        </p>
                        <div className='relative'>
                            <Input onChange={handleChange} fontSize={13} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white text-sm px-1 border-redDefault border" />
                        </div>
                    </label>
                    <div className='flex flex-row items-end w-full gap-3 justify-center'>
                        <label className="md:max-w-40 w-full text-white flex flex-col  ">
                            <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                Inicio do relacionamento:
                            </p>
                            <div className='relative'>
                                <Input onChange={(e) => setDataCouple(e.target.value)} fontSize={13} value={dataCouple} type="date" id="date_couple" className=" text-white text-sm border-redDefault border px-1" />
                            </div>
                        </label>
                        <label className="text-white md:max-w-40 w-full">
                            <p className="text-white text-xs  max-w-[900px] font-medium md:leading-7 leading-2 pt-2">
                                Hora:
                            </p>
                            <div className='relative'>
                                <Input onChange={(e) => setHour(e.target.value)} fontSize={13} value={hour} type="time" id="time_couple" className="text-white text-sm border-redDefault border px-1" />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-3 ">
                    <Textarea fontSize={13} onChange={(e) => setMessage(e.target.value)} value={message} height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white border-redDefault border px-2">

                    </Textarea>
                    <div className="flex flex-col">
                        <p className="text-white">Escolha até {typeProduct === 1 ? "3" : "6"} fotos</p>
                        <FileUploadRoot ref={fileInputRef} accept={["image/png", "image/gif", "image/jpeg"]} onFileChange={handleFileChange} maxFiles={typeProduct === 1 ? 3 : 6}>
                            <FileUploadTrigger asChild>
                                <Button variant="outline" className='text-white border-redDefault border w-full py-4' size="sm">
                                    <FaCamera className='text-white' />Escolha até {typeProduct === 1 ? "3" : "6"} fotos
                                </Button>
                            </FileUploadTrigger>
                        </FileUploadRoot>
                        {typeProduct === 2 &&
                            <label className="text-white  w-full mt-3">
                                <p className="text-white">Música Youtube: (Opcional)</p>
                                <Input onChange={(e) => setYoutubeLink(e.target.value)} type="text" value={youtubeLink} className="placeholder:text-white border-white border text-white flex text-sm justify-center items-center" />
                            </label>}
                    </div>
                </div>
            </form>
        </>
    )
}