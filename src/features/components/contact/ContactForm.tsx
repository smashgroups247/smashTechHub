
'use client'

import { Phone, Mail, MapPin, Clock, Rocket } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { assets } from "../../../../assets/assets"

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
        <section className="py-20 bg-[#FFF8F5]">
            <div className="max-w-7xl mx-auto px-6 bg-white py-10 px-10 rounded-3xl">
                {/* Header */}
                <div className="text-left mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        We'd Love To <span className="text-orange-500">Hear</span> From <span className="text-orange-500">You</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Fill out the form below and our team will respond within 24 hours.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Form */}
                    <div className="bg-[#FAFAFA] rounded-3xl p-8 lg:p-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h3>

                        <form className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Service Dropdown */}
                            <div>
                                <label htmlFor="service" className="block text-gray-700 mb-2 font-medium">
                                    Service of Interest
                                </label>
                                <select
                                    id="service"
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    className="w-full px-4 py-3 bg-white  rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 1rem center'
                                    }}
                                >
                                    <option value="">Select a service</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="mobile-app">Mobile App Development</option>
                                    <option value="ui-ux-design">UI/UX Design</option>
                                    <option value="consulting">Consulting</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                                    Brief details about your project
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Text here"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleMessageChange}
                                    maxLength={200}
                                    className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                />
                                <div className="text-right text-sm text-gray-500 mt-2">
                                    {charCount}/200
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="space-y-8">
                        {/* Contact Info Section */}
                        <div className='bg-[#FAFAFA] rounded-3xl p-8'>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Contact Info
                            </h3>

                            <div className="space-y-6">
                                {/* Phone & Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-3xl p-4">
                                    {/* Phone */}
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                            <p className="text-gray-600">+2349097403297</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                            <p className="text-gray-600">hello@smashtechhub.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Address 1 */}
                                <div className="flex items-start gap-3 bg-white rounded-3xl p-4">
                                    <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                                        <p className="text-gray-600">
                                            2 King Jaja Street, Works & Housing, 3rd Avenue, Gwarinpa, Abuja
                                        </p>
                                    </div>
                                </div>

                                {/* Address 2 */}
                                <div className="flex items-start gap-3 bg-white rounded-3xl p-4">
                                    <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                                        <p className="text-gray-600">
                                            1, Alh. Koloworola Crescent, Off Awolowo Way, by Balogun Bus Stop, Behind Lagoon Hospital, Ikeja, Lagos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours Section */}
                        <div className="bg-gray-50 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Business Hours
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-white rounded-3xl p-4">
                                {/* Monday - Friday */}
                                <div>
                                    <p className="text-gray-700 font-medium mb-2">Monday - Friday</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-orange-500" />
                                        <span className="font-bold text-gray-900">8:00 AM - 5:00 PM</span>
                                    </div>
                                </div>

                                {/* Saturday & Sunday */}
                                <div>
                                    <p className="text-gray-700 font-medium mb-2">Saturday & Sunday</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-orange-500" />
                                        <span className="font-bold text-gray-900">Closed</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                We respond to messages even outside these hours because creativity doesn't sleep.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="max-w-7xl mx-auto bg-[#556B2F] rounded-[32px] md:rounded-[48px] mt-10 md:mt-24 px-6 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10"  >
                {/* Text */}
                <div className="text-white max-w-xl">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        Let’s Collaborate
                    </h2>

                    <p className="text-white/80  text-base sm:text-lg">
                        Big or small, your idea deserves exceptional execution.
                    </p>
                </div>

                {/* Image CTA */}
                <Image
                    src={assets.handshake}
                    alt="Start a Project"
                    width={50}
                    height={50}
                    priority
                    className="
      rounded-full
      w-32 sm:w-36 md:w-44
      h-auto
      self-start md:self-auto
      transition-transform duration-300
      hover:-translate-y-1
    "
                />
            </div>

        </section>
    )
}

export default ContactForm;