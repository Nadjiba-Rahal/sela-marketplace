import mongoose, { Document, Schema } from "mongoose";

export interface IShop extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  wilaya: string;
  address?: string;
  phone: string;
  whatsapp: string; // WhatsApp link: https://wa.me/213XXXXXXXXX
  logo?: string;
  category: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
}

const ShopSchema = new Schema<IShop>(
  {
    name: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wilaya: {
      type: String,
      required: [true, "Wilaya is required"],
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp contact is required"],
      // Format: https://wa.me/213XXXXXXXXX
    },
    logo: {
      type: String, // Cloudinary URL
    },
    category: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ShopSchema.index({ wilaya: 1, category: 1 });
ShopSchema.index({ name: "text", description: "text" });

export default mongoose.models.Shop || mongoose.model<IShop>("Shop", ShopSchema);
