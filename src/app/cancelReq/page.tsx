"use client"
import { useEffect, useState } from "react";
import {  deleteFolderReq } from "@/lib/deleteimagesfirebase";
import { useRouter } from "next/navigation";
import { deleteReqById } from "../../../actions/requestSend";

export default function pageCancelReq() {
    const [idUser, setIdUser] = useState<string>("")
    const route = useRouter()

    async function executeFunctionUser(idUserLocal: string) {
        await deleteReqById(idUserLocal);
        await deleteFolderReq(idUserLocal);
    }

    useEffect(() => {
        const idUserLocal = localStorage.getItem("idUserResMyLoverTik");
        if (idUserLocal) {
            executeFunctionUser(idUserLocal)
            route.push('/sendRequest')
        }

    }, [])
    return (
        <div className="min-h-screen flex justify-center items-center overflow-auto bg-defaultBg bg-contain">
            <div className="lds-heart" ><div></div></div>
        </div>
    )

}