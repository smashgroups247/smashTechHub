import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-black text-white pt-32 pb-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent"></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Portfolio</h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          We create digital products and experiences that are visually striking, user-centric, and built for performance.
           Explore some of the projects we’ve proudly delivered for clients across industries.
        </p>
        
      </div>
    </section>
  );
};

export default Hero;