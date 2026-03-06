"use server"

import sharp from "sharp"
import { r2 } from "@/lib/r2"
import { PutObjectCommand } from "@aws-sdk/client-s3"

export async function uploadImage(formData: FormData) {

  const uploadedImages: { index: number; url: string }[] = []

  for (let i = 0; i < 7; i++) {

    const file = formData.get(`image-${i}`) as File | null

    if (!file || file.size === 0) continue

    const arrayBuffer = await file.arrayBuffer()

    const optimizedBuffer = await sharp(Buffer.from(arrayBuffer))
      .resize(1024, 1024, {
        fit: "inside",
        withoutEnlargement: true
      })
      .webp({ quality: 90 })
      .toBuffer()

    const fileName = `temp/${crypto.randomUUID()}.webp`

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: fileName,
        Body: optimizedBuffer,
        ContentType: "image/webp"
      })
    )

    const url = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`

    uploadedImages.push({
      index: i,
      url
    })
  }

  return uploadedImages
}