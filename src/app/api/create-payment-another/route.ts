import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});

// Função assíncrona para lidar com solicitações POST
export async function POST(req: NextRequest) {
    if (req.url.includes('/webhook')) {
        return handleWebhook(req);
    }
    try {
        // Desestruturar o valor e a moeda
        const { amount, currency, productName } = await req.json();
        console.log(amount, currency, productName);
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
                        unit_amount: 3499,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            allow_promotion_codes: true, // Permite o uso de códigos promocionais

            success_url: 'https://mytikdklover.vercel.app/', // Defina suas URLs
            cancel_url: 'https://mytikdklover.vercel.app/',
        });

        // Retorna o ID da sessão de checkout
        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        return NextResponse.json({ error: 'Erro ao criar a sessão de checkout' }, { status: 500 });
    }
}


 async function handleWebhook(req: NextRequest) {
    const sig:any = req.headers.get('stripe-signature');

    let event;

    try {
        const body = await req.text(); // Obtenha o corpo da requisição
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET2 || ''); // Verifique a assinatura
    } catch (err) {
        console.error(`Webhook Error: ${err}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    // Lidar com o evento
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object; // Acesse os detalhes da sessão
            console.log(`Pagamento bem-sucedido para a sessão: ${session.id}`);
            // Adicione sua lógica de processamento de pagamento aqui
            break;
        // Adicione mais casos para outros eventos conforme necessário
        default:
            console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}