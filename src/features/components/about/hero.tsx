
'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          About Us
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: 'easeOut',
          }}
        >
          We combine strategy, creativity, and technology to help brands grow in a digital-first world. Our team is passionate about delivering beautiful,
           functional, and scalable solutions that make a real impact.
        </motion.p>
      </div>
    </section>
  )
}

export default Hero
