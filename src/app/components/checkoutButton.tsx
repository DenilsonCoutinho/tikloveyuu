"use client"
import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Button } from '@chakra-ui/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

type CheckoutButtonProps = {
    productName: string;
    url: string;
    productPrice: number;
};

export default function CheckoutButton({ url, productName, productPrice }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const response = await fetch(`/api/${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: productPrice,
                    currency: 'brl',
                    productName: productName
                }),
            });

            const { id } = await response.json();

            const stripe: Stripe | null = await stripePromise;
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId: id });
            }
        } catch (error) {
            console.error('Erro ao redirecionar para o checkout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button bg={"slategray"} textColor={'white'} className="border text-white mt-3" onClick={handleCheckout} disabled={loading}>
            {loading ? 'Carregando...' : `Criar meu site. `}
        </Button>
    );
}
