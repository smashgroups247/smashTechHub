'use client'

import { motion } from 'framer-motion'

export default function Hero({
  header,
  paragraph,
}: {
  header: string
  paragraph: string
}) {
  return (
    <section className="relative bg-black text-white pt-32 pb-34 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          className="text-6xl md:text-6xl font-semibold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          {header}
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="text-white/70 text-lg md:text-medium mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: 'easeOut',
          }}
        >
          {paragraph}
        </motion.p>
      </div>
    </section>
  )
}
