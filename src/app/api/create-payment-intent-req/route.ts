import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { db as prisma } from '@/lib/db';

// Função assíncrona para lidar com solicitações POST
export async function POST(req: NextRequest) {

    try {
        const { typeRequest, idUser } = await req.json();

        // Criação de uma sessão de checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price:  process.env.STRIPE_PRICE_ID_REQ ,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            allow_promotion_codes: true, // Permite o uso de códigos promocionais
            metadata: { idUser, type: "2" },
            success_url: `https://www.tikloveyuu.com/copyLink?id=${idUser}`, // Defina suas URLs
            cancel_url: `https://www.tikloveyuu.com/cancelReq?status=cancelado`,
        });

        await prisma.requestSend.update({
            where: { idRequestSend: idUser },
            data: { idSession: session.id }
        });
        // Retorna o ID da sessão de checkout
        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}


