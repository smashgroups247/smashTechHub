'use client'

import { Instagram } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { assets } from "../../../../assets/assets"

export function Team() {
    const [selectedMember, setSelectedMember] = useState(0)

    const team = [
        {
            name: 'Valentine',
            role: 'Product & Project Manager',
            nameColor: 'text-orange-500',
            image: assets.pm_img,
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Segun',
            role: 'Software Engineer Lead',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Stephen',
            role: 'Product Designer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Isreal',
            role: 'Frontend Engineer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Joshua',
            role: 'Product Designer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Chris',
            role: 'Brand Designer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Anthony',
            role: 'Fullstack Developer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Merit',
            role: 'Graphics Designer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        },
        {
            name: 'Tobi',
            role: 'Product Designer',
            nameColor: 'text-gray-900',
            image: '',
            instagram: '#',
            twitter: '#'
        }
    ]

    return (
        <section className="py-20 bg-[#FFF8F5]">
            <div className="max-w-screen mx-auto px-6">
                {/* Header */}
                <div className="mb-16">
                    <div className='relative'>

                        <span className=" absolute -top-10 left-6 bg-[#A2FF76] text-black text-sm font-semibold px-4 py-1.5 rounded-full -rotate-12">
                        Team
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                        The People Behind The Work
                    </h2>

                    </div>
                    
                    
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Team List */}
                    <div className="space-y-0">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setSelectedMember(index)}
                                className={`group flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer transition-all duration-300 ${selectedMember === index ? 'bg-gray-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-8 flex-1">
                                    {/* Name */}
                                    <h3 className={`text-2xl md:text-3xl font-bold ${member.nameColor} min-w-[140px]`}>
                                        {member.name}
                                    </h3>

                                    {/* Role */}
                                    <p className="text-gray-600 text-lg">
                                        {member.role}
                                    </p>
                                </div>

                                {/* Social Icons */}
                                <div className="flex items-center gap-3">
                                    <a
                                        href={member.instagram}
                                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Instagram className="w-5 h-5 text-gray-700" />
                                    </a>
                                    <a
                                        href={member.twitter}
                                        className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Featured Image */}
                    <div className="relative lg:sticky lg:top-24 h-fit flex justify-center">
                        <div className="relative w-[250px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-[6deg]">
                            <Image
                                src={team[selectedMember].image}
                                alt={team[selectedMember].name}
                                fill
                                className="object-cover -rotate-[4deg] rotate-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
