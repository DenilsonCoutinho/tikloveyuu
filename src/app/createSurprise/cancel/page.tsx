"use client"
import { Suspense, useEffect } from "react";
import { deleteFolderSurprise } from "@/lib/deleteimagesfirebase";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteSurpriseById } from "../../../../actions/surpriseSend";

 function PageCancel() {
    const route = useRouter()
    const searchParams = useSearchParams();

    const code = searchParams.get("id");

    async function executeFunctionUser() {
        await deleteSurpriseById(code as string);
        await deleteFolderSurprise(code as string);
    }

    useEffect(() => {
            executeFunctionUser()
            route.push('/createSurprise/formPayment')
    }, [])
    return (
        <div className="min-h-screen flex justify-center items-center overflow-auto bg-defaultBg bg-contain">
            <div className="lds-heart" ><div></div></div>
        </div>
    )

}


export default function CancelSurprise() {
    return (
        <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<PageCancel />}
        </Suspense>
    );
}
