import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  currency: "DZD";
  stock: number;
  category: string;
  subcategory?: string;
  images: string[];
  shop: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  wilaya: string;
  whatsappLink: string; // Pre-filled WhatsApp message link
  isActive: boolean;
  isFeatured: boolean;
  condition: "new" | "used" | "refurbished";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    currency: {
      type: String,
      default: "DZD",
      enum: ["DZD"],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    subcategory: {
      type: String,
    },
    images: {
      type: [String], // Cloudinary URLs
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 6,
        message: "Maximum 6 images per product",
      },
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wilaya: {
      type: String,
      required: true,
    },
    whatsappLink: {
      type: String,
      required: true,
      // Auto-built: https://wa.me/213XXXXXXX?text=Hi, I'm interested in [product]
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: String,
      enum: ["new", "used", "refurbished"],
      default: "new",
    },
  },
  { timestamps: true }
);

// Indexes for fast filtering
ProductSchema.index({ category: 1, wilaya: 1 });
ProductSchema.index({ shop: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ name: "text", description: "text" });

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
