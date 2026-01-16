"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket, Menu, X } from "lucide-react";
import { assets } from "../../../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Home", "About", "Portfolio", "Pricing", "Products", "Contact"];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-44 h-14 relative">
            <Image
              src={assets.Logo}
              alt="SmashTechHub Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Links & Button */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/80 hover:text-white transition"
            >
              {link}
            </Link>
          ))}
          <button className="items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition flex">
            Start a Project <Rocket className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle (phones + tablets) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-black/90 backdrop-blur-lg border-t border-white/10 transform transition-transform duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
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
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium mt-2 flex items-center justify-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            Start a Project <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
