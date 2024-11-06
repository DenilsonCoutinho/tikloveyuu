"use client"
import { DialogRoot } from "@chakra-ui/react";
import Presentation from "./home/page";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', '{"token": "ada2e6bd47b8495ea5e18ae818c7a867"}');
    document.head.appendChild(script);
  }, []);
  return (
    <div className="bg-defaultBg ">

      <Presentation />

    </div>
  );
}
