"use server"
import { db as prisma } from "../../src/lib/db";

export async function createReqSend(idRequestSend: string, requestSend: string, yesMove: boolean, noMove: boolean, message: string,typeRequestSend:string,image:string) {
    try {
        await prisma.requestSend.create({
            data: {
                idRequestSend: idRequestSend,
                requestSend: requestSend,
                yesMove: yesMove,
                noMove: noMove,
                message: message,
                typeRequestSend:typeRequestSend,
                images:image
            },


        })
        return { success: "Criado com sucesso! " }
    } catch (err) {
        return { error: err }

    }
}

export async function getByReqCustomerId(customerId: string, ) {

    const res = await prisma.requestSend.findFirst({
        where: { idCostumerAsaas: customerId }
    })
    return res

}
export async function getReqById(idUser: string) {
    const res = await prisma.requestSend.findFirst({
        where: { idRequestSend: idUser }
    })
    return res

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

export async function updateResReqId(idUser: string, responsePeople: string,) {
    try {
        await prisma.requestSend.update({
            where: { idRequestSend: idUser },
            data: { responsePeople: responsePeople }
        })
        console.log("Updatoud certo")
        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}

export const deleteReqById = async (id: string) => {

    if (!id) {
        return { error: 'Algo deu errado!' }
    }

    try {
        await prisma.requestSend.delete({
            where: { idRequestSend: id }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}