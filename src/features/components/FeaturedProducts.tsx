"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  PackageCheck,
  CreditCard,
  Rocket,
  ShieldCheck,
  Car,
  CarFront,
  Wallet,
  UserCheck,
  Lock,
  Users,
  Video,
  User,
  Briefcase,
  Search,
  ClipboardList,
  Utensils,
  Bike,
  MessageCircle,
  ShoppingCart,
  Store,
  PhoneCall,
} from "lucide-react";
import { assets } from "../../../assets/assets";
import Link from "next/link";

const FeaturedProducts = () => {
  const products = [
    {
      name: "Smashwise",
      logo: assets.smashwise,
      color: "text-orange-500",
      featureBg: "bg-orange-50",
      features: ["Verified Sellers", "Genuine Products", "Secure Payments", "Quick Delivery"],
      icons: [BadgeCheck, PackageCheck, CreditCard, Rocket],
    },
    {
      name: "Ridesmash",
      logo: assets.ridesmash,
      color: "text-blue-900",
      featureBg: "bg-blue-50",
      features: ["Verified Drivers", "Book Ride/Send Parcel", "Register Vehicle", "Drive & Earn"],
      icons: [ShieldCheck, Car, CarFront, Wallet],
    },
    {
      name: "Qiimeet",
      logo: assets.qiimeet,
      color: "text-blue-500",
      featureBg: "bg-red-50",
      features: ["Verified Profiles", "Secure Connections", "Exclusive Matching", "Video Call Feature"],
      icons: [UserCheck, Lock, Users, Video],
    },
    {
      name: "Paradise Estate",
      logo: assets.paradise,
      color: "text-red-500",
      featureBg: "bg-red-50",
      features: ["Manage Residents", "Manage Visitors", "Manage Staffs", "Manage Payments"],
      icons: [User, Users, Briefcase, CreditCard],
    },
    {
      name: "SmashFood",
      logo: assets.smashfood,
      color: "text-red-500",
      featureBg: "bg-red-50",
      features: ["Browse & Discover", "Place Your Order", "Meal Prep", "Rider Delivers"],
      icons: [Search, ClipboardList, Utensils, Bike],
    },
    {
      name: "SmashChat",
      logo: assets.smashchat,
      color: "text-blue-500",
      featureBg: "bg-blue-50",
      features: ["Chat Loved Ones", "Marketplace", "Become a Vendor", "Schedule Calls"],
      icons: [MessageCircle, ShoppingCart, Store, PhoneCall],
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4 md:gap-0">
          <div className="flex-1 relative">
            <div className="absolute -top-10 left-0 bg-[#A2FF76] text-black text-sm font-semibold px-4 py-1.5 rounded-full -rotate-12">
              Enterprise
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600 text-base sm:text-lg">
              We combine creativity, strategy, and technology to deliver results that matter.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/portfolio"
              className="hidden md:flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition"
            >
              View all <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-3xl p-6 shadow-xl hover:scale-105 transition-transform flex flex-col"
            >
              {/* Logo & Name */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src={product.logo} alt={product.name} fill className="object-contain" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{product.name}</h3>
              </div>

              {/* Features */}
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {product.features.map((feature, i) => {
                  const Icon = product.icons[i];
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 sm:gap-3 ${product.featureBg} rounded-full px-3 sm:px-4 py-2 w-max`}
                    >
                      <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${product.color}`} />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition text-base sm:text-lg text-center"
              >
                View
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile View "View All" Button */}
        <div className="mt-8 text-center md:hidden">
          <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mx-auto">
            View all <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
