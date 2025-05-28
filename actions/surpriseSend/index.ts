"use server"
import { db as prisma } from "../../src/lib/db";


export async function getSurpriseById(idSurprise: string) {
    try {
        if (!idSurprise) throw new Error("Seu ID não está correto, Entre em contato com o suporte!")
        const res = await prisma.surpriseSend.findFirst({
            where: { idSurprise }
        })
        return { res }

    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message }
        }
        return { erro: error }

    }
}

export async function createSurpriseSend(idSurprise: string, message: string, image: string[],nameCoupleSurprise: string) {
    try {
        await prisma.surpriseSend.create({
            data: {
                idSurprise,
                nameCoupleSurprise,
                message: message,
                images: image
            },


        })
        return { success: "Criado com sucesso! " }
    } catch (err) {
        return { error: err }

    }
}

export async function getBycustomerIdSurprise(customerId: string,) {

    const res = await prisma.surpriseSend.findFirst({
        where: { idCostumerAsaas: customerId }
    })
    return res

}
export async function updateSurpriseSend(idUser: string, customerId: string, email: string) {
    try {
        await prisma.surpriseSend.update({
            where: { idSurprise: idUser },
            data: { idCostumerAsaas: customerId, email: email }
        })
        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}


export const deleteSurpriseById = async (id: string) => {

    if (!id) {
        return { error: 'Algo deu errado!' }
    }

    try {
        await prisma.surpriseSend.delete({
            where: { idSurprise: id }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}