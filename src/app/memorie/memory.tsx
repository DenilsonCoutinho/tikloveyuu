"use client"

import { useState } from "react"
import InfiniteMenu from "@/components/InfiniteMenu"

export default function Memorys({ data }: any) {

  const [selectedMemory, setSelectedMemory] = useState<any>(null)

  if (selectedMemory) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">

        <button onClick={() => setSelectedMemory(null)}>
          voltar
        </button>

        <img src={selectedMemory.imageUrl} width={600} />

        <h2>{selectedMemory.description}</h2>

        <p>
          {new Date(selectedMemory.date).toLocaleDateString()}
        </p>

      </div>
    )
  }

  return (
    <div className="h-screen " style={{ position: "relative", width: "100%" }}>
      <InfiniteMenu
        items={data.memories}
        scale={1}
        onSelect={setSelectedMemory}
      />
    </div>
  )
}