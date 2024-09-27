"use client"
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import CheckoutPage from "../components/checkoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function checkoutConfig() {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const amount = 14.99;
  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "brl",
        }}
        
      >
        <CheckoutPage  amount={amount} />
      </Elements>
    </>
  )
}