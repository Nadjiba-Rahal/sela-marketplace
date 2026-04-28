import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Shop from "@/models/Shop";
import { uploadImage } from "@/lib/cloudinary";

// GET /api/products?category=&wilaya=&page=&limit=&search=
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const wilaya   = searchParams.get("wilaya");
    const search   = searchParams.get("search");
    const page     = parseInt(searchParams.get("page") || "1");
    const limit    = parseInt(searchParams.get("limit") || "20");
    const skip     = (page - 1) * limit;

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isActive: true };
    if (category) query.category = category;
    if (wilaya)   query.wilaya   = wilaya;
    if (search)   query.$text    = { $search: search };

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("shop", "name wilaya whatsapp")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[PRODUCTS GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/products — create product (seller only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { name, description, price, stock, category, subcategory, images, condition, shopId } = body;

    if (!name || !description || !price || !shopId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify shop belongs to this seller
    const shop = await Shop.findOne({ _id: shopId, owner: (session.user as { id: string }).id });
    if (!shop) {
      return NextResponse.json({ error: "Shop not found or unauthorized" }, { status: 403 });
    }

    // Upload images to Cloudinary
    const uploadedImages: string[] = [];
    if (images && images.length > 0) {
      for (const base64 of images.slice(0, 6)) {
        const url = await uploadImage(base64, `sela/products/${shopId}`);
        uploadedImages.push(url);
      }
    }

    // Build WhatsApp link with pre-filled message
    const encodedMsg = encodeURIComponent(
      `Hi, I'm interested in your product: ${name} — listed on Sela 🛍️`
    );
    const whatsappLink = `${shop.whatsapp}?text=${encodedMsg}`;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      subcategory,
      images: uploadedImages,
      shop:   shop._id,
      seller: (session.user as { id: string }).id,
      wilaya: shop.wilaya,
      whatsappLink,
      condition: condition || "new",
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
