import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { parseResumeText } from "@/lib/resume-parser";

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

// File extension fallback (some browsers send wrong MIME types)
const EXTENSION_TYPE_MAP: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 5MB." },
        { status: 400 },
      );
    }

    // Determine file type from MIME or extension
    let fileType = file.type;
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_TYPES.has(fileType) && EXTENSION_TYPE_MAP[extension]) {
      fileType = EXTENSION_TYPE_MAP[extension];
    }

    if (!ALLOWED_TYPES.has(fileType)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
        },
        { status: 400 },
      );
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `uploads/${timestamp}_${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(storagePath, buffer, {
        contentType: fileType,
        upsert: false,
      });

    // Storage upload is best-effort — don't fail the entire request if it fails
    let fileUrl = "";
    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
    } else {
      // Get the public URL (or signed URL for private buckets)
      const {
        data: { publicUrl },
      } = supabase.storage.from("resumes").getPublicUrl(storagePath);
      fileUrl = publicUrl;
    }

    // Extract text from file
    let rawText = "";

    if (
      fileType === "application/pdf"
    ) {
      rawText = await extractPdfText(buffer);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      rawText = await extractDocxText(buffer);
    } else {
      // text/plain
      rawText = buffer.toString("utf-8");
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from this file. The file may be image-based or empty. Please try a different file or build from scratch.",
        },
        { status: 422 },
      );
    }

    // Parse the extracted text
    const parsed = parseResumeText(rawText);

    return NextResponse.json({
      fileUrl,
      rawText: rawText.slice(0, 10000), // Cap raw text sent to client
      parsed,
    });
  } catch (err) {
    console.error("Parse resume error:", err);
    return NextResponse.json(
      { error: "Something went wrong processing your resume. Please try again." },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */
/*  Text extraction helpers                                            */
/* ------------------------------------------------------------------ */

async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    return result.text || "";
  } catch (err) {
    console.error("PDF parse error:", err);
    return "";
  }
}

async function extractDocxText(buffer: Buffer): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  } catch (err) {
    console.error("DOCX parse error:", err);
    return "";
  }
}
