"use server"

import { prisma } from "../prisma"

type MemoryInput = {
    imageUrl: string | null
    description: string
    date: string
    title: string
}

type CreateUserInput = {
    name: string
    email: string
    cpf: string
    memories: MemoryInput[]
}

export async function createUser(data: CreateUserInput) {

    const created = await prisma.userMemories.create({
        data: {
            userId: crypto.randomUUID(),
            email: data.email,

            memories: {
                create: data.memories.filter((memory) => memory.imageUrl && memory.imageUrl !== "").map((memory) => ({
                    imageUrl: memory.imageUrl ?? "",
                    description: memory.description,
                    title: memory.title,
                    date: new Date(memory.date)
                }))
            }
        }
    })

    return created
}