'use client'

import { Rocket } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ---------------- TYPES ---------------- */

interface FAQItem {
  id: number
  question: string
  answer: string
}

/* ---------------- DATA ---------------- */

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Can I request a plan tailored to my needs?',
    answer:
      "Absolutely! We understand that every project is unique. Our Custom Plan is designed specifically for clients who need tailored solutions. Simply reach out to us with your requirements, and we'll create a personalized package that fits your vision, timeline, and budget.",
  },
  {
    id: 2,
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible payment plans to make our services more accessible. You can choose to pay in installments based on project milestones.',
  },
  {
    id: 3,
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary depending on the scope and complexity. A simple website can take 7–14 days, while more complex applications may take 4–12 weeks.',
  },
  {
    id: 4,
    question: 'Can you maintain or update my website after delivery?',
    answer:
      "Yes! We offer ongoing maintenance and support packages to keep your website running smoothly.",
  },
  {
    id: 5,
    question: 'Do I own my files after project completion?',
    answer:
      'Absolutely! Once the project is completed and payment is finalized, you receive full ownership of all source files.',
  },
]

/* ---------------- ANIMATIONS ---------------- */

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const answerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

/* ---------------- FAQ ITEM ---------------- */

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`bg-white rounded-2xl p-6 transition-shadow ${
        isOpen ? 'shadow-md' : 'hover:bg-gray-100'
      }`}
    >
      {/* Question */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[#393838] font-medium text-2xl w-8">
          {String(item.id).padStart(2, '0')}
        </span>

        <span className="flex-grow text-[#393838] font-semibold text-base md:text-lg">
          {item.question}
        </span>

        <svg
          className={`w-6 h-6 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden mt-4"
          >
            <div className="pl-12 pr-10">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------------- MAIN FAQ ---------------- */

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const headerRef = useRef(null)
  const ctaRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true })
  const ctaInView = useInView(ctaRef, { once: true })

  return (
    <section className="py-20 px-6 bg-[#FFF8F5]">
      <div className="max-w-screen mx-auto">

        {/* HEADER */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative inline-block">
            <span className="absolute -top-4 -left-6 bg-[#A2FF76] text-green-800 text-sm font-medium px-4 py-1 rounded-full -rotate-20">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
        </motion.div>

        {/* FAQ LIST */}
        <div className="space-y-4 mb-16">
          {faqData.map((item) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#556B2F] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-medium text-white mb-3">
              Ready To Build Something Amazing
            </h3>
            <p className="text-white/80 max-w-2xl">
              Let's bring your ideas to life with beautiful design and powerful technology.
            </p>
          </div>

          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 bg-[#F24F04] hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
          >
            Start a Project
            <Rocket className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
