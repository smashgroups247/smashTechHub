'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from "../../../../assets/assets"

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
}

const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
}

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    })
    const [charCount, setCharCount] = useState(0)

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value
        if (text.length <= 200) {
            setFormData({ ...formData, message: text })
            setCharCount(text.length)
        }
    }

    return (
        <motion.section
            className="py-20 bg-[#FFF8F5]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
        >
            <div className="max-w-7xl mx-auto px-6 bg-white py-10 rounded-3xl">
                
                {/* Header */}
                <motion.div variants={fadeUp} className="text-left mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        We'd Love To <span className="text-orange-500">Hear</span> From{' '}
                        <span className="text-orange-500">You</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Fill out the form below and our team will respond within 24 hours.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Form */}
                    <motion.div
                        variants={fadeLeft}
                        className="bg-[#FAFAFA] rounded-3xl p-8 lg:p-10"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h3>

                        <form className="space-y-6">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500"
                            />

                            <select
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Select a service</option>
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App Development</option>
                                <option value="ui-ux-design">UI/UX Design</option>
                                <option value="consulting">Consulting</option>
                            </select>

                            <textarea
                                rows={5}
                                placeholder="Brief details about your project"
                                value={formData.message}
                                onChange={handleMessageChange}
                                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 resize-none"
                            />
                            <div className="text-right text-sm text-gray-500">
                                {charCount}/200
                            </div>

                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold">
                                Submit
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        variants={fadeRight}
                        className="space-y-8"
                    >
                        <div className="bg-[#FAFAFA] rounded-3xl p-8 space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Contact Info
                            </h3>

                            {[
                                { icon: Phone, title: 'Phone', text: '+2349097403297' },
                                { icon: Mail, title: 'Email', text: 'hello@smashtechhub.com' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className="flex items-start gap-3 bg-white rounded-2xl p-4"
                                >
                                    <item.icon className="text-orange-500" />
                                    <div>
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-gray-600">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={fadeUp} className="bg-gray-50 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                            <div className="flex gap-2 items-center">
                                <Clock className="text-orange-500" />
                                <span className="font-bold">Mon–Fri: 8AM – 5PM</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <motion.div
                variants={fadeUp}
                className="max-w-7xl mx-auto bg-[#556B2F] mt-20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
            >
                <div>
                    <h3 className="text-3xl md:text-4xl text-white font-medium mb-2">
                        Let’s Collaborate
                    </h3>
                    <p className="text-white/80">
                        Big or small, your idea deserves exceptional execution.
                    </p>
                </div>

                <Image
                    src={assets.handshake}
                    alt="Handshake"
                    width={180}
                    height={180}
                    className="hover:-translate-y-1 transition-transform duration-300"
                />
            </motion.div>
        </motion.section>
    )
}

export default ContactForm
