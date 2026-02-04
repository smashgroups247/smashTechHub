"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { assets } from "../../../assets/assets"
import { motion } from "framer-motion"

export default function Process() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const stepsRef = useRef<HTMLDivElement[]>([])
    const [progress, setProgress] = useState(0)
    const [active, setActive] = useState(0)

    const steps = [
        { number: "01", title: "Discovery & Strategy", description: "We understand your goals, users, and product vision to build a solid foundation.", image: assets.work1, side: "left" },
        { number: "02", title: "Creative Design", description: "We turn ideas into visual concepts, refining them into polished, user-friendly designs.", image: assets.work2, side: "right" },
        { number: "03", title: "Development", description: "Our developers bring designs to life using modern technologies and clean, scalable code.", image: assets.work3, side: "left" },
        { number: "04", title: "Testing & Launching", description: "We test rigorously to ensure performance, accessibility, and quality then launch smoothly.", image: assets.work4, side: "right" },
        { number: "05", title: "Ongoing Support", description: "We provide continuous optimization, updates, and maintenance to ensure long-term success.", image: assets.work5, side: "left" },
    ]

    useEffect(() => {
        const onScroll = () => {
            if (!sectionRef.current) return
            const section = sectionRef.current.getBoundingClientRect()
            const view = window.innerHeight

            const pct = Math.min(Math.max((view - section.top) / section.height, 0), 1)
            setProgress(pct * 100)

            stepsRef.current.forEach((el, i) => {
                if (!el) return
                const r = el.getBoundingClientRect()
                if (r.top < view * 0.55) setActive(i)
            })
        }

        window.addEventListener("scroll", onScroll)
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const stepVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    }

    return (
        <section ref={sectionRef} className="py-24 bg-[#FFF8F5] relative">
            <div className="max-w-screen mx-auto px-6 relative">
                <div className="absolute -top-10 left-0 bg-[#A2FF76] text-black text-sm font-semibold px-4 py-1.5 rounded-full -rotate-12">
                    Process
                </div>
                <motion.h2
                    className="text-5xl font-bold mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    How We Work
                </motion.h2>

                <div className="relative">
                    {/* Base line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-200 -translate-x-1/2 hidden md:block" />

                    {/* Animated orange line */}
                    <div
                        className="absolute left-1/2 top-0 w-[6px] bg-orange-500 -translate-x-1/2 hidden md:block transition-all duration-75"
                        style={{ height: `${progress}%` }}
                    />

                    <div className="space-y-32">
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                ref={(el: HTMLDivElement | null) => { if (el) stepsRef.current[i] = el }}
                                className="grid md:grid-cols-2 gap-12 items-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={stepVariants}
                                transition={{ delay: i * 0.2 }}
                            >
                                {s.side === "left" && (
                                    <motion.div
                                        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
                                        variants={imageVariants}
                                    >
                                        <Image src={s.image} alt={s.title} fill className="object-cover" />
                                    </motion.div>
                                )}

                                <div className="flex gap-6">
                                    <div
                                        className={`w-14 h-14 flex items-center justify-center rounded-full border-2 font-bold transition-all
                                            ${active >= i
                                                ? "bg-orange-500 text-white border-orange-500"
                                                : "bg-white text-gray-400 border-gray-300"
                                            }`}
                                    >
                                        {s.number}
                                    </div>

                                    <div>
                                        <h3 className="text-4xl font-bold mb-4">{s.title}</h3>
                                        <p className="text-gray-600 max-w-md">{s.description}</p>
                                    </div>
                                </div>

                                {s.side === "right" && (
                                    <motion.div
                                        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
                                        variants={imageVariants}
                                    >
                                        <Image src={s.image} alt={s.title} fill className="object-cover" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
