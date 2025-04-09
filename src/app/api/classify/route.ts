import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import sharp from "sharp";

const Hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN!);

export const runtime = "nodejs";

export const maxDuration = 300;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("picture") as File | null;

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json(
      { error: "No file provided or invalid file" },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();

    const imageBuffer = await sharp(arrayBuffer)
      .resize(224, 224)
      .jpeg({ quality: 90 })
      .toBuffer();

    const result = await Hf.imageClassification({
      data: imageBuffer,
      model: "flatmoon102/fruits_and_vegetables_image_classification",
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ API Error:", err);

    // Add additional logging for the Hugging Face error response
    if (err.response) {
      console.error("Hugging Face Error Response:", err.response?.data);
    }

    return NextResponse.json(
      { error: "Failed to classify image", details: err.message },
      { status: 500 }
    );
  }
}
