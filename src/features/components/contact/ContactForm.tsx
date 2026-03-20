'use client'

import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from "../../../../assets/assets"
import { useContactForm } from "../../../hooks/useContactForm"

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
    const { form, onSubmit, isSubmitting, isSuccess } = useContactForm();
    const { register, formState: { errors }, watch } = form;
    
    const projectDetails = watch("projectDetails") || "";
    const charCount = projectDetails.length;

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
                        className="bg-[#FAFAFA] rounded-3xl p-8 lg:p-10 relative overflow-hidden"
                    >
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-0 z-10 bg-[#FAFAFA] flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">
                                        We’ve received your request. Our team will reach out shortly.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h3>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    {...register("fullName")}
                                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 outline-none transition-colors ${
                                        errors.fullName ? "border-2 border-red-500 focus:ring-red-200" : "focus:ring-orange-500 border border-transparent"
                                    }`}
                                    disabled={isSubmitting}
                                    aria-invalid={errors.fullName ? "true" : "false"}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 outline-none transition-colors ${
                                        errors.email ? "border-2 border-red-500 focus:ring-red-200" : "focus:ring-orange-500 border border-transparent"
                                    }`}
                                    disabled={isSubmitting}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    {...register("serviceOfInterest")}
                                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 outline-none transition-colors ${
                                        errors.serviceOfInterest ? "border-2 border-red-500 focus:ring-red-200" : "focus:ring-orange-500 border border-transparent"
                                    }`}
                                    disabled={isSubmitting}
                                    aria-invalid={errors.serviceOfInterest ? "true" : "false"}
                                >
                                    <option value="">Select a service</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Consulting">Consulting</option>
                                </select>
                                {errors.serviceOfInterest && (
                                    <p className="text-red-500 text-sm mt-1">{errors.serviceOfInterest.message}</p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    rows={5}
                                    placeholder="Brief details about your project"
                                    {...register("projectDetails")}
                                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 outline-none resize-none transition-colors ${
                                        errors.projectDetails ? "border-2 border-red-500 focus:ring-red-200" : "focus:ring-orange-500 border border-transparent"
                                    }`}
                                    disabled={isSubmitting}
                                    aria-invalid={errors.projectDetails ? "true" : "false"}
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <div className="flex-1">
                                        {errors.projectDetails && (
                                            <p className="text-red-500 text-sm">{errors.projectDetails.message}</p>
                                        )}
                                    </div>
                                    <div className={`text-sm ${charCount > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {charCount}/500
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
                            >
                                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                                {isSubmitting ? "Submitting..." : "Submit"}
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
