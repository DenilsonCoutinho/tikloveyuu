"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

const bucket = process.env.R2_BUCKET!;

export async function deleteImages(keys: string[]) {
  if (!keys.length) return;
  await Promise.all(
    keys.map((key) =>
      r2.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key.split('dev/').pop(),
        })
      )
    )
  );
}