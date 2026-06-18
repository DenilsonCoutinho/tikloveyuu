"use server"

import { db as prisma } from "../../src/lib/db";
import type { UserCouple } from "@prisma/client";

type UserCoupleView = Omit<UserCouple, "createdAt"> & {
    createdAt: string;
};

function serializeUserCouple(couple: UserCouple): UserCoupleView {
    return {
        ...couple,
        createdAt: couple.createdAt.toISOString(),
    };
}

function getErrorMessage(err: unknown) {
    return err instanceof Error ? err.message : "erro desconhecido";
}

export async function createCouple(idCouple: string, nameCouple: string, initalDate: string, initalHours: string, images: string[], message: string, youtubeLink: string | null, price: number) {
    try {
        const normalizedIdCouple = idCouple?.trim();
        if (!normalizedIdCouple) throw new Error("ID do casal invalido.");

        await prisma.userCouple.create({
            data: {
                ytbMusic: youtubeLink,
                messages: message,
                idCouple: normalizedIdCouple,
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

        return { success: "Criado com sucesso!" }
    } catch (err) {
        const message = getErrorMessage(err);
        console.error("Erro ao criar casal:", err);
        return { error: message }
    }
}

export async function updateEmailCouple(email: string, idCouple: string) {
    try {
        const normalizedIdCouple = idCouple?.trim();
        if (!normalizedIdCouple) throw new Error("ID do casal invalido.");

        await prisma.userCouple.update({
            where: { idCouple: normalizedIdCouple },
            data: {
                email: email || null,
            }
        })
        return { success: "Criado com sucesso!" }
    } catch (err) {
        return { error: getErrorMessage(err) }
    }
}

export async function updatecustomerId(idUser: string, customerId: string, email: string) {
    try {
        const normalizedIdCouple = idUser?.trim();
        if (!normalizedIdCouple) throw new Error("ID do casal invalido.");

        await prisma.userCouple.update({
            where: { idCouple: normalizedIdCouple },
            data: { idCostumerAsaas: customerId, email: email }
        })
        return { success: "Criado com sucesso!" }
    } catch (err) {
        return { error: getErrorMessage(err) }
    }
}

export async function getBycustomerId(customerId: string) {
    const normalizedCustomerId = customerId?.trim();
    if (!normalizedCustomerId) return null;

    return prisma.userCouple.findFirst({
        where: { idCostumerAsaas: normalizedCustomerId }
    })
}

export async function getCoupleById(idCouple: string) {
    try {
        const normalizedIdCouple = idCouple?.trim();
        if (!normalizedIdCouple) throw new Error("Seu ID nao esta correto, entre em contato com o suporte!");

        const couple = await prisma.userCouple.findUnique({
            where: { idCouple: normalizedIdCouple }
        })

        if (!couple) {
            throw new Error("Site nao encontrado. Verifique se o link esta correto.");
        }

        return { couple: serializeUserCouple(couple) }
    } catch (error) {
        return { error: getErrorMessage(error) }
    }
}

export async function getCoupleByUniqueId(idCouple: string) {
    const normalizedIdCouple = idCouple?.trim();
    if (!normalizedIdCouple) return null;

    return prisma.userCouple.findUnique({
        where: { idCouple: normalizedIdCouple }
    })
}

export const deleteCoupleById = async (id: string) => {
    const normalizedIdCouple = id?.trim();

    if (!normalizedIdCouple) {
        return { error: 'Algo deu errado!' }
    }

    try {
        await prisma.userCouple.delete({
            where: { idCouple: normalizedIdCouple }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}

export const deleteCouple = async () => {
    try {
        await prisma.userCouple.deleteMany({
            where: { paid: "PENDING" }
        })
        return { success: "Categoria deletada com sucesso!" }
    } catch (error) {
        return { error: 'Algo deu errado!' }
    }
}
