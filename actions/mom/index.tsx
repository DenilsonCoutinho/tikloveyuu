"use server"
import { db as prisma } from "../../src/lib/db";

export async function createMom(message: string, namecall: string, images: string[], idCall: string,) {
    console.log(message,namecall,images,idCall)
    try {
        await prisma.cellPhone.create({
            data: {
                messages: message,
                nameCall: namecall,
                images: images,
                email: null,
                paid: "PENDING",
                idCostumerAsaas: null,
                idCall: idCall
            },
        })
        return { success: "Criado com sucesso! " }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { error: err }
        }

    }
}


export async function updatecustomerMomId(idUser: string, customerId: string, email: string) {
    try {
        await prisma.cellPhone.update({
            where: { idCall: idUser },
            data: { idCostumerAsaas: customerId, email: email }
        })
        console.log("Updatoud certo")
        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}


export const deleteMomById = async (id: string) => {

    if (!id) {
        return { error: 'Algo deu errado!' }
    }

    try {
        await prisma.cellPhone.delete({
            where: { idCall: id }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}

export async function getBycustomerIdMom(customerId: string,) {

    const res = await prisma.cellPhone.findFirst({
        where: { idCostumerAsaas: customerId }
    })
    return res

}


export async function getMomById(idCall: string) {
    try {
        if (!idCall) throw new Error("Seu ID não está correto, Entre em contato com o suporte!")
        const res = await prisma.cellPhone.findFirst({
            where: { idCall }
        })
        return {  res }

    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message }
        }
        return { erro: error }

    }
}
