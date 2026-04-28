import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateProductDetails } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { input } = await req.json();
    if (!input || typeof input !== "string" || input.trim().length < 3) {
      return NextResponse.json({ error: "Input too short" }, { status: 400 });
    }

    const result = await generateProductDetails(input.trim());
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI GENERATE]", error);
    return NextResponse.json({ error: "AI generation failed. Try again." }, { status: 500 });
  }
}
