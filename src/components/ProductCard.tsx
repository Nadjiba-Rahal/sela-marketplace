import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  wilaya: string;
  whatsappLink: string;
  condition: string;
  shop?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const imgSrc = product.images?.[0] || `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="sela-card group flex flex-col">
      {/* Image */}
      <Link href={`/products/${product._id}`} className="relative aspect-square overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <span className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-0.5 rounded-full text-gray-600 capitalize">
          {product.condition}
        </span>
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2 hover:text-sela-green transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sela-green font-bold text-base">
          {product.price.toLocaleString("fr-DZ")} <span className="text-xs font-medium text-gray-400">DZD</span>
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin size={11} />
          <span>{product.wilaya}</span>
          {product.shop && <span className="ml-auto truncate text-right">{product.shop.name}</span>}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={product.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 btn-whatsapp justify-center text-sm py-2"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.136 1.535 5.879L.057 23.428a.75.75 0 00.906.981l5.805-1.516A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.7-.5-5.25-1.38l-.376-.217-3.902 1.02 1.04-3.796-.237-.386A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}
