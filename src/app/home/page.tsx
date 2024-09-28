"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import FormPaymentInputs from "../components/formPaymentInputs";
import { useEffect, useRef, useState } from "react";
import regexEmoji from "../../../utils/maskEmoji";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import ContadorEterno from "../components/counter";
import iconImg from '../../assets/photo (1).png'
import Image from "next/image";
import MySwiper from "../components/mySwiper";
import app from "../../../lib/firebase";
import CheckoutButton from '../components/checkoutButton';
type responseUpload = {
    errorImg?: string | undefined
    successImg?: string | undefined
    imgUpload?: string | undefined
}
export default function Presentation() {
    const storage = getStorage(app)

    const toast = useToast()
    const [hour, setHour] = useState<any>()
    const [nameCouple, setNameCouple] = useState<string>("")
    const [typeProduct, setTypeProduct] = useState<number | undefined>(undefined)
    const [dataCouple, setDataCouple] = useState<string>("")
    const [imageCouple, setImageCouple] = useState<any>([])
    const [previewURLs, setPreviewURLs] = useState<[]>([])
    const [idUser, setIdUser] = useState<string | null>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = regexEmoji(e);
        setNameCouple(cleanedValue);
    };
    const handleFileChange = async (event: any) => {
        // console.log(event)
        if (event.target.files) {
            const files: any = Array.from(event.target.files); // Converte FileList para array de File
            if (files?.length > 3) {
                toast({
                    title: 'Atenção',
                    description: "Você só pode selecionar até 3 arquivos no total.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }
            setImageCouple(files);

            console.log(files)
            // Gerar URLs de pré-visualização para cada arquivo
            const fileURLs = files.map((file: any) => URL.createObjectURL(file));
            setPreviewURLs(fileURLs);
        }
    };
    useEffect(() => {
        let idUserLocal = localStorage.getItem("idUserMyLoverTik");
        setIdUser(idUserLocal)

        if (idUserLocal) {
            return
        }

        localStorage.setItem("idUserMyLoverTik", uuidv4());

    }, [])
    console.log(idUser)
    async function handleUpload(): Promise<responseUpload> {

        for (let i = 0; i < imageCouple.length; i++) {
            console.log('aqui2')
            console.log(imageCouple.length)
            const storageRef = ref(storage, `user/${idUser}/images/` + imageCouple[i]?.name)
            await uploadBytes(storageRef, imageCouple[i])

            const downLoadURL = await getDownloadURL(storageRef)
            console.log(downLoadURL)
        }

        return { errorImg: "Sem imagem carregada!" }
    }

    const deleteFolder = async (userId: string | null) => {
        const folderRef = ref(storage, `user/${userId}/images`);
        const listRef = await listAll(folderRef);

        for (const item of listRef.items) {
            await deleteObject(item);
        }

        // Exclui a pasta se necessário, apenas uma referência é suficiente para excluir.
    };


    return (
        <main className="">
            <section className="">
                <h1 className="text-redDefault text-6xl font-black pulsando-sombra">Surpreenda alguem especial!</h1>
                <p className="text-white max-w-[900px] font-medium leading-7 pt-2">
                    Crie um contador dinâmico para acompanhar o tempo do seu relacionamento. Preencha o formulário e receba seu site personalizado, junto com um QR Code para compartilhar com o seu amor🙂
                </p>
            </section>
            <div className="flex justify- items-center gap-10">
                <section className="max-w-[800px] w-full">
                    <div>
                        <FormPaymentInputs setSelectedInput={(e) => setTypeProduct(e)} />
                        <div className="flex flex-row items-end gap-5 mt-5">
                            <label className="w-full text-white">
                                Nome do casal:
                                <Input onChange={handleChange} value={nameCouple} type="text" id="name_couple" placeholder="Nome do casal (Não use emoji)" className="text-white placeholder:text-white " />
                            </label>
                            <label className="max-w-56 w-full text-white flex flex-col  ">
                                Inicio do relacionamento:
                                <Input onChange={(e) => setDataCouple(e.target.value)} value={dataCouple} type="date" id="date_couple" className=" text-white " />
                            </label>
                            <label className="text-white max-w-44 w-full">
                                <Input onChange={(e) => setHour(e.target.value)} value={hour} type="time" id="time_couple" className="text-white " />
                            </label>
                        </div>
                        <div className="flex flex-col gap-3 ">
                            <Textarea height={250} placeholder="Escreva sua mensagem para sua pessoa especial ❤" className="mt-10 h-80 max-h-[250px] text-white placeholder:text-white">

                            </Textarea>
                            <div className="flex flex-col">
                                <p className="text-white">Escolha até 3 fotos</p>
                                <Input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" multiple={true} className="placeholder:text-white text-white flex justify-center items-center" />
                            </div>
                        </div>
                    </div>

                </section>
                <aside>
                    <div className="flex flex-col">
                        <div className=" border bg-[#180d21]  border-white rounded-xl  w-80 px-10">
                            <div className="mt-4 bg-white h-7 w-full flex justify-center items-center rounded-md">
                                <div className="w-96 h-7 overflow-hidden myscroll overflow-x-auto whitespace-nowrap">
                                    <p className="text-center px-2 ">
                                        dominio.com/{nameCouple.trim().replaceAll(" ", "-")}
                                    </p>
                                </div>
                            </div>
                            <div className="previewURLsPhoto my-10 flex justify-center items-center mt-4 h-72 rounded-md  w-full px-4 ">
                                {
                                    previewURLs.length > 0 ?
                                        <MySwiper previewURLs={previewURLs} />
                                        :
                                        <Image alt="icon-imagem" src={iconImg} width={40} height={40} />
                                }
                            </div>
                            {hour && <ContadorEterno initialDate={dataCouple} initialHour={hour} />}
                        </div>

                        <CheckoutButton url={typeProduct === 1 ? "create-payment-intent":"create-payment-another"} productName={typeProduct === 1 ? "1 ano, 3 fotos e sem música - R$14,99" : "Pra sempre, 7 fotos e com música - R$34,99"} productPrice={typeProduct === 1 ? 1499 : 3499} /> 

                        <Button bg={"slategray"} onClick={() => handleUpload()} textColor={'white'} className="border text-white mt-3"> Criar meu site</Button>
                        <Button bg={"slategray"} onClick={() => deleteFolder(idUser)} textColor={'white'} className="border text-white mt-3"> deletar</Button>
                    </div>
                </aside>
            </div>

        </main>
    )
}