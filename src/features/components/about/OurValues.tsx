'use client'

import Image from 'next/image'
import React from 'react'
import { assets } from "../../../../assets/assets"

function OurValues() {
  const values = [
    {
      icon: assets.creativity,
      iconBg: 'bg-[#F24F04]',
      cardBg: 'bg-[#FFF8F5]',
      title: 'Creativity',
      description:
        'We push boundaries to design bold, unique, and memorable digital experiences.',
    },
    {
      icon: assets.integrity,
      iconBg: 'bg-[#167AA6]',
      cardBg: 'bg-[#F0F9FD]',
      title: 'Integrity',
      description:
        'We believe in honesty, transparency, and building long-lasting client relationships.',
    },
    {
      icon: assets.innovation,
      iconBg: 'bg-[#556B2F]',
      cardBg: 'bg-[#F6F9F1]',
      title: 'Innovation',
      description:
        'We adopt the latest technologies and methodologies to stay ahead of the curve.',
    },
    {
      icon: assets.collaboration,
      iconBg: 'bg-[#855629]',
      cardBg: 'bg-[#F8F0E8]',
      title: 'Collaboration',
      description:
        'Great products are built together with our clients and within our team.',
    },
    {
      icon: assets.excellence,
      iconBg: 'bg-[#A2FF76]',
      cardBg: 'bg-[#E7FFDB]',
      title: 'Excellence',
      description:
        'Every pixel, line of code, and interaction is crafted with care and precision.',
    },
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern Icons */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-white text-6xl">✨</div>
        <div className="absolute top-20 right-20 text-white text-5xl">⚡</div>
        <div className="absolute top-40 left-1/4 text-white text-4xl">🔍</div>
        <div className="absolute bottom-20 left-20 text-white text-6xl">⭐</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left mb-16 relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Values That Drive Us
          </h2>

          <div className="absolute -top-2 right-1/2 bg-[#D4FF00] text-black text-sm font-semibold px-4 py-1.5 rounded-full rotate-12">
            Values
          </div>
        </div>

        {/* Infinite Marquee */}
        <div className="overflow-hidden relative">
          <div className="flex w-max gap-6 animate-marquee">
            {[...values, ...values].map((value, index) => (
              <div
                key={index}
                className={`mt-3 mb-3 group flex-shrink-0
                  w-[320px] sm:w-[360px] md:w-[380px]
                  min-h-[260px]
                  ${value.cardBg}
                  rounded-3xl
                  px-8 py-6
                  shadow-xl
                  transition-transform duration-300
                  hover:-translate-y-2`}
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                }}
              >
                {/* Icon */}
                <div
                  className={`w-20 h-20 ${value.iconBg}
                  rounded-full flex items-center justify-center
                  mb-6 shadow-lg`}
                >
                  <Image
                    src={value.icon}
                    alt={value.title}
                    width={60}
                    height={60}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurValues
