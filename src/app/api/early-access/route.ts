import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("early_access_signups")
      .insert({ email });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You're already signed up!" },
          { status: 200 }
        );
      }

      console.error("Supabase early access insert error:", error);
      return NextResponse.json(
        { error: "Failed to sign up. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're in! Watch your inbox." },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
