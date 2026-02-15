import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// Force Node.js runtime (not Edge) so we can use fs
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const filePath = join(process.cwd(), "public", "FQHC_Talent_Drop_Pitch_Deck.pdf");

  try {
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'inline; filename="FQHC_Talent_Exchange_Pitch_Deck.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
