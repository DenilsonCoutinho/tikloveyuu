"use server"

import { db as prisma } from "../../src/lib/db";

export async function createCouple(idCouple: string, nameCouple: string, initalDate: string, initalHours: string, images: string[], message: string, youtubeLink: string | null, price: number,) {
    
    try {
      
        await prisma.userCouple.create({
            data: {
                ytbMusic: youtubeLink ,
                messages: message,
                idCouple: idCouple,
                nameCouple: nameCouple,
                images: images,
                initialHours: initalHours,
                initialDate: initalDate,
                email: null,
                paid: "PENDING",
                price: price,
                idCostumerAsaas: null,
            },
        })
        console.log("Criado com sucesso!")
        return { success: "Criado com sucesso! " }
    } catch (err) {
            return { error: "erro desconhecido" }
    }
}
export async function updateEmailCouple(email: string, idCouple: string) {
    try {
        await prisma.userCouple.update({
            where: { idCouple },
            data: {
                email: email || null,
            }
        })
        return { success: "Criado com sucesso!" }
    } catch (err) {

        return { error: err }

    }
}

export async function updatecustomerId(idUser: string, customerId: string, email: string) {
    try {
        await prisma.userCouple.update({
            where: { idCouple: idUser },
            data: { idCostumerAsaas: customerId, email: email }
        })
        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}



export async function getBycustomerId(customerId: string,) {

    const res = await prisma.userCouple.findFirst({
        where: { idCostumerAsaas: customerId }
    })
    return res

}


export async function getCoupleById(idCouple: string) {
    try {
        if (!idCouple) throw new Error("Seu ID não está correto, Entre em contato com o suporte!")
        const res = await prisma.userCouple.findFirst({
            where: { idCouple }
        })
        return { couple: res }

    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message }
        }
        return { erro: error }

    }
}

export async function getCoupleByUniqueId(idCouple: string) {
    const res = await prisma.userCouple.findUnique({
        where: { idCouple }
    })
    return res
}

export const deleteCoupleById = async (id: string) => {

    if (!id) {
        return { error: 'Algo deu errado!' }
    }

    try {
        await prisma.userCouple.delete({
            where: { idCouple: id }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}