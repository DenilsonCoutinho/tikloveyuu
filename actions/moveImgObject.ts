"use server"
import {
  CopyObjectCommand,
} from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function moveImgObject(oldKey: string, newKey: string) {
  const bucket = process.env.R2_BUCKET!;

  // 1️⃣ Copiar
  await r2.send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${oldKey}`,
      Key: newKey,
    })
  );

}
