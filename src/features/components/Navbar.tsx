"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket, Menu, X, ArrowRight } from "lucide-react";
import { assets } from "../../../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [isProductsOpen, setIsProductsOpen] = React.useState(false);
  const productCategories = [
    "Ecommerce",
    "Estate management",
    "Accounting",
    "Expense Management",
    "Attendance management",
    "Dating",
    "Ride-hailing",
    "Food-delivery",
    "Email",
    "Fintech",
    "Logistics",
    "Church",
    "Employee Verification"
  ];
  
  const featuredProducts = [
    { name: "Smashwise", desc: "Buy anything, sell everything", icon: "🛒" },
    { name: "Smashwise", desc: "Buy anything, sell everything", icon: "🛒" },
    { name: "Smashwise", desc: "Buy anything, sell everything", icon: "🛒" }
  ];

  const links = ["Home", "About", "Portfolio", "Pricing", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-36 sm:w-44 h-12 sm:h-14 relative">
            <Image src={assets.Logo} alt="SmashTechHub Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/80 hover:text-white transition text-sm sm:text-base"
            >
              {link}
            </Link>
          ))}
          {/* Products Dropdown */}
<div className="relative">
  <button
    onClick={() => setIsProductsOpen(!isProductsOpen)}
    className="text-white/80 hover:text-white transition flex items-center gap-1.5 text-base"
  >
    Products
    <svg
      className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {/* Dropdown Menu */}
  {isProductsOpen && (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 bg-white rounded-3xl shadow-2xl p-8 w-full">
      <div className="grid grid-cols-[280px_1fr] gap-12">
        {/* Left Column - Categories */}
        <div className="bg-orange-50 rounded-2xl p-6">
          <div className="flex items-center justify-between text-orange-500 font-semibold mb-6 cursor-pointer group">
            <span className="text-base">Ecommerce</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
          <ul className="space-y-3.5">
            {productCategories.slice(1).map((category) => (
              <li key={category}>
                <a href="#" className="text-gray-700 hover:text-orange-500 transition text-sm block">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Featured Products */}
        <div className="grid grid-cols-3 gap-6">
          {featuredProducts.map((product, idx) => (
            <a
              key={idx}
              href="#"
              className="flex flex-col gap-3 p-4 rounded-2xl hover:bg-gray-50 transition group"
            >
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
                {product.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-base group-hover:text-orange-500 transition">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600 leading-snug">
                  {product.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )}
</div>

        </div>

        {/* Desktop Button */}
        <button className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition">
          Start a Project <Rocket className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-4">
            {links.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white text-lg hover:text-orange-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            ))}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 sm:px-6 rounded-full font-medium mt-2 flex items-center justify-center gap-2 text-base sm:text-lg">
              Start a Project <Rocket className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
