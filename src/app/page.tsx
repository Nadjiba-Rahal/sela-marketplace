import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, ShoppingBag, Store } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";

export default function HomePage() {
  return (
    <div className="bg-sela-cream">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-sela-light/60 via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-1.5 bg-sela-light text-sela-dark text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <MapPin size={12} /> All 58 Wilayas of Algeria
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-sela-charcoal leading-tight mb-5">
              Your local market,<br />
              <span className="text-sela-green">online.</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-xl">
              Discover products from local Algerian shops — from electronics to handmade artisanat.
              Order directly via WhatsApp. No complicated checkout.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary flex items-center gap-2">
                Browse Products <ArrowRight size={16} />
              </Link>
              <Link href="/register" className="btn-outline flex items-center gap-2">
                <Store size={16} /> List your shop — it's free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Wilayas covered", value: "58" },
            { label: "Categories", value: "12" },
            { label: "WhatsApp orders", value: "Direct" },
          ].map((s) => (
            <div key={s.label} className="sela-card p-4 text-center">
              <div className="font-display font-bold text-2xl text-sela-green">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="font-display font-bold text-2xl mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`sela-card p-4 flex flex-col items-center gap-2 text-center cursor-pointer animate-fade-up stagger-${Math.min(i + 1, 6)}`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-600 leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── AI Feature Banner ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-sela-dark to-sela-green rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} />
              <span className="font-semibold text-sm">AI-Powered Listings</span>
            </div>
            <h3 className="font-display font-bold text-2xl mb-2">
              Describe in Darja. Publish in seconds.
            </h3>
            <p className="text-emerald-100 text-sm max-w-md">
              Just tell our AI what you're selling — in Arabic, French, or Darja — and it writes a professional product listing for you instantly.
            </p>
          </div>
          <Link
            href="/register"
            className="bg-white text-sela-green font-semibold px-6 py-3 rounded-xl hover:bg-sela-light transition-colors whitespace-nowrap flex-shrink-0"
          >
            Start selling →
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2025 Sela — Connecting Local Markets 🇩🇿</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="/about" className="hover:text-sela-green transition-colors">About</Link>
            <Link href="/contact" className="hover:text-sela-green transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
