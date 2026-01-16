import React from "react";
import Image from "next/image";

interface WhyUsCardProps {
  title: string;
  desc: string;
  img: string;
  style?: string;
  imgClass?: string;
  extraClass?: string;
}

const WhyUsCard: React.FC<WhyUsCardProps> = ({
  title,
  desc,
  img,
  style,
  imgClass,
  extraClass,
}) => {
  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 hover:scale-105 transition-transform min-h-[28rem] sm:min-h-[32rem] md:min-h-[36rem] ${style} ${extraClass || ""}`}
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h3>
      <p className="text-base sm:text-lg mb-6">{desc}</p>

      {/* Responsive Image Container */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mt-6 rounded-2xl overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className={`rounded-2xl ${imgClass || "object-cover"}`}
        />
      </div>
    </div>
  );
};

export default WhyUsCard;
