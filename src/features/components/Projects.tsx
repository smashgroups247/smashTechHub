import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { assets } from "../../../assets/assets";

const Projects = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2 Columns on desktop, 1 column on tablet/mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="space-y-16 lg:space-y-20">

            {/* Header */}
            <div>
              <div className="relative inline-block">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                  Take a Look At Our <br /> Recent Work
                </h2>
                <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-[#A2FF76] text-black text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full rotate-12">
                  Projects
                </div>
              </div>
              <p className="text-gray-400 text-base sm:text-lg mt-4 sm:mt-6 max-w-md">
                A glimpse into the ideas we've brought to life.
              </p>
            </div>

            {/* Ridesmash */}
            <div>
              <div className="relative w-full rounded-3xl aspect-[4/3] overflow-hidden">
                <Image
                  src={assets.Banner1}
                  alt="SmashFood App UI"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mt-4 sm:mt-6">Ridesmash</h3>
              <p className="text-gray-400 mt-2 sm:mt-3 max-w-md">
                Get a safe and affordable ride anytime, anywhere with our
                user-friendly ride-hailing platform.
              </p>
              <button className="mt-3 sm:mt-4 text-orange-500 flex items-center gap-2 font-semibold">
                View <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* SmashChat */}
            <div>
              <div className="relative w-full rounded-3xl aspect-[4/3] overflow-hidden">
                <Image
                  src={assets.Smashchat2}
                  alt="SmashChat App UI"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mt-4 sm:mt-6">SmashChat</h3>
              <p className="text-gray-400 mt-2 sm:mt-3 max-w-md">
                A communication & social commerce app for chatting, calling and
                buying products.
              </p>
              <button className="mt-3 sm:mt-4 text-orange-500 flex items-center gap-2 font-semibold">
                View <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-16 lg:space-y-20">

            {/* Qiimeet */}
            <div>
              <div className="relative w-full rounded-3xl aspect-[4/3] overflow-hidden">
                <Image
                  src={assets.Qiimeet2}
                  alt="Qiimeet App UI"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mt-4 sm:mt-6">Qiimeet</h3>
              <p className="text-gray-400 mt-2 sm:mt-3 max-w-md">
                An app designed to help people form meaningful connections
                through smart matching.
              </p>
              <button className="mt-3 sm:mt-4 text-orange-500 flex items-center gap-2 font-semibold">
                View <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* SmashFood */}
            <div>
              <div className="relative w-full rounded-3xl aspect-[4/3] overflow-hidden">
                <Image
                  src={assets.Smashfood1}
                  alt="SmashFood App UI"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mt-4 sm:mt-6">SmashFood</h3>
              <p className="text-gray-400 mt-2 sm:mt-3 max-w-md">
                A hybrid food-tech platform for ordering meals and booking
                private chefs.
              </p>
              <button className="mt-3 sm:mt-4 text-orange-500 flex items-center gap-2 font-semibold">
                View <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center lg:justify-end mt-8">
          <button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold flex items-center gap-3">
            View Portfolio
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
