// "use client"
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
// import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider"
import { DialogRoot } from "@/components/ui/dialog";
import { FileUploadRoot } from "@/components/ui/file-button";
import { useEffect } from "react";

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
    <html suppressHydrationWarning lang="en">
      <body className={`${montserrat.className}   antialiased`}>
        <Provider>

          <DialogRoot closeOnInteractOutside={false}>
            {children}
          </DialogRoot>

        </Provider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
