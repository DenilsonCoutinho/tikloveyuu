
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, cpfCnpj } = await req.json()
    try {
        const customers = await fetch(`${process.env.NEXT_PUBLIC_ASAAS_URL_CUSTOMERS as string}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: "$" + process.env.ASAAS_API_KEY as string // Substitua 'MyKey' pela sua chave de API real

            },
            body: JSON.stringify({
                name: name,
                cpfCnpj: cpfCnpj,

            })
        })
        const customersData = await customers.json();
        // Retorna o ID da sessão de checkout
        return NextResponse.json({ customersData });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}
