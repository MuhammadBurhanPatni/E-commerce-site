"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "./lib/getProducts";
import { urlFor } from "./sanity/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

// Helper component to handle Search Params safely in Next.js
function HomeContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  // 1. Load products from Sanity
  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data || []);
    }
    load();
  }, []);

  // 2. Listen for search query in URL (from Contact page)
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black">
            {search ? `Results for "${search}"` : "Our Collection"}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group flex flex-col">
              <Link href={`/product/${product.slug.current}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <img 
                    src={product.images?.[0] ? urlFor(product.images[0]).url() : "/placeholder.png"} 
                    className="aspect-square object-cover" 
                  />
                  <div className="p-4">
                    <h2 className="font-bold text-black truncate">{product.name}</h2>
                    <p className="text-blue-600 font-black mt-1">PKR {product.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
              <a href={`https://wa.me/923212042740?text=Order:${product.name}`} className="mt-2 bg-black text-white py-3 rounded-2xl text-center text-xs font-bold hover:bg-green-600 transition-colors">
                ORDER ON WHATSAPP
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}