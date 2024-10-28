"use client"
import { DialogRoot } from "@chakra-ui/react";
import Presentation from "./home/page";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-1HW10W3V4P`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => window.dataLayer.push(args);
      gtag('js', new Date());
      gtag('config', 'G-1HW10W3V4P');
    }
  }, []);
  return (
    <div className="bg-defaultBg ">

        <Presentation />
     
    </div>
  );
}
