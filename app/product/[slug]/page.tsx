"use client";

import { useEffect, useState } from "react";
import { getProduct, getProducts } from "@/app/lib/getProducts";
import { urlFor } from "@/app/sanity/image";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, MessageCircle, ChevronLeft } from "lucide-react";

export default function ProductPage({ params }: { params: any }) {
  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track which image is currently being displayed
  const [activeImage, setActiveImage] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const { slug } = await params;
      const [singleProduct, productsList] = await Promise.all([
        getProduct(slug),
        getProducts(),
      ]);
      setProduct(singleProduct);
      setAllProducts(productsList || []);
      
      // Initialize activeImage with the first image from the array
      if (singleProduct?.images && singleProduct.images.length > 0) {
        setActiveImage(singleProduct.images[0]);
      }
      
      setLoading(false);
    }
    fetchData();
  }, [params]);

  const filteredProducts = allProducts.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-bold text-gray-500">Loading Product...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {search.length > 0 ? (
          /* SEARCH RESULTS VIEW */
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((p: any) => (
                <Link key={p._id} href={`/product/${p.slug.current}`} onClick={() => setSearch("")}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all p-3">
                    <img src={urlFor(p.images[0]).url()} alt={p.name} className="h-40 w-full object-cover rounded-xl" />
                    <h3 className="font-bold mt-2 text-gray-900 truncate">{p.name}</h3>
                    <p className="text-blue-600 font-bold">PKR {p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* PRODUCT DETAILS VIEW */
          product ? (
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
              
              {/* LEFT: IMAGE GALLERY SECTION */}
              <div className="flex flex-col gap-4">
                {/* Main Image Display */}
                <div className="group relative aspect-square overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200">
                  {activeImage && (
                    <Image
                      src={urlFor(activeImage).url()}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Thumbnail Row */}
                <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                  {product.images?.map((img: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                        activeImage === img ? "border-green-600 ring-2 ring-green-100 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={urlFor(img).url()}
                        alt={`Thumbnail ${index}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT: PRODUCT DETAILS SECTION */}
              <div className="mt-10 px-2 sm:mt-16 sm:px-0 lg:mt-0 lg:sticky lg:top-24">
                <div className="flex flex-col">
                  <Link href="/" className="text-sm font-bold text-green-600 flex items-center gap-1 mb-4 hover:underline">
                    <ChevronLeft size={16} /> Back to Collection
                  </Link>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
                  
                  <div className="mt-4 flex items-center justify-between border-b border-gray-200 pb-6">
                    <p className="text-3xl font-bold text-blue-600">PKR {product.price.toLocaleString()}</p>
                    <span className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold text-green-800 uppercase tracking-tighter">In Stock</span>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Description</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600 whitespace-pre-line">{product.description}</p>
                  </div>

                  <div className="mt-10">
                    <a
                      href={`https://wa.me/923212042740?text=Hello, I want to order ${product.name}`}
                      target="_blank"
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-5 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#20ba5a] active:scale-95"
                    >
                      <MessageCircle size={24} />
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 font-bold text-red-500">Product not found</div>
          )
        )}
      </main>
    </div>
  );
}