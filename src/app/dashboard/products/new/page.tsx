"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Upload } from "lucide-react";
import AIDescriptionGenerator from "@/components/AIDescriptionGenerator";
import { CATEGORIES } from "@/constants/categories";

export default function NewProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<{ _id: string; name: string }[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "1",
    category: "",
    subcategory: "",
    condition: "new",
    shopId: "",
    images: [] as string[],
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session) {
      fetch("/api/shops").then((r) => r.json()).then((d) => setShops(d.shops || []));
    }
  }, [session, status, router]);

  function handleAIGenerated(data: { title: string; description: string; category: string; suggestedPrice?: number }) {
    setForm((f) => ({
      ...f,
      name: data.title,
      description: data.description,
      category: data.category,
      price: data.suggestedPrice ? String(data.suggestedPrice) : f.price,
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const base64s: string[] = [];
    for (const file of files.slice(0, 6)) {
      const b64 = await new Promise<string>((res) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.readAsDataURL(file);
      });
      base64s.push(b64);
    }
    setForm((f) => ({ ...f, images: [...f.images, ...base64s].slice(0, 6) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.shopId) { toast.error("Please select a shop"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Product listed!");
      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  const selectedCat = CATEGORIES.find((c) => c.id === form.category);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-2xl mb-6">Add New Product</h1>

      {/* AI Generator */}
      <div className="mb-6">
        <AIDescriptionGenerator onGenerated={handleAIGenerated} />
      </div>

      <form onSubmit={handleSubmit} className="sela-card p-6 flex flex-col gap-4">
        {/* Shop selector */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Shop *</label>
          <select value={form.shopId} onChange={(e) => setForm({ ...form, shopId: e.target.value })} className="input-field" required>
            <option value="">Select your shop</option>
            {shops.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Product Title *</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Bluetooth Earbuds Pro Max" />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Description *</label>
          <textarea rows={4} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Price (DZD) *</label>
            <input type="number" required min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="2500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Stock</label>
            <input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" />
          </div>
        </div>

        {/* Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Category *</label>
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })} className="input-field">
              <option value="">Select…</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          {selectedCat?.subcategories && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Subcategory</label>
              <select value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="input-field">
                <option value="">All</option>
                {selectedCat.subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Condition */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Condition</label>
          <div className="flex gap-3">
            {["new", "used", "refurbished"].map((c) => (
              <label key={c} className={`flex-1 border rounded-xl px-3 py-2 text-center text-sm cursor-pointer capitalize transition-all ${form.condition === c ? "border-sela-green bg-sela-light text-sela-dark font-semibold" : "border-gray-200 text-gray-500"}`}>
                <input type="radio" name="condition" value={c} checked={form.condition === c} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="sr-only" />
                {c}
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Photos (max 6)</label>
          <label className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-sela-green transition-colors">
            <Upload size={18} className="text-gray-400" />
            <span className="text-sm text-gray-400">Click to upload images</span>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="sr-only" />
          </label>
          {form.images.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img} alt="" className="w-16 h-16 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 mt-2">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Publishing…</> : "Publish Product"}
        </button>
      </form>
    </div>
  );
}
