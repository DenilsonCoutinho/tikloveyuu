import { db as prisma } from "../../lib/db";


export async function createCouple(nameCouple: string, initalRelationship: string, initalRelationshipHours: string, images: string[]) {
    try {
        await prisma.user.create({
            data: {
                nameCouple,
                images: images,
                initalRelationshipHours,
                initalRelationship
            },

        })
        return { success: "Criado com sucesso!" }
    } catch (err) {

    }
}