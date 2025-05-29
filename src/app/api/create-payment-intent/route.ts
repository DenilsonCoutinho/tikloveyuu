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
                    price: typeRequest === 1 ? process.env.STRIPE_PRICE_ID :
                        typeRequest === 2 ? process.env.STRIPE_PRICE_ID6 :
                            typeRequest === 5 ? process.env.STRIPE_PRICE_SURPRISE:"" ,

                    quantity: 1,
                },
            ],
            mode: 'payment',
            allow_promotion_codes: true, // Permite o uso de códigos promocionais
            metadata: { idUser, type: typeRequest === 5 ? "5" : "1" },
            success_url: typeRequest === 1 || typeRequest === 2 ?
                `https://www.tikloveyuu.com/qrCode?id=${idUser}` :
                `https://www.tikloveyuu.com/createSurprise/qrCode?id=${idUser}`, // Defina suas URLs
            cancel_url: `https://www.tikloveyuu.com/createSurprise/cancel?id=${idUser}`,
        });
        if (typeRequest === 5) {
            await prisma.surpriseSend.update({
                where: { idSurprise: idUser },
                data: { idSession: session.id }
            });
            return NextResponse.json({ sessionId: session.id });
        }
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


