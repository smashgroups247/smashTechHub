// src/features/homepage/components/ProjectCards.tsx
"use client"

import Image from "next/image"
import { ArrowUpRight, Rocket } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { assets } from "../../../../assets/assets"
import Link from "next/link"

type Project = {
    id: number
    name: string
    overview: string
    tags: string[]
    duration: string
    image: any
    subtitle?: string
    headline?: string
    steps?: string[]
    features?: string[]
}

const projectNameColors: Record<string, string> = {
  Ridesmash: "text-black-500",
  Qiimeet: "text-pink-500",
  SmashChat: "text-[#0485E0]",
  SmashFood: "text-[#00472B]",
  Smashwise: "text-[#FC731B]",
  SmashRemit: "text-[#0991FF]",
  "Smash Apartment": "text-black-500",
  "Paradise Estate": "text-[#BA0000]",
  "Paul Smith Initiatives": "text-[#EC723B]",
  SmashInvoice: "text-[#FF3A00]",
  "Smash Mail": "text-[#F46B09]",
  "Smash Travels": "text-[#FD9602]",
}

const mobileProjects: Project[] = [
    {
        id: 1,
        name: "Ridesmash",
        subtitle: "Ride in Style · Ride in Comfort",
        overview:
            "RideSmash is a modern ride-hailing platform designed to offer fast, safe, and transparent transportation for everyday commuters. The project objective was to create an intuitive mobile experience that simplifies booking rides, tracking drivers, and handling payments all while ensuring user trust and reliability.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.ridesmash_banner,
    },
    {
        id: 2,
        name: "Qiimeet",
        headline: "Ready to Connect?",
        overview:
            "Qiimeet is a modern dating app designed to help individuals form meaningful connections through authentic conversations and compatibility-based matching. The goal of the project was to create a seamless user experience that feels safe, personal, and intuitive—encouraging users to move beyond swipes and engage in deeper interactions.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "4 months",
        image: assets.Qiimeet_banner,
    },
    {
        id: 3,
        name: "SmashChat",
        overview:
            "SmashChat is a multi-functional communication and social commerce app that allows users to chat, call, and connect with friends and family, while also enabling them to buy products, sell as vendors, and place ads within an integrated marketplace. The goal was to design a seamless experience that brings messaging, shopping, and selling together in one intelligent platform.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "6 months",
        image: assets.smashchat_banner,
    },
    {
        id: 4,
        name: "SmashFood",
        overview:
            "SmashFood is a hybrid food-tech platform that allows users to order meals from restaurants and book private chefs for home dining experiences. The goal of this project was to design an intuitive mobile experience that combines everyday food delivery convenience with premium, on-demand private chef services.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "6 months",
        image: assets.smashfood_banner,
    },
    {
        id: 5,
        name: "Smashwise",
        overview:
            "SmashWise is a multi-category e-commerce app that allows users to order items across a wide range of categories—including electronics, groceries, fashion, home essentials, beauty products, and more. The project goal was to design an intuitive, fast, and scalable shopping experience that helps users find anything they need in one place.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "4 months",
        image: assets.smashwise_banner,
    },
    {
        id: 6,
        name: "SmashRemit",
        overview:
            "SmashRemit is a modern mobile fintech solution that enables users to send money across borders with ease, speed, and transparency. In addition to global remittances, the app provides users with secure virtual cards for online payments, creating an all-in-one financial tool for everyday transactions and international needs.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "8 months",
        image: assets.smashremit_banner,
    },
]

const webProjects: Project[] = [
    {
        id: 1,
        name: "Smash Apartment",
        overview:
            "SmashApartment is a real estate web platform for renting and buying verified properties with ease.",
        tags: ["Web App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.smashapartments_banner,
    },
    {
        id: 2,
        name: "Paradise Estate",
        overview:
            "Paradise Estate is a comprehensive digital solution designed for gated communities and estate administrators. It provides estate owners with tools to manage residents, generate digital visitor gate passes, and handle estate dues, while giving residents a mobile app to pay bills, track payments, and generate visitor codes instantly. The goal was to create a secure, transparent, and user-friendly system for streamlined estate operations.",
        tags: ["Web App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.paradise_banner,
    },
    {
        id: 3,
        name: "Paul Smith Initiatives",
        overview:
            "PaulSmithInitiatives is a web-based fundraising platform dedicated to supporting less privileged individuals and communities. The platform enables donors to make secure contributions, learn about ongoing humanitarian projects, and track the impact of their donations. The goal was to create a digital solution that inspires trust, transparency, and ease of giving.",
        tags: ["Web App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.PSF_banner,
    },
    {
        id: 4,
        name: "SmashInvoice",
        overview:
            "SmashInvoice is a web-based invoicing solution designed to help freelancers, small businesses, and service providers create, manage, and track invoices efficiently. The platform streamlines financial workflows, reduces manual paperwork, and ensures users get paid faster through an intuitive, professional interface.",
        tags: ["Web App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.smashinvoice_banner,
    },
    {
        id: 5,
        name: "Smash Mail",
        overview:
            "SmashMail is a robust web-based email management platform designed to help organizations streamline internal and external communication. It provides tools for creating, scheduling, and monitoring email campaigns, newsletters, and transactional messages — all from a centralized, user-friendly dashboard.",
        tags: ["Web App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.smashmail_banner,
    },
    {
        id: 6,
        name: "Smash Travels",
        overview:
            "SmashTravels is a modern travel website that allows users to book flight tickets, plan international travel, and access verified information about visas, documentation, and travel requirements. The goal of the project was to create a smooth, trustworthy, and informative travel experience that reduces the stress of trip planning.",
        tags: ["Web App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.smashtravels_banner,
    },

]

const brandingProjects: Project[] = [
    {
        id: 1,
        name: "Ridesmash",
        subtitle: "Ride in Style · Ride in Comfort",
        overview:
            "RideSmash is a modern ride-hailing platform designed to offer fast, safe, and transparent transportation for everyday commuters. The project objective was to create an intuitive mobile experience that simplifies booking rides, tracking drivers, and handling payments all while ensuring user trust and reliability.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "10 months",
        image: assets.ridesmash_banner,
    },
    {
        id: 2,
        name: "Qiimeet",
        headline: "Ready to Connect?",
        overview:
            "Qiimeet is a modern dating app designed to help individuals form meaningful connections through authentic conversations and compatibility-based matching. The goal of the project was to create a seamless user experience that feels safe, personal, and intuitive—encouraging users to move beyond swipes and engage in deeper interactions.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "4 months",
        image: assets.Qiimeet_banner,
    },
    {
        id: 3,
        name: "SmashChat",
        overview:
            "SmashChat is a multi-functional communication and social commerce app that allows users to chat, call, and connect with friends and family, while also enabling them to buy products, sell as vendors, and place ads within an integrated marketplace. The goal was to design a seamless experience that brings messaging, shopping, and selling together in one intelligent platform.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "6 months",
        image: assets.smashchat_banner,
    },
    {
        id: 4,
        name: "SmashFood",
        overview:
            "SmashFood is a hybrid food-tech platform that allows users to order meals from restaurants and book private chefs for home dining experiences. The goal of this project was to design an intuitive mobile experience that combines everyday food delivery convenience with premium, on-demand private chef services.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "6 months",
        image: assets.smashfood_banner,
    },
    {
        id: 5,
        name: "Smashwise",
        overview:
            "SmashWise is a multi-category e-commerce app that allows users to order items across a wide range of categories—including electronics, groceries, fashion, home essentials, beauty products, and more. The project goal was to design an intuitive, fast, and scalable shopping experience that helps users find anything they need in one place.",
        tags: ["Mobile App", "UI/UX Design", "Development"],
        duration: "4 months",
        image: assets.smashwise_banner,
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 },
    },
}

export default function ProjectCards() {
  const [activeTag, setActiveTag] = useState<"Mobile" | "Web" | "Branding">(
    "Mobile"
  )

  const projectsMap = {
    Mobile: mobileProjects,
    Web: webProjects,
    Branding: brandingProjects,
  }

  const activeProjects = projectsMap[activeTag]

  return (
    <section className="bg-[#FFF8F5] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <header className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Take a Look At Our Work
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl text-sm sm:text-base">
            Carefully crafted UI/UX design and modern development powering real-world products.
          </p>

          {/* FILTER */}
          <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
            {["Mobile", "Web", "Branding"].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag as any)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  activeTag === tag
                    ? "bg-orange-100 text-orange-700"
                    : "bg-white text-[#393838] hover:bg-orange-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-20 sm:space-y-24 md:space-y-28"
          >
            {activeProjects.map((p) => (
              <motion.div
                key={p.id}
                variants={cardVariants}
                className="flex flex-col gap-8 sm:gap-10"
              >
                {/* IMAGE */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[380px] md:min-h-[520px] w-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* CONTENT */}
                <div className="space-y-6">

                  {/* TITLE + DURATION */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <h3
                      className={`
                        font-bold
                        text-xl sm:text-2xl md:text-3xl
                        ${projectNameColors[p.name] ?? "text-gray-900"}
                      `}
                    >
                      {p.name}
                    </h3>

                    <span className="text-sm text-gray-500">
                      Duration → {p.duration}
                    </span>
                  </div>

                  {/* OVERVIEW */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-400 min-w-[110px]">
                      Overview →
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {p.overview}
                    </p>
                  </div>

                  {/* TAGS + LINKS */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 pt-2">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {p.tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-[#F2E5D5] text-black text-xs sm:text-sm font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* LINKS */}
                    {activeTag === "Web" && (
                      <Link
                        href="#"
                        className="text-orange-600 font-medium flex items-center gap-2 hover:text-orange-700"
                      >
                        Visit website
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ----------------------------- CTA ----------------------------- */}
      <div className="max-w-7xl mx-auto bg-[#5B6B32] mt-20 sm:mt-24 rounded-3xl md:rounded-[48px]
        px-6 sm:px-10 py-12 sm:py-16
        flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10">
        
        <div className="text-white max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Ready To Build Something Amazing
          </h2>
          <p className="text-white/80 mt-4 text-sm sm:text-lg">
            Let’s bring your ideas to life with beautiful design and powerful technology.
          </p>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
          Start a Project <Rocket className="w-5 h-5" />
        </button>
      </div>    
    </section>
  )
}

