import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-black text-white pt-32 pb-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent"></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact</h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          At Smashtechhub, we believe great projects start with great conversations. Whether you’re ready to begin your next big idea,
           need clarity on a service, or simply want to explore possibilities, we’re here to help.
        </p>
        
      </div>
    </section>
  );
};

export default Hero;