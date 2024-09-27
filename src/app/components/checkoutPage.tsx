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
  const items = [
    { name: "Produto 1", price: 14.99, quantity: 1 },
    { name: "Produto 2", price: 29.99, quantity: 2 },
  ];
  useEffect(() => {
      fetch("/api/create-payment-intent", {  // Corrigido o caminho da API
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({items })
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => setErrorMessage("Erro ao criar pagamento: " + error.message));  // Tratamento de erro
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      if (!stripe || !elements) {
          return;
      }

      const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
              return_url: `http://localhost:3000/payment-success?amount=${amount}`,
          },
      });

      if (error) {
          setErrorMessage(error.message);
      } else {
          // O pagamento foi confirmado com sucesso e o usuário será redirecionado
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
              {!loading ? `Pagar R$${amount}` : "Processing..."}
          </button>
      </form>
  );
}
