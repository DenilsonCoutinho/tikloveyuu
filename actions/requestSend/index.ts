"use server"
import { db as prisma } from "../../src/lib/db";

export async function createReqSend(idRequestSend: string, requestSend: string, yesMove: boolean, noMove: boolean, message: string,) {
    try {
        await prisma.requestSend.create({
            data: {
                idRequestSend: idRequestSend,
                requestSend: requestSend,
                yesMove: yesMove,
                noMove: noMove,
                message: message,
            },


        })
        return { success: "Criado com sucesso! " }
    } catch (err) {
        return { error: err }

    }
}

export async function updatecustomerReqId(idUser: string, customerId: string, email: string) {
    try {
        await prisma.requestSend.update({
            where: { idRequestSend: idUser },
            data: { idCostumerAsaas: customerId, email: email }
        })
        console.log("Updatoud certo")
        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}