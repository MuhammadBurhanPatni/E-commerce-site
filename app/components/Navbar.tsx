"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, Menu, MessageCircle, Home, Mail, ChevronRight } from "lucide-react";

export default function Navbar({ search, setSearch }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [localSearch, setLocalSearch] = useState(search || "");
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push(`/?search=${encodeURIComponent(localSearch)}`);
      setShowSearch(false);
    } else {
      setSearch(localSearch);
      setShowSearch(false);
    }
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-[60] w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24 gap-2">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 md:gap-4 cursor-pointer group shrink-0"
              onClick={() => { setSearch(""); setLocalSearch(""); setIsOpen(false); }}
            >
              <div className="relative h-12 w-12 md:h-16 md:w-16 transition-transform group-hover:scale-105">
                <Image src="/logo.jpeg" alt="Logo" fill priority className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-black text-gray-900 uppercase leading-none tracking-tighter">MY STORE</span>
                <span className="text-[8px] md:text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Premium Quality</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-600">
              <Link href="/" onClick={() => setSearch("")} className="hover:text-green-600 transition-colors">Home</Link>
              <Link href="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-full hover:bg-gray-100 text-black transition-colors">
                {showSearch ? <X size={24} /> : <Search size={24} />}
              </button>

              <a href="https://wa.me/9203212042740" target="_blank" className="bg-[#25D366] text-white p-2 md:px-5 md:py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                <MessageCircle size={20} /> 
                <span className="hidden sm:block">WHATSAPP</span>
              </a>

              {/* Mobile Toggle - Updated Z-Index */}
              <button 
                onClick={() => setIsOpen(true)} 
                className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-xl"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>

          {/* Search Dropdown */}
          {showSearch && (
            <div className="pb-4 animate-in slide-in-from-top-2 duration-300">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  autoFocus
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl outline-none text-black font-semibold border-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 z-[70]" : "opacity-0 pointer-events-none"}`} 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[80] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-gray-50">
            <span className="font-black text-xl text-gray-900 tracking-tighter uppercase">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white rounded-full shadow-md text-gray-900 active:scale-90 transition-all">
              <X size={24} />
            </button>
          </div>

          {/* Links List */}
          <div className="p-4 space-y-2 overflow-y-auto">
            <Link 
              href="/" 
              className={`flex items-center justify-between p-4 rounded-2xl font-bold text-lg transition-all ${pathname === "/" ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"}`}
              onClick={() => {setIsOpen(false); setSearch("");}}
            >
              <div className="flex items-center gap-4">
                <Home size={22} />
                <span>Home</span>
              </div>
              <ChevronRight size={18} className="opacity-40" />
            </Link>

            <Link 
              href="/contact" 
              className={`flex items-center justify-between p-4 rounded-2xl font-bold text-lg transition-all ${pathname === "/contact" ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"}`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-4">
                <Mail size={22} />
                <span>Contact Us</span>
              </div>
              <ChevronRight size={18} className="opacity-40" />
            </Link>
          </div>

          {/* Footer of Sidebar */}
          <div className="mt-auto p-6 border-t bg-gray-50">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Official Support</p>
            <a 
              href="https://wa.me/923131229105" 
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#20ba5a] transition-all"
            >
              <MessageCircle size={20} />
              Instant WhatsApp
            </a>
            <p className="text-center text-[10px] text-gray-400 mt-6 font-medium">© 2026 MY STORE PREMIUM</p>
          </div>
        </div>
      </div>
    </>
  );
}