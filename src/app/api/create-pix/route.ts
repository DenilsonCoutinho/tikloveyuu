import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Formatar a data no padrão yyyy-mm-dd
    const dueDate = tomorrow.toISOString().split('T')[0];
    const { value, customerid, description } = await req.json();
    try {
        const pixCustomers = await fetch(`${process.env.NEXT_PUBLIC_ASAAS_URL_PAYMENTS as string}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'user-agent': 'tikloveyuu',
                access_token: "$" + process.env.ASAAS_API_KEY as string // Substitua 'MyKey' pela sua chave de API real

            },
            body: JSON.stringify({
                customer: customerid,
                billingType: 'PIX',
                value: value, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
                dueDate: dueDate,
                description: description as string
            })
        })
        const pixCustomersData = await pixCustomers.json();
        // Retorna o ID da sessão de checkout
        return NextResponse.json({ pixCustomersData });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}
