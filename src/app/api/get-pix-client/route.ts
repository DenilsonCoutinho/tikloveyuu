import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { paymentId } = await req.json();
    console.log(paymentId);
    try {
        const pixCustomers = await fetch(`${process.env.NEXT_PUBLIC_ASAAS_URL_ID_PAYMENTS}/${paymentId}/pixQrCode`, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'user-agent': 'tikloveyuu',
                access_token: "$" + process.env.ASAAS_API_KEY as string // Substitua 'MyKey' pela sua chave de API real
            },

        })
        const pixCustomersData = await pixCustomers.json();
        // Retorna o ID da sessão de checkout
        return NextResponse.json({ pixCustomersData });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}

