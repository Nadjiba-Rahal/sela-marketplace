"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Package, Store, TrendingUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") redirect("/login");
  }, [status]);

  useEffect(() => {
    if (session) {
      Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/shops").then((r) => r.json()),
      ]).then(([pData, sData]) => {
        setProducts(pData.products || []);
        setShops(sData.shops || []);
        setLoading(false);
      });
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-sela-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Welcome back, {session?.user?.name}</p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Products", value: products.length, icon: Package, color: "text-blue-500" },
          { label: "Shops", value: shops.length, icon: Store, color: "text-sela-green" },
          { label: "WhatsApp ready", value: products.length, icon: TrendingUp, color: "text-green-500" },
        ].map((s) => (
          <div key={s.label} className="sela-card p-5 flex items-center gap-4">
            <div className={`${s.color} bg-gray-50 p-3 rounded-xl`}>
              <s.icon size={22} />
            </div>
            <div>
              <div className="font-display font-bold text-2xl">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* No shop prompt */}
      {shops.length === 0 && (
        <div className="sela-card p-8 text-center mb-8">
          <Store size={40} className="text-sela-green mx-auto mb-3" />
          <h2 className="font-display font-semibold text-lg mb-2">Create your first shop</h2>
          <p className="text-gray-400 text-sm mb-4">You need a shop before adding products.</p>
          <Link href="/dashboard/shops/new" className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} /> Create Shop
          </Link>
        </div>
      )}

      {/* Products grid */}
      {products.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-lg mb-4">Your Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {products.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
