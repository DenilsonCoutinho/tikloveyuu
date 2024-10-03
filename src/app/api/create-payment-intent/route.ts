import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});

// Função assíncrona para lidar com solicitações POST
export async function POST(req: NextRequest) {

    try {
        const { typeProduct, idUser, imageCouple } = await req.json();
       
        // Criação de uma sessão de checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', "boleto"],
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            images: ["https://firebasestorage.googleapis.com/v0/b/imagem-tiklover.appspot.com/o/pngwing.com.png?alt=media&token=ff9c8f56-4043-4b21-bf9a-46390b2be261"],
                            name: "Página TikerLove", // Defina o nome do produto aqui
                        },
                        unit_amount: typeProduct === 1 ? 1499 : 3499,

                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            allow_promotion_codes: true, // Permite o uso de códigos promocionais
            metadata: { idUser: idUser, images: imageCouple },
            success_url: `https://tikdklovertok.vercel.app/qrCode?code=${idUser}`, // Defina suas URLs
            cancel_url: `https://tikdklovertok.vercel.app/cancel?status=cancelado`,
        });

        // Retorna o ID da sessão de checkout
        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}


