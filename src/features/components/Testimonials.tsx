'use client'

import { Play, ChevronLeft, ChevronRight, Rocket } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { assets } from "../../../assets/assets"
import { motion, AnimatePresence } from "framer-motion"

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const testimonials = [
        {
            quote: "Smashtechhub has empowered my staff to serve our customers better...",
            name: "Helen Ibe",
            position: "CEO Paywise",
            media: assets.testimonial_vid_1,
        },
        {
            quote: "Smashtechhub transformed how we manage customer payments.",
            name: "Daniel Okoye",
            position: "Founder PayPro",
            media: assets.testimonial_vid_1,
        },
        {
            quote: "Our customer support workflow is now 3x faster.",
            name: "Sarah Bello",
            position: "COO FastPay",
            media: assets.testimonial_vid_1,
        },
        {
            quote: "Smashtechhub helped us scale without stress.",
            name: "Michael Ade",
            position: "CTO Swiftly",
            media: assets.testimonial_vid_1,
        },
    ]

    const clientImages = [
        assets.testimonial_1,
        assets.testimonial_2,
        assets.testimonial_3,
        assets.testimonial_4,
    ]

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setCurrentIndex((prev) =>
            prev - 1 < 0 ? testimonials.length - 1 : prev - 1
        )
    }

    return (
        <>
            {/* TESTIMONIALS */}
            <section className=" py-24 rounded-[48px] relative">
                <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-[#F4E9DA] rounded-t-[48px]">

                    {/* LEFT */}
                    <div className="relative">
                        <h2 className="text-[40px] font-bold text-[#2E2E2E] leading-tight">
                            Hear From Our Clients
                        </h2>

                        <div className="absolute -top-8 right-0 bg-[#CCFF00] text-black text-sm font-bold px-4 py-1 rounded-full rotate-[12deg]">
                            Testimonials
                        </div>

                        <p className="mt-10 text-[#333] text-xl leading-relaxed max-w-xl">
                            {testimonials[currentIndex].quote}
                        </p>

                        <div className="mt-10 w-full h-[1px] bg-black/20"></div>

                        <div className="mt-8">
                            <h4 className="text-2xl font-bold text-black">
                                {testimonials[currentIndex].name}
                            </h4>
                            <p className="text-black/60">
                                {testimonials[currentIndex].position}
                            </p>
                        </div>

                        {/* Arrows */}
                        <div className="mt-10 flex gap-4">
                            <button
                                onClick={prev}
                                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={next}
                                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative">
                        {/* Avatars */}
                        <div className="absolute -top-20 right-0 flex -space-x-0 z-10">
                            {clientImages.map((img, i) => {
                                const isActive = i === currentIndex
                                return (
                                    <motion.div
                                        key={i}
                                        className="relative w-16 h-16 rounded-full overflow-hidden"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: isActive ? 1.1 : 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Client ${i + 1}`}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                        {/* Partial orange ring overlay */}
                                        {isActive && (
                                            <svg
                                                className="absolute top-0 left-0 w-full h-full"
                                                viewBox="0 0 64 64"
                                            >
                                                <circle
                                                    cx="32"
                                                    cy="32"
                                                    r="30"
                                                    stroke="orange"
                                                    strokeWidth="4"
                                                    fill="none"
                                                    strokeDasharray="60"
                                                    strokeDashoffset="0"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Media / Placeholder */}
                        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-gray-300 flex items-center justify-center w-full h-[400px] md:h-[350px] lg:h-[350px]">
                            {testimonials[currentIndex].media ? (
                                <Image
                                    src={testimonials[currentIndex].media}
                                    alt="Testimonial"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-gray-700 text-xl font-semibold">
                                    Placeholder
                                </span>
                            )}

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                                    <Play className="w-10 h-10 text-orange-500 ml-1" fill="currentColor" />
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="max-w-6xl mx-auto bg-[#5B6B32] py-20  rounded-b-[48px] flex flex-col md:flex-row justify-between items-center gap-10 px-10">
                    <div className="text-white">
                        <h2 className="text-5xl font-bold">
                            Ready To Build Something Amazing
                        </h2>
                        <p className="text-white/80 mt-4 text-lg">
                            Let’s bring your ideas to life with beautiful design and powerful technology.
                        </p>
                    </div>

                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium mt-2 flex items-center justify-center gap-2">
                        Start a Project <Rocket className="w-5 h-5" />
                    </button>
                </div>
                
            </section>

            {/* CTA */}
            <section className=" -mt-10">
                
            </section>
        </>
    )
}
