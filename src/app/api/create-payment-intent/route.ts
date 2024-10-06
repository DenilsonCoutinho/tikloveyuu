import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { db as prisma } from '@/lib/db';

// Função assíncrona para lidar com solicitações POST
export async function POST(req: NextRequest) {

    try {
        const { typeProduct, idUser } = await req.json();

        // Criação de uma sessão de checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl', // A moeda que você deseja usar
                        product_data: {
                            name: 'Produto de Teste', // Nome do seu produto
                            description: 'Descrição do produto de teste.', // Descrição opcional
                        },
                        unit_amount: typeProduct === 1 ? 1499 : 3499, // Preço em centavos (R$20,00)
                    },
                    quantity: 1, // Quantidade do produto
                },
            ],
            mode: 'payment',
            allow_promotion_codes: true, // Permite o uso de códigos promocionais
            metadata: { idUser },
            success_url: `https://www.tikloveyuu.com/qrCode?code=${idUser}`, // URL de sucesso
            cancel_url: `https://www.tikloveyuu.com/cancel?status=cancelado`, // URL de cancelamento
        });


        await prisma.user.update({
            where: { idCouple: idUser },
            data: { idSession: session.id }
        });
        // Retorna o ID da sessão de checkout
        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}


