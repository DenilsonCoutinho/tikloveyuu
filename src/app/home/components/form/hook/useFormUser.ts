import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import regexEmoji from "../../../../../../utils/maskEmoji"
import { v4 as uuidv4 } from 'uuid';

export function useFormUser() {
    const [hour, setHour] = useState<string>("")
    const [nameCouple, setNameCouple] = useState<string>("")
    const [youtubeLink, setYoutubeLink] = useState<string>("")
    const [typeProduct, setTypeProduct] = useState<number>(1)
    const [dataCouple, setDataCouple] = useState<string>("")
    const [imageCouple, setImageCouple] = useState<any>([])
    const [message, setMessage] = useState<string>("")
    const [previewURLs, setPreviewURLs] = useState<[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { onOpen } = useDisclosure()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = regexEmoji(e);
        setNameCouple(cleanedValue);
    };

    const handleFileChange = async (event: any) => {
        if (event.acceptedFiles) {
            const files: any = event.acceptedFiles.map((file: any) => URL.createObjectURL(file)); // Converte FileList para array de File
            const filesToUpload: any = event.acceptedFiles // Converte FileList para array de File
            setPreviewURLs(files);
            setImageCouple(filesToUpload)
        }
    };
    useEffect(() => {
        const idUser = uuidv4()
        localStorage.setItem("idUserMyLoverTik", idUser);
        setPreviewURLs([])
    }, [])


    async function submit() {
        if (!nameCouple || !hour || !dataCouple) {
            return
        }
        if (imageCouple.length == 0) {
            return
        }
        onOpen()
    }

    const getYoutubeVideoId = (url: string) => {
        const regex = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };
    return {
        hour, setHour,
        nameCouple,
        youtubeLink, setYoutubeLink,
        typeProduct, setTypeProduct,
        dataCouple, setDataCouple,
        imageCouple,
        message, setMessage,
        previewURLs,
        fileInputRef,
        handleChange,
        handleFileChange,
        submit, getYoutubeVideoId

    }
}