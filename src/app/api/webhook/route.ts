import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCoupleById, getCoupleByUniqueId, updateEmailCouple } from "../../../../actions/couple";

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
        case 'charge.updated':
            const session = event.data.object; // Acesse os detalhes da sessão
            if (session.status === 'succeeded') {
                // console.log('Pagamento bem-sucedido após atualização.');
                // Atualizar o banco de dados ou executar outras ações necessárias
                const res = await getCoupleByUniqueId(session.metadata.idUser)
                await updateEmailCouple(session?.billing_details.email, res?.id)
            } else {
                break
            }
            console.log(`Pagamento bem-sucedido para a sessão: ${session}`);

            break;
        case 'checkout.session.expired':
            const sessionExpired = event.data.object; // Acesse os detalhes da sessão
            console.log(sessionExpired.metadata)

            break;
        // Adicione mais casos para outros eventos conforme necessário
        default:
            const sessionCon = event.data.object; // Acesse os detal
            console.log("Eventos: ", event.type)
            console.log(sessionCon)
            console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}