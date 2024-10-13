import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from "@vercel/analytics/react"
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Escolha os pesos que você quer usar
})

//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "tikloveyuu",
  description: "Crie um contador dinâmico de tempo de relacionamento. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}   antialiased`}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
        <Analytics />
      </body>
    </html>
  );
}
