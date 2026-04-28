import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const product = await Product.findById(params.id)
      .populate("shop", "name wilaya phone whatsapp logo")
      .lean();

    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("[PRODUCT GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (product.seller.toString() !== (session.user as { id: string }).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const allowed = ["name", "description", "price", "stock", "isActive", "condition"];
    for (const key of allowed) {
      if (body[key] !== undefined) (product as Record<string, unknown>)[key] = body[key];
    }

    await product.save();
    return NextResponse.json({ product });
  } catch (error) {
    console.error("[PRODUCT PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (product.seller.toString() !== (session.user as { id: string }).id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await product.deleteOne();
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("[PRODUCT DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
