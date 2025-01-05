"use server"

import { db as prisma } from "../../src/lib/db";


export async function createCouple(idCouple: string, nameCouple: string, initalDate: string, initalHours: string, images: string[], message: string, youtubeLink: string | null, price: number, affiliateId: string ) {
    
    try {
        if (affiliateId) {
         
            await prisma.user.create({
                data: {
                    ytbMusic: youtubeLink,
                    messages: message,
                    idCouple: idCouple,
                    nameCouple: nameCouple,
                    images: images,
                    initialHours: initalHours,
                    initialDate: initalDate,
                    email: null,
                    paid: "PENDING",
                    price: price,
                    affiliateId: affiliateId,
                    idCostumerAsaas: null,
                },
            })
            return { success: "Criado com sucesso! ",idCouple: idCouple}
        }
        await prisma.user.create({
            data: {
                ytbMusic: youtubeLink,
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
        return { success: "Criado com sucesso! " }
    } catch (err) {
        return { error: err }

    }
}
export async function updateEmailCouple(email: string, idCouple: string) {
    try {
        await prisma.user.update({
            where: { idCouple },
            data: {
                email: email || null,
            }
        })
        console.log("Updatoud certo")
        return { success: "Criado com sucesso!" }
    } catch (err) {
        console.log("Deur merda", err)

        return { error: err }

    }
}

export async function updatecustomerId(idUser: string, customerId: string, email: string) {
    try {
        await prisma.user.update({
            where: { idCouple: idUser },
            data: { idCostumerAsaas: customerId, email: email }
        })
        console.log("Updatoud certo")
        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}



export async function getBycustomerId(customerId: string,) {

    const res = await prisma.user.findFirst({
        where: { idCostumerAsaas: customerId }
    })
    return res

}


export async function getCoupleById(idCouple: string) {
    const res = await prisma.user.findFirst({
        where: { idCouple }
    })
    return res
}

export async function getCoupleByUniqueId(idCouple: string) {
    const res = await prisma.user.findUnique({
        where: { idCouple }
    })
    return res
}

export const deleteCoupleById = async (id: string) => {

    if (!id) {
        return { error: 'Algo deu errado!' }
    }

    try {
        await prisma.user.delete({
            where: { idCouple: id }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}