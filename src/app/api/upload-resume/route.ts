import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    return NextResponse.json({
      text: result.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to parse PDF",
      },
      {
        status: 500,
      }
    );
  }
}