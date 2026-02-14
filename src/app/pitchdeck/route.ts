import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const filePath = join(process.cwd(), "public", "FQHC_Talent_Drop_Pitch_Deck.pptx");

  try {
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition":
          'inline; filename="FQHC_Talent_Exchange_Pitch_Deck.pptx"',
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
