export interface Category {
  id: string;
  label: string;
  icon: string;
  subcategories?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "electronics",
    label: "Electronics & Phones",
    icon: "📱",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories", "Audio", "Gaming"],
  },
  {
    id: "fashion",
    label: "Clothes & Fashion",
    icon: "👗",
    subcategories: ["Women", "Men", "Kids", "Traditional (Karakou, Burnous)", "Shoes", "Bags"],
  },
  {
    id: "beauty",
    label: "Beauty & Cosmetics",
    icon: "💄",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Perfumes", "Natural & Organic"],
  },
  {
    id: "home",
    label: "Home & Furniture",
    icon: "🛋️",
    subcategories: ["Furniture", "Decoration", "Kitchen", "Bedding", "Lighting", "Cleaning"],
  },
  {
    id: "food",
    label: "Food & Groceries",
    icon: "🥦",
    subcategories: ["Spices & Herbs", "Dried Fruits", "Traditional Products", "Honey", "Olive Oil"],
  },
  {
    id: "auto",
    label: "Auto Parts & Cars",
    icon: "🚗",
    subcategories: ["Car Parts", "Accessories", "Tires", "Tools", "Oils & Fluids"],
  },
  {
    id: "handmade",
    label: "Handmade & Artisanat",
    icon: "🏺",
    subcategories: ["Pottery", "Jewelry", "Weaving", "Leather", "Woodwork", "Embroidery"],
  },
  {
    id: "kids",
    label: "Kids & Baby",
    icon: "🧸",
    subcategories: ["Toys", "Baby Clothes", "School Supplies", "Baby Gear"],
  },
  {
    id: "sports",
    label: "Sports & Fitness",
    icon: "⚽",
    subcategories: ["Football", "Gym Equipment", "Outdoor", "Sportswear", "Supplements"],
  },
  {
    id: "tools",
    label: "Tools & Hardware",
    icon: "🔧",
    subcategories: ["Power Tools", "Hand Tools", "Construction", "Plumbing", "Electrical"],
  },
  {
    id: "books",
    label: "Books & Stationery",
    icon: "📚",
    subcategories: ["Arabic Books", "French Books", "Textbooks", "Office Supplies"],
  },
  {
    id: "services",
    label: "Services",
    icon: "🛠️",
    subcategories: ["Repair", "Delivery", "Tutoring", "Photography", "Design"],
  },
];
