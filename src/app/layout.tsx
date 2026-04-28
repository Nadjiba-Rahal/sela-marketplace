import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Sela — Connecting Local Markets",
  description: "Discover and shop from local Algerian businesses. From electronics to handmade artisanat — find it all on Sela.",
  keywords: "Algeria, marketplace, local, shops, sela, DZ, souk",
  openGraph: {
    title: "Sela — Connecting Local Markets",
    description: "Algeria's local marketplace platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              style: { fontFamily: "'DM Sans', sans-serif", borderRadius: "12px" },
              success: { iconTheme: { primary: "#0D9E6E", secondary: "#fff" } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
