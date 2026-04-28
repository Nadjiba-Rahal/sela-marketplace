"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { ShoppingBag, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Sela" width={36} height={36} className="rounded-lg" />
          <span className="font-display font-bold text-xl text-sela-charcoal">
            Sela
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-sela-green transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-sela-green transition-colors">
            Products
          </Link>
          <Link href="/shops" className="text-sm font-medium text-gray-600 hover:text-sela-green transition-colors">
            Shops
          </Link>
        </div>

        {/* Auth actions */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-sela-green transition-colors">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline text-sm py-2 px-4">Sign in</Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4">List your shop</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 animate-fade-in">
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Home</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Products</Link>
          <Link href="/shops" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Shops</Link>
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-sela-green">Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-left text-red-500">Sign out</button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link href="/login" className="btn-outline text-center text-sm">Sign in</Link>
              <Link href="/register" className="btn-primary text-center text-sm">List your shop</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
