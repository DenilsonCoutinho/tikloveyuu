import Stripe from "stripe";

// if (!process.env.STRIPE_SECRET_KEY) {
//     throw new Error(
//         "STRIPE_SECRET_KEY is missing. Please set the environment variable."
//     );
// }

const stripe = new Stripe("sk_test_51P873pHt6s00L0BLowYV94i8i0r41W2mDTPk8XlifvfMxTGBrVI0f7BbUTTH1MMLqizdCyXXYVf2J25ACilrq2NS00PJeLheUT", {
    apiVersion: "2024-09-30.acacia",
});

export default stripe;