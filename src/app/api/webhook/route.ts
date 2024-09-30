import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateEmailCouple } from "../../../../actions/couple";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});
export async function POST(req: NextRequest) {
    const sig: any = req.headers.get('stripe-signature');

    let event;

    try {
        const body = await req.text(); // Obtenha o corpo da requisição
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || ''); // Verifique a assinatura
    } catch (err) {
        console.error(`Webhook Error: ${err}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    // Lidar com o evento
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object; // Acesse os detalhes da sessão
                if (session.metadata && session.customer_email) {
                    await updateEmailCouple(session.metadata.idCouple, session?.customer_email)
                console.log(`Pagamento bem-sucedido para a sessão: ${session.id}`);
            }
            break;
        case 'checkout.session.expired':
            const sessionExpired = event.data.object; // Acesse os detalhes da sessão
            console.log(sessionExpired.metadata)

            break;
        // Adicione mais casos para outros eventos conforme necessário
        default:

            console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}