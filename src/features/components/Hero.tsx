"use client";

import React from "react";
import Image from "next/image";
import { Rocket, ArrowRight } from "lucide-react";
import { assets } from "../../../assets/assets";
import History from "../../../assets/History.svg";
import History2 from "../../../assets/History2.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-black pt-24 md:pt-32 pb-48 md:pb-[12rem] overflow-hidden flex flex-col items-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        <div className="text-center max-w-5xl mx-auto relative">
          {/* Trust badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 mb-6 sm:mb-8 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-center sm:text-left">
            <span className="bg-[#D2F801] text-black text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
            <span className="text-white text-sm">
              Trusted by startups, SMEs, and global companies.
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-snug relative">
            We Design & Build{" "}
            <span className="relative inline-block ml-0 sm:ml-2">
              Digital
              <img
                src={History.src}
                alt="Smiley"
                className="absolute -top-6 sm:-top-10 left-2 sm:left-0 w-10 h-10 sm:w-15 sm:h-15 animate-float"
              />
            </span>
            <br />
            <span className="bg-clip-text bg-gradient-to-r text-white text-transparent">
              Ex
              <span className="relative inline-block text-white">
                p
                <img
                  src={History2.src}
                  alt="Bolt"
                  className="absolute -top-4 sm:-top-7 left-0 sm:left-1 w-10 h-10 sm:w-15 sm:h-15 animate-float-delay"
                />
              </span>
              eriences That Move
            </span>
            <br />
            Brands Forward
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            From strategy and user-centric design to flawless development, we create digital
            <br className="hidden sm:block" />
            products that help businesses stand out, scale, and succeed in a competitive world.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-12">
            {/* Start a Project */}
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition flex items-center justify-center gap-2 text-lg shadow-lg shadow-orange-500/30 w-full sm:w-auto"
            >
              Start a Project <Rocket className="w-5 h-5" />
            </Link>

            {/* View Portfolio */}
            <Link
              href="/portfolio"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition flex items-center justify-center gap-2 text-lg w-full sm:w-auto"
            >
              View Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Desktop: keep original absolute layout */}
        <div className="hidden lg:block absolute left-8 md:left-16 lg:left-5 top-[520px] -translate-y-1/2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-2xl w-56 hover:scale-105 transition-transform">
            <div className="text-sm text-gray-600 mb-2">Revenue</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">₦234.98M</span>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-green-600 -rotate-45" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xl w-52 mt-20 hover:scale-105 translate-x-1/2 transition-transform">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <Image
                  src={assets.Hero1}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src={assets.Hero2}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">5K+</div>
                <div className="text-xs text-gray-600">Trusted Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: spinning badge */}
        <div className="hidden lg:block absolute right-8 md:right-16 lg:right-7 top-[600px]">
          <div className="relative w-32 md:w-40 h-32 md:h-40 animate-spin-fast">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              <defs>
                <path
                  id="circlePath"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                />
              </defs>
              <circle
                cx="80"
                cy="80"
                r="75"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text className="text-[12px] sm:text-[15px] font-semibold fill-white">
                <textPath href="#circlePath" startOffset="0%">
                  Best design and development agency in Africa •
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-transparent">
                <Image
                  src={assets.FourArrows}
                  alt="Target Icon"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile stacked layout */}
        <div className="flex flex-col items-center w-full lg:hidden mt-6 md:mt-8 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-2xl w-56 hover:scale-105 transition-transform">
            <div className="text-sm text-gray-600 mb-2">Revenue</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">₦234.98M</span>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-green-600 -rotate-45" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xl w-52 hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <Image
                  src={assets.Hero1}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src={assets.Hero2}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">5K+</div>
                <div className="text-xs text-gray-600">Trusted Users</div>
              </div>
            </div>
          </div>

          <div className="relative w-32 md:w-40 h-32 md:h-40 animate-spin-fast">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              <defs>
                <path
                  id="circlePath"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                />
              </defs>
              <circle
                cx="80"
                cy="80"
                r="75"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text className="text-[12px] sm:text-[15px] font-semibold fill-white">
                <textPath href="#circlePath" startOffset="0%">
                  Best design and development agency in Africa •
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-transparent">
                <Image
                  src={assets.FourArrows}
                  alt="Target Icon"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
