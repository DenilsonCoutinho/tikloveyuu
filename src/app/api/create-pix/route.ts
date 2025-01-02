// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req:NextRequest) {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     // Formatar a data no padrão yyyy-mm-dd
//     const dueDate = tomorrow.toISOString().split('T')[0];

//     const { value, customerid,description } = await req.json();
//     console.log("description: ",description)
//     try {
//         const pixCustomers = await fetch('https://api.asaas.com/v3/payments', {
//             method: 'POST',
//             mode: 'no-cors',
//             headers: {
//                 accept: 'application/json',
//                 'content-type': 'application/json',
//                 'user-agent': 'tikloveyuu',
//                 access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0OTczODc6OiRhYWNoXzQyOTNmNDMxLTJhYmMtNDU5Yi1iNmE2LWE0ODdiODFkNTk5ZA==" // Substitua 'MyKey' pela sua chave de API real

//             },
//             body: JSON.stringify({
//                 customer: customerid,
//                 billingType: 'PIX',
//                 value: value, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
//                 dueDate: dueDate,
//                 description:description as string
//             })
//         })
//         const pixCustomersData = await pixCustomers.json();
//         // Retorna o ID da sessão de checkout
//         return NextResponse.json({ pixCustomersData });
//     } catch (error) {
//         console.error('Erro ao criar a sessão de checkout:', error);
//         return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Formatar a data no padrão yyyy-mm-dd
    const dueDate = tomorrow.toISOString().split('T')[0];
    console.log(dueDate);
    const { value, customerid,description } = await req.json();
    console.log("description: ",description)
    try {
        const pixCustomers = await fetch('https://api.asaas.com/v3/payments', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'user-agent': 'tikloveyuu',
                access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0OTczODc6OiRhYWNoXzQyOTNmNDMxLTJhYmMtNDU5Yi1iNmE2LWE0ODdiODFkNTk5ZA==" // Substitua 'MyKey' pela sua chave de API real

            },
            body: JSON.stringify({
                customer: customerid,
                billingType: 'PIX',
                value: value, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
                dueDate: dueDate,
                description:description as string
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
