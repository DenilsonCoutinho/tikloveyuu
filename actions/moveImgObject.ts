"use server";

import { CopyObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

const bucket = process.env.R2_BUCKET!;

/**
 * Move várias imagens no R2 (S3-compatible) copiando para novos keys
 * @param images Array de objetos { oldKey, newKey }
 */
export async function moveImgObject(images: { oldKey: string; newKey: string }[]) {
  if (!images || images.length === 0) return;
 
  // Usa Promise.all pra processar todas as cópias em paralelo
  await Promise.all(
    images.map(({ oldKey, newKey }) =>
     
      r2.send(
        new CopyObjectCommand({
          Bucket: bucket,
          CopySource: `${bucket}/${oldKey.split("dev/").pop()}`,
          Key: newKey,
        })
      )
    )
  );
}