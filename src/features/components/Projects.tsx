"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { assets } from "../../../assets/assets";
import Link from "next/link";
import { motion } from "framer-motion";

const Projects = () => {
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2 Columns on desktop, 1 column on tablet/mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="space-y-16 lg:space-y-20">

            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="relative inline-block">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                  Take a Look At Our <br /> Recent Work
                </h2>
                <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-[#A2FF76] text-black text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full rotate-12">
                  Projects
                </div>
              </div>
              <p className="text-gray-400 text-base sm:text-lg mt-4 sm:mt-6 max-w-md">
                A glimpse into the ideas we've brought to life.
              </p>
            </motion.div>

            {/* Projects Left Column */}
            {[
              { img: assets.Banner1, title: "Ridesmash", desc: "Get a safe and affordable ride anytime, anywhere with our user-friendly ride-hailing platform.", link: "https://www.ridesmash.com/" },
              { img: assets.Smashchat2, title: "SmashChat", desc: "A communication & social commerce app for chatting, calling and buying products.", link: "https://smashchat.org/" }
            ].map((proj, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: idx * 0.2 } } }}
              >
                <div className="relative w-full rounded-3xl aspect-[4/3] overflow-hidden">
                  <Image src={proj.img} alt={proj.title} fill className="object-contain" priority />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mt-4 sm:mt-6">{proj.title}</h3>
                <p className="text-gray-400 mt-2 sm:mt-3 max-w-md">{proj.desc}</p>
                <Link
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 text-orange-500 flex items-center gap-2 font-semibold hover:text-orange-600 transition"
                >
                  View <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
              </motion.div>
            ))}

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-16 lg:space-y-20">
            {[
              { img: assets.Qiimeet2, title: "Qiimeet", desc: "An app designed to help people form meaningful connections through smart matching.", link: "https://www.qiimeet.com/" },
              { img: assets.Smashfood1, title: "SmashFood", desc: "A hybrid food-tech platform for ordering meals and booking private chefs.", link: "https://www.smashfood247.com/" }
            ].map((proj, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: idx * 0.2 } } }}
              >
                <div className="relative w-full rounded-3xl aspect-[4/3] overflow-hidden">
                  <Image src={proj.img} alt={proj.title} fill className="object-contain" priority />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mt-4 sm:mt-6">{proj.title}</h3>
                <p className="text-gray-400 mt-2 sm:mt-3 max-w-md">{proj.desc}</p>
                <Link
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 text-orange-500 flex items-center gap-2 font-semibold hover:text-orange-600 transition"
                >
                  View <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center lg:justify-end mt-8"
        >
          <Link
            href="/portfolio"
            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold flex items-center gap-3 transition"
          >
            View Portfolio
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
