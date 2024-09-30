"use server"
import { db as prisma } from "../../src/lib/db";


export async function createCouple(idCouple: string, nameCouple: string, initalDate: string, initalHours: string, images: string[], message: string, youtubeLink: string | null) {
    try {
        await prisma.user.create({
            data: {
                ytbMusic: youtubeLink,
                messages: message,
                idCouple: idCouple,
                nameCouple: nameCouple,
                images: images,
                initialHours: initalHours,
                initialDate: initalDate,
                email: null
            },


        })
        return { success: "Criado com sucesso! " }
    } catch (err) {
        return { error: err }

    }
}
export async function updateEmailCouple(email: string, id: string) {
    try {
        await prisma.user.update({
            where: { id },
            data: {
                email: email || null,
            }
        })
        console.log('atualizou')
        return { success: "Criado com sucesso!" }
    } catch (err) {
        console.log('atualizouErro:' ,err)
        return { error: err }

    }
}

export async function getCoupleById(idCouple: string) {
    const res = await prisma.user.findFirst({
        where: { idCouple }
    })
    return res
}

export async function getCoupleByUniqueId(id: string) {
    const res = await prisma.user.findFirst({
        where: { id }
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