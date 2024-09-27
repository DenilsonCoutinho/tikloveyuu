import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

export default function CheckoutPage({ amount }: { amount: number }) {

    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
    
        if (!stripe || !elements) {
          return;
        }
    
        const { error: submitError } = await elements.submit();
    
        if (submitError) {
          setErrorMessage(submitError.message);
          setLoading(false);
          return;
        }
    
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
          },
        });
    
        if (error) {
          // This point is only reached if there's an immediate error when
          // confirming the payment. Show the error to your customer (for example, payment details incomplete)
          setErrorMessage(error.message);
        } else {
          // The payment UI automatically closes with a success animation.
          // Your customer is redirected to your `return_url`.
        }
    
        setLoading(false);
      };
    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-[1200px] m-auto shadow-xl flex flex-col justify-center items-center rounded-md">
        {clientSecret && <PaymentElement />}
  
        {errorMessage && <div>{errorMessage}</div>}
  
        <button
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pagar $${amount}` : "Processing..."}
        </button>
      </form>
    )
}