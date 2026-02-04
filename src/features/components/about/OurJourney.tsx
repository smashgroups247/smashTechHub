'use client'

import Image from 'next/image'
import React from 'react'
import { assets } from "../../../../assets/assets"
import { motion } from "framer-motion"

function OurJourney() {
    return (
        <section className="py-20 bg-[#FFF8F5]">
            <div className="max-w-screen mx-auto px-6">

                {/* Heading with Arrow */}
                <motion.div 
                    className="mb-10 flex items-center gap-6 relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                        Our Journey
                    </h2>

                    <motion.div
                        initial={{ rotate: -20, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={assets.twirlyArrow}
                            alt="Decorative arrow"
                            className="w-14 sm:w-20 md:w-32 lg:w-36 object-contain"
                        />
                    </motion.div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* Left Side - Image */}
                    <motion.div
                        className="relative flex justify-center lg:justify-start"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden
                            w-full max-w-[420px] md:max-w-[480px] lg:max-w-[520px]">
                            <Image
                                src={assets.ourJourney_img}
                                alt="Designer working on laptop"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side - Text Content */}
                    <motion.div
                        className="space-y-8 lg:-mt-16"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            What started as a small group of creators with a shared love for great design has grown into a full-scale digital agency trusted by clients across industries. Over the years, we've worked with startups, enterprises, and innovators—helping them shape ideas into products that people love.
                        </p>

                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            Our approach is simple: understand the problem, design with purpose, and build with precision. We're not just creating websites and apps—we're crafting experiences that connect, convert, and endure.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default OurJourney
