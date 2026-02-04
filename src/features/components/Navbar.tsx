"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Rocket, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { assets } from "../../../assets/assets";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("Ecommerce");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productGroups = [
    { title: "Most Viewed", items: ["Ecommerce", "Estate management", "Accounting"] },
    { title: "Management", items: ["Expense Management", "Attendance management", "Employee Verification"] },
    { title: "Platforms", items: ["Dating", "Ride-hailing", "Food-delivery"] },
    { title: "Industries", items: ["Fintech", "Logistics", "Church"] },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const productDetails: Record<string, Array<{ title: string; description: string; image: string }>> = {
    Ecommerce: [
      { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise },
      { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise },
      { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise }
    ],
    "Estate management": [
      { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise },
      { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise },
      { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise }
    ],
    Accounting: [
      { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo }
    ],
    "Expense Management": [
      { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo },
      { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo },
      { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo }
    ],
    "Attendance management": [
      { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo }
    ],
    "Employee Verification": [
      { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo },
      { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo },
      { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo }
    ],
    Dating: [
      { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet },
      { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet },
      { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet }
    ],
    "Ride-hailing": [
      { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash },
      { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash },
      { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash }
    ],
    "Food-delivery": [
      { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood },
      { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood },
      { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood }
    ],
    Fintech: [
      { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit },
      { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit },
      { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit }
    ],
    Logistics: [
      { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo },
      { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo },
      { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo }
    ],
    Church: [
      { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo },
      { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo },
      { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo }
    ],
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-screen mx-auto px-6 py-4 mt-9 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12">
          <Image src={assets.Logo} alt="Logo" fill className="object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-md">
          {navLinks.map((item) =>
            item.label !== "Product" ? (
              <Link
                key={item.label}
                href={item.href}
                className={`transition ${
                  pathname === item.href
                    ? "text-orange-500 font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProductsOpen((prev) => !prev)}
                  className={`flex items-center gap-2 transition ${
                    pathname.startsWith("/product")
                      ? "text-orange-500 font-semibold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div className="absolute top-full z-40 -translate-x-1/2 mt-6 max-w-screen w-[95vw] bg-white shadow-2xl p-8">
                    <div className="grid md:grid-cols-[280px_1fr] grid-cols-1 gap-6 md:gap-12">
                      {/* LEFT COLUMN */}
                      <div className="bg-orange-50 rounded-2xl p-4 md:p-6">
                        <ul className="space-y-3.5">
                          {productGroups
                            .flatMap((group) => group.items)
                            .map((item) => (
                              <li
                                key={item}
                                onMouseEnter={() => setHoveredItem(item)}
                                className={`flex justify-between items-center text-sm text-gray-700 transition hover:text-orange-500 cursor-pointer ${
                                  hoveredItem === item
                                    ? "font-semibold text-orange-500"
                                    : ""
                                }`}
                              >
                                <span>{item}</span>
                                <ChevronRight
                                  className={`w-4 h-4 text-orange-500 transition-transform ${
                                    hoveredItem === item
                                      ? "rotate-0 opacity-100"
                                      : "rotate-0 opacity-0"
                                  }`}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* RIGHT COLUMN */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {(productDetails[hoveredItem] || []).map((product, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="group flex flex-row gap-3 p-4 rounded-2xl hover:bg-gray-50 transition"
                          >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md">
                              <Image
                                src={product.image}
                                alt={product.title}
                                className="object-contain w-full h-full"
                                priority
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition">
                                {product.title}
                              </h4>
                              <p className="text-sm text-gray-600 leading-snug">
                                {product.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <Link
          href="/pricing"
          className="hidden md:flex items-center gap-2 bg-[#F24F04] hover:bg-orange-600 text-white px-6 py-4 rounded-full font-semibold transition"
        >
          Start a Project <Rocket className="w-4 h-4" />
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-[calc(4rem+2rem)] left-0 right-0 bottom-0 bg-black overflow-y-auto z-50 px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                {item.label === "Product" ? (
                  <div>
                    <button
                      onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                      className={`flex items-center justify-between w-full text-lg transition ${
                        pathname.startsWith("/product")
                          ? "text-orange-500 font-semibold"
                          : "text-white"
                      }`}
                    >
                      <span>Product</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isMobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMobileProductsOpen && (
                      <div className="mt-2 flex flex-col gap-4 pl-4">
                        {productGroups.map((group) => (
                          <div key={group.title}>
                            <p className="text-white/60 text-sm mb-2">{group.title}</p>
                            <ul className="flex flex-col gap-2">
                              {group.items.map((product) => (
                                <li key={product}>
                                  <Link
                                    href={`/product/${product.toLowerCase().replace(/\s+/g, "-")}`}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setIsMobileProductsOpen(false);
                                    }}
                                    className="text-white text-sm hover:text-orange-400 transition"
                                  >
                                    {product}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition mt-4 ${
                      pathname === item.href
                        ? "text-orange-500 font-semibold"
                        : "text-white hover:text-orange-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
