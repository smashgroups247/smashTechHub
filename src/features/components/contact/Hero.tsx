
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
          Contact
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
            At Smashtechhub, we believe great projects start with great conversations. Whether you’re ready to begin your next big idea,
           need clarity on a service, or simply want to explore possibilities, we’re here to help.
        </motion.p>
      </div>
    </section>
  )
}

export default Hero
