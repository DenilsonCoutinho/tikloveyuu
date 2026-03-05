"use client"

import { useState } from "react"
import { MemoryDetail } from "./memory-detail"
import InfiniteMenu from "@/components/InfiniteMenu"

interface MemoryItem {
  imageUrl: string
  description: string
  date: string
}

export default function Memorys({ data }: { data: { memories: any} }) {
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
    <div className="h-dvh " style={{ position: "relative", width: "100%" }}>
      <InfiniteMenu
        items={data.memories}
        scale={1}
        onSelect={setSelectedMemory}
      />
    </div>
  )
}
