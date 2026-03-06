"use client"

import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimeCounter } from "./time-counter"
import Image from "next/image"
import { useEffect, useRef } from "react"

interface MemoryData {
  imageUrl: string
  description: string
  date: string
}

function formatDateBR(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function MemoryDetail({
  memory,
  onBack,
}: {
  memory: MemoryData
  onBack: () => void
}) {
  return (
    <div className="flex h-vh relative flex-col items-center bg-defaultBg">

      {/* Back button */}
      <div className="mb-8 w-full max-w-[440px] z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>

      {/* Phone frame with image */}
      <div className="relative mb-8 w-full max-w-[320px] z-10">
        {/* Glow behind phone */}
        <div className="relative z-10">
          {/* Image */}
          <div className="overflow-hidden  rounded-[2rem] z-10">
            
            <Image
              width={200}
              height={200}
              quality={100}
              src={memory.imageUrl}
              alt={memory.description}
              className="aspect-[7/9] w-full  object-cover swing-in-right-fwd "
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb- max-w-[340px] text-center relative z-10">
        <p
          className="font-serif text-xl text-wrap  break-words  leading-relaxed text-white md:text-2xl"
        >
          {memory.description}
        </p>
      </div>
      <div className="border-t border-white/10 h-1 max-w-[300px] w-full relative z-10"></div>
      {/* Decorative heart divider */}
      <div className="mb- flex items-center gap-3 relative z-10">
        <div className=" w-12 bg-primary/20 relative z-10" />
        <Heart className="h-4 w-4 fill-red-700 text-primary" />
        <div className=" w-12 bg-primary/20" />
      </div>

      {/* Date */}
      <p className="mb-2 text-sm text-white relative z-10">
        {formatDateBR(memory.date)}
      </p>

      {/* Message */}
      <p
        className="mt-2 text-center text-base text-white md:text-lg relative z-10"
      >
        {"Já fazem:"}
      </p>

      {/* Live counter */}
      <TimeCounter date={memory.date} />

      {/* Bottom spacer */}
      <div className="h-screen" style={{ width: '100%', position: 'fixed' }}>
        {/* <Hyperspeed
  effectOptions={{"distortion":"turbulentDistortion","length":400,"roadWidth":10,"islandWidth":2,"lanesPerRoad":3,"fov":90,"fovSpeedUp":150,"speedUp":2,"carLightsFade":0.4,"totalSideLightSticks":20,"lightPairsPerRoadWay":40,"shoulderLinesWidthPercentage":0.05,"brokenLinesWidthPercentage":0.1,"brokenLinesLengthPercentage":0.5,"lightStickWidth":[0.12,0.5],"lightStickHeight":[1.3,1.7],"movingAwaySpeed":[60,80],"movingCloserSpeed":[-120,-160],"carLightsLength":[12,80],"carLightsRadius":[0.05,0.14],"carWidthPercentage":[0.3,0.5],"carShiftX":[-0.8,0.8],"carFloorSeparation":[0,5],"colors":{"roadColor":526344,"islandColor":657930,"background":0,"shoulderLines":1250072,"brokenLines":1250072,"leftCars":[14177983,6770850,12732332],"rightCars":[242627,941733,3294549],"sticks":242627}}}
/> */}
        <HeartBackground />
      </div>
    </div>
  )
}

const HeartBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null); // <-- use number

  const createHeart = () => {
    if (!containerRef.current) return;
    const heart = document.createElement("img");
    heart.src = "https://pub-3fdeb510323e47e592c067c00b52e4a3.r2.dev/cora%C3%A7%C3%A3o-img/409093421_b71a08ab-cc89-455c-b524-e7be4a890f69-removebg-preview.png";
    // https://pngimg.com/uploads/heart/heart_PNG51335.png
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
    containerRef.current.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  };

  useEffect(() => {
    const startTimeout = window.setTimeout(() => {
      intervalRef.current = window.setInterval(createHeart, 100); // <-- window.setInterval
    }, 1000);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalRef.current) window.clearInterval(intervalRef.current); // <-- window.clearInterval
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      
    </div>
  );
};