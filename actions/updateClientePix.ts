"use server"
import { prisma } from "../prisma"
export async function updatecustomerId(input: { customerId: string, id: string, email: string }) {
    try {
        await prisma.userMemories.update({
            where: { id: input.id },
            data: { idCostumerAsaas: input.customerId,email:input.email }
        })

        return { success: "Criado com sucesso!" }
    } catch (err) {


        return { error: err }

    }
}
