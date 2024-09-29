"use client"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { deleteCoupleById } from "../../../actions/couple";
import { deleteFolder } from "@/lib/deleteimagesfirebase";

export default function pageCancel() {
    const [idUser, setIdUser] = useState<string>("")

    async function executeFunctionUser(idUserLocal: string) {
        await deleteCoupleById(idUserLocal);
        await deleteFolder(idUserLocal);
    }

    useEffect(() => {
        console.log('aqui')
        const idUserLocal = localStorage.getItem("idUserMyLoverTik");
        if (idUserLocal) {
            executeFunctionUser(idUserLocal)
        }

    }, [])
    return (
        <div className="min-h-screen flex justify-center items-center overflow-auto bg-defaultBg bg-contain">
            <div className="lds-heart"><div></div></div>
        </div>
    )

}