import { HfInference } from "@huggingface/inference";
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

const Hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN!);

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("picture") as File | null;

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "No file provided or invalid file" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();

    const imageBuffer = await sharp(arrayBuffer)
      .resize(224, 224)
      .jpeg({ quality: 90 })
      .toBuffer();

    const result = await Hf.imageClassification({
      data: imageBuffer,
      model: "jazzmacedo/fruits-and-vegetables-detector-36",
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ API Error:", err);
    return NextResponse.json(
      { error: "Failed to classify image", details: err.message },
      { status: 500 }
    );
  }
}
