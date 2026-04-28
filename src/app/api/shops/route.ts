import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Shop from "@/models/Shop";
import { uploadImage } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const wilaya   = searchParams.get("wilaya");
    const category = searchParams.get("category");
    const page     = parseInt(searchParams.get("page") || "1");
    const limit    = parseInt(searchParams.get("limit") || "20");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isActive: true };
    if (wilaya)   query.wilaya   = wilaya;
    if (category) query.category = category;

    const [shops, total] = await Promise.all([
      Shop.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Shop.countDocuments(query),
    ]);

    return NextResponse.json({ shops, total });
  } catch (error) {
    console.error("[SHOPS GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { name, description, wilaya, phone, category, logo } = body;

    if (!name || !wilaya || !phone || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Format WhatsApp link
    const clean = phone.replace(/\D/g, "");
    const wa = clean.startsWith("0") ? "213" + clean.slice(1) : clean;
    const whatsapp = `https://wa.me/${wa}`;

    let logoUrl: string | undefined;
    if (logo) {
      logoUrl = await uploadImage(logo, "sela/shops");
    }

    const shop = await Shop.create({
      name,
      description,
      wilaya,
      phone,
      whatsapp,
      category,
      logo: logoUrl,
      owner: (session.user as { id: string }).id,
    });

    return NextResponse.json({ shop }, { status: 201 });
  } catch (error) {
    console.error("[SHOPS POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
