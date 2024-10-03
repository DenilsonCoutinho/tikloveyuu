"use client"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { deleteCoupleById } from "../../../actions/couple";
import { deleteFolder } from "@/lib/deleteimagesfirebase";
import { useRouter } from "next/navigation";

export default function pageCancel() {
    const [idUser, setIdUser] = useState<string>("")
    const route = useRouter()

    async function executeFunctionUser(idUserLocal: string) {
        await deleteCoupleById(idUserLocal);
        await deleteFolder(idUserLocal);
    }

    useEffect(() => {
        const idUserLocal = localStorage.getItem("idUserMyLoverTik");
        if (idUserLocal) {
            executeFunctionUser(idUserLocal)
            route.push('/')
        }

    }, [])
    return (
        <div className="min-h-screen flex justify-center items-center overflow-auto bg-defaultBg bg-contain">
            <div className="lds-heart" ><div></div></div>
        </div>
    )

}