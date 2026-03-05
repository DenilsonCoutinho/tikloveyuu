"use client"

import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimeCounter } from "./time-counter"
import Image from "next/image"

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
    <div className="flex min-h-dvh flex-col items-center bg-defaultBg px-4 py-8 md:py-12">
      {/* Back button */}
      <div className="mb-8 w-full max-w-[440px]">
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
      <div className="relative mb-8 w-full max-w-[320px]">
        {/* Glow behind phone */}

        <div>
          {/* Image */}
          <div className="overflow-hidden rounded-[2rem]">
            <Image
              width={300}
              height={300}
              quality={100}
              src={memory.imageUrl}
              alt={memory.description}
              className="aspect-[9/16] w-full object-cover swing-in-right-fwd "
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 max-w-[340px] text-center">
        <p
          className="font-serif text-xl text-wrap  break-words  leading-relaxed text-white md:text-2xl"
        >
          {memory.description}
        </p>
      </div>

      {/* Decorative heart divider */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-12 bg-primary/20" />
        <Heart className="h-4 w-4 fill-red-700 text-primary" />
        <div className="h-px w-12 bg-primary/20" />
      </div>

      {/* Date */}
      <p className="mb-2 text-sm text-white">
        {formatDateBR(memory.date)}
      </p>

      {/* Message */}
      <p
        className="mt-6 text-center text-base text-white md:text-lg"
      >
        {"Já fazem:"}
      </p>

      {/* Live counter */}
      <TimeCounter date={memory.date} />

      {/* Bottom spacer */}
      <div className="mt-10" />
    </div>
  )
}
