"use server"

import { r2 } from "@/lib/r2"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function generateUploadUrls(count: number) {

  const uploads: {
    uploadUrl: string
    fileUrl: string
  }[] = []

  for (let i = 0; i < count; i++) {

    const key = `temp/${crypto.randomUUID()}.webp`

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      ContentType: "image/webp"
    })

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 60
    })

    const fileUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`

    uploads.push({
      uploadUrl,
      fileUrl
    })
  }

  return uploads
}