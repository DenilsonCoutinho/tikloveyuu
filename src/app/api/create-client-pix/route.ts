import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, cpfCnpj } = await req.json()
    try {
        const customers = await fetch('	https://api.asaas.com/v3/customers', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                // 'user-agent': 'tikloveyuu',
                access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0OTczODc6OiRhYWNoXzQyOTNmNDMxLTJhYmMtNDU5Yi1iNmE2LWE0ODdiODFkNTk5ZA==" // Substitua 'MyKey' pela sua chave de API real

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
