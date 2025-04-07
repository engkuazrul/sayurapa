"use server";

import { HfInference } from "@huggingface/inference";
import sharp from "sharp";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function classifyImage(file: File) {
  // Process the image with sharp
  const processedImage = await sharp(await file.arrayBuffer())
    .resize(224, 224)
    .webp({ quality: 80 })
    .toBuffer(); // <--- binary buffer

  // Send buffer directly (not base64 or data URL)
  const response = await Hf.imageClassification({
    data: processedImage, // <-- this is correct
    model: "google/vit-base-patch16-224-in21k",
  });

  return response;
}
