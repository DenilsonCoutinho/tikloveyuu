"use server"

import sharp from "sharp"
import { r2 } from "@/lib/r2"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { prisma } from "../prisma"

export async function createMemories(formData: FormData) {

  const memories = []

  for (let i = 0; i < 7; i++) {

    const file = formData.get(`image-${i}`) as File
    const description = formData.get(`description-${i}`) as string
    const date = formData.get(`date-${i}`) as string
    const title = formData.get(`title-${i}`) as string

    if (!file) continue

    const optimizedBuffer = await sharp(await file.arrayBuffer())
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 89 })
      .toBuffer()

    const fileName = `temp/${crypto.randomUUID()}.webp`

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: fileName,
        Body: optimizedBuffer,
        ContentType: "image/webp",
      })
    )

    memories.push({
      imageUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`,
      description,
      date: new Date(date),
      title: title
    })
  }

  const data = await prisma.userMemories.create({
    data: {
      userId: crypto.randomUUID(),
      memories: {
        create: memories,
      },
    },
  })
  return data
}