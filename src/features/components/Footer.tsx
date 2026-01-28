import Link from "next/link"
import Image from "next/image"
import { assets } from "../../../assets/assets"

const companyLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
]
const supportLinks = ["Blogs", "Contact", "Privacy Policy"]

const socialLinks = [
    { icon: assets.facebook_icon, alt: 'Facebook', href: '#' },
    { icon: assets.linkedin_icon, alt: 'LinkedIn', href: '#' },
    { icon: assets.instagram_icon, alt: 'Instagram', href: '#' },
    { icon: assets.twitter_icon, alt: 'Twitter / X', href: '#' },
]

const brands = [
    {
        name: "Smash Technology",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashTechnology_logo}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded-full"
                />
            </div>
        ),
        text: (
            <>
                <span className="text-orange-500 font-bold text-xl">Smash</span>
                <span className="text-white font-bold text-xl"> Technology</span>
            </>
        )
    },
    {
        name: "Qiimeet",
        icon: (
            <div className="justify-center">
                <Image
                    src={assets.Qiimeet_logo}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full "
                />
            </div>
        ),
    },
    {
        name: "Ridesmash",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.ridesmash}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">Ridesmash</span>
    },
    {
        name: "SmashInvoice",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashTechnology_logo}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashInvoice</span>
    },
    {
        name: "Smash Travels",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashTravels_logo}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">Smash Travels</span>
    },
    {
        name: "Smash Mail",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashMail_logo}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashMail</span>
    },
    {
        name: "Smash chat",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashchat}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full "
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashChat</span>
    },
    {
        name: "Paradise Estate",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.paradise}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">Paradise Estate</span>
    },
    {
        name: "Smash Food",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashfood}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashFood</span>
    },
    {
        name: "Smash Logistics",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashLogistics_logo}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashLogistics</span>
    },
    {
        name: "Smash Wise",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashwise}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashWise</span>
    },
    {
        name: "Smash Apartments",
        icon: (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image
                    src={assets.smashApartment}
                    alt=''
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
        ),
        text: <span className="text-white font-bold text-2xl">SmashApartments</span>
    }

]

export const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Logo */}
                    <div>
                        <Link href="/" className="flex items-center">
                            <div className="w-44 h-14 relative">
                                <Image src={assets.Logo} alt="SmashTechHub" fill className="object-contain" />
                            </div>
                        </Link>

                        <p className="text-gray-400 text-base leading-relaxed mb-8">
                            Empowering Your Projects.<br />
                            Enhancing Your Success. Every Step<br />
                            of the Way.
                        </p>

                        <div className="flex gap-4">
                            {socialLinks.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    aria-label={s.alt}
                                    className="group w-10 h-10 bg-white/10 rounded-lg
                 flex items-center justify-center
                 hover:bg-orange-500 transition"
                                >
                                    <Image
                                        src={s.icon}
                                        alt={s.alt}
                                        width={18}
                                        height={18}
                                        className="object-contain transition-transform duration-300
                   group-hover:scale-110"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Company</h4>

                        <ul className="space-y-4 text-gray-400">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-white transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            {supportLinks.map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 border border-white/10">
                        <h3 className="text-base font-bold mb-4">
                            Subscribe to our newsletter to get latest and juicy offers
                        </h3>
                        <div className="space-y-3">
                            <input
                                placeholder="Enter your email"
                                className="w-full bg-gray-800 border border-white/10 rounded-full px-5 py-3 text-sm"
                            />
                            <button className="w-full bg-orange-500 hover:bg-orange-600 rounded-full py-3 font-semibold">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* BRANDS MARQUEE */}
                <div className="mb-16 overflow-hidden">
                    <div className="relative w-full">

                        <div className="flex w-max animate-marquee gap-16">
                            {[...brands, ...brands].map((brand, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 min-w-max hover:scale-105 transition"
                                >
                                    {brand.icon}
                                    {brand.text}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>


                {/* BOTTOM */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2025 SmashTechHub. All rights reserved.
                    </p>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                        Terms of Services
                    </a>
                </div>

            </div>
        </footer>
    )
}
