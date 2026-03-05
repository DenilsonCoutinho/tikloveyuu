import { prisma } from "../../../../prisma"
import Memorys from "../components/memorys"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MemoriesPage({ params }: PageProps) {

  const { id } = await params

  const album = await prisma.userMemories.findUnique({
    where: {
      id: id
    },
    include: {
      memories: true
    }
  })

  if (!album) {
    return <div>Nenhuma memória encontrada</div>
  }

  return (
    <div>
     <Memorys data={album}/>

    </div>
  )
}