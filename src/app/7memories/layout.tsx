// "use client"
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google'

import Script from "next/script";
import { Toaster } from "sonner";


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
      <head>
        <meta name="google-site-verification" content="QUHtQpp0zPPj6YOv5xLy9PYCyP-HoWXECaoijTaNmgo" />

      </head>
      <body className={`${montserrat.className}   antialiased`}>
                {children}
              <Toaster />
      </body>
    </html>
  );
}
