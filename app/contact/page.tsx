"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Professional submission logic would go here (e.g., Formspree or EmailJS)
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Passing search state to keep Navbar functional */}
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Contact <span className="text-green-600">Us</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about an order or a product? We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side: Professional Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Store Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-green-100 p-4 rounded-2xl text-green-600 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">WhatsApp & Phone</p>
                    <p className="text-lg font-bold text-black">+92 3212042740</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-lg font-bold text-black">burhanwani8800@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-purple-100 p-4 rounded-2xl text-purple-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Main Location</p>
                    <p className="text-lg font-bold text-black">Karachi, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Support Hours</p>
                    <p className="text-lg font-bold text-black">24/7 Online Support</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Help Button */}
              <a 
                href="https://wa.me/923212042740"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#20ba5a] transition-all active:scale-95 text-sm uppercase tracking-wider"
              >
                <MessageCircle size={22} />
                Instant WhatsApp Support
              </a>
            </div>
          </div>

          {/* Right Side: Professional Message Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-black placeholder:text-gray-400 font-semibold"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-black placeholder:text-gray-400 font-semibold"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                <textarea 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none text-black placeholder:text-gray-400 font-semibold"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
              >
                <Send size={20} />
                Submit Message
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}