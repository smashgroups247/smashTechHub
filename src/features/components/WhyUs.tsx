"use client";

import React from "react";
import { assets } from "../../../assets/assets";
import WhyUsCard from "./WhyUsCard";

const WhyUs = () => {
  const reasons = [
    {
      title: "Tailored to Your Business",
      desc: "Every solution we create is customized to your brand's goals, audience, and vision.",
      img: assets.cuate,
      style: "bg-[#F0F9FD] text-gray-900",
    },
    {
      title: "Fast & Reliable Delivery",
      desc: "With a refined workflow and expert team, we meet deadlines without compromising quality.",
      img: assets.amico,
      style: "bg-[#A2FF76] text-gray-900",
      imgClass: "object-contain",
    },
    {
      title: "Data Driven Decisions",
      desc: "We design with insights—every step is backed by research, testing, and real user behavior.",
      img: assets.pana2,
      style: "bg-[#E3EF56] text-gray-900",
    },
    {
      title: "End to End Support",
      desc: "From concept to launch and beyond, we stay with you to ensure your product continues to thrive.",
      img: assets.pana,
      style: "bg-[#F2E5D5] text-gray-900",
      imgClass: "object-contain",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Brands Work With Us
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            We combine creativity, strategy, and technology to deliver results that matter.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {reasons.map((reason, idx) => (
            <WhyUsCard
              key={idx}
              title={reason.title}
              desc={reason.desc}
              img={reason.img}
              style={reason.style}
              imgClass={reason.imgClass}
              extraClass={
                // Only apply offset on desktop
                idx === 2 ? "lg:-mr-15 relative z-10" : idx === 3 ? "lg:ml-15" : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
