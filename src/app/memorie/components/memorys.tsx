"use client"

import { useState } from "react"
import { MemoryDetail } from "./memory-detail"
import InfiniteMenu from "@/components/InfiniteMenu"
import Particles from "@/components/Particles"

interface MemoryItem {
  imageUrl: string
  description: string
  date: string
}

export default function Memorys({ data }: { data: { memories: any } }) {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null)
  const [open, setOpen] = useState<boolean>(true)

  if (selectedMemory) {
    return (
      <MemoryDetail
        memory={selectedMemory}
        onBack={() => setSelectedMemory(null)}
      />
    )
  }

  return (
    <div className="h-dvh relative" style={{ position: "relative", width: "100%" }}>
      <div className="bg-defaultBg  relative h-svh" style={{ width: '100%', position: 'fixed' }}>
        
        <Particles
          particleColors={["#ffffff"]}
          particleCount={500}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={45}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={4}
        />
      </div>
      <InfiniteMenu
        items={data.memories}
        scale={1}
        onSelect={setSelectedMemory}
      />
    </div>
  )
}
