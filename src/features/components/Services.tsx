
import React from "react";
import Image from "next/image";
import { assets } from "../../../assets/assets";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "UI/UX Design",
      desc: "We craft intuitive, visually striking interfaces that deliver seamless user experiences and set your brand apart.",
      preview: assets.preview_img_1,
    },
    {
      number: "02",
      title: "Web Dev",
      desc: "From fast, responsive sites to full-scale web applications, we build high-performing solutions that drive growth.",
      preview: assets.preview_img_2,
    },
    {
      number: "03",
      title: "Mobile Dev",
      desc: "We design and develop scalable mobile apps that combine functionality with stunning aesthetics.",
      preview: assets.preview_img_3,
    },
    {
      number: "04",
      title: "Branding",
      desc: "Elevate your brand with a unique identity system built for recognition, engagement, and long-term consistency.",
      preview: assets.preview_img_4,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 sm:mb-16 relative">
          <div className="absolute -top-9 left-[550px] bg-[#D2F801] text-black text-sm font-semibold px-4 py-1.5 rounded-full rotate-12">
            Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            What We're Good At
          </h2>
          <p className="text-gray-600 text-lg">
            A full-suite digital agency focused on transforming ideas into exceptional products.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12 sm:space-y-16">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pb-12 sm:pb-16 border-b border-gray-200 last:border-b-0 relative"
            >
              {/* Number + Text */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 flex-1">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900 transition-colors group-hover:text-orange-500">
                  {service.number}
                </span>

                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 transition-colors group-hover:text-orange-500">
                    {service.title}
                  </h3>
                </div>

                <div className="flex-2">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-2xl">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Icon + Hover Preview */}
              <div className="relative flex-shrink-0 mt-4 md:mt-0 w-14 h-14">
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full border border-gray-200 transition-opacity group-hover:opacity-0">
                  <Image
                    src={assets.circlearrow}
                    alt="Expand"
                    width={48}
                    height={48}
                  />
                </div>

                {/* Preview */}
                {/* Preview */}
                <div className="absolute 
  -left-32 -top-24 
  z-20
  opacity-0 scale-90
  group-hover:opacity-100 group-hover:scale-100
  transition-all duration-300 ease-out
  pointer-events-none
">
                  <div
                    className="
      relative
      w-56 h-36
      overflow-hidden
      rounded-2xl
      shadow-2xl
      transform-gpu
      origin-center
      transition-transform
      duration-300
      ease-out
      group-hover:-rotate-12
      group-hover:-translate-x-2
      group-hover:translate-y-1
    "
                  >
                    <Image
                      src={service.preview}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
