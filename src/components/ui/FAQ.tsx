'use client';

import { Rocket } from 'lucide-react';
import { useState } from 'react';


// FAQ data structure
interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

// FAQ data
const faqData: FAQItem[] = [
    {
        id: 1,
        question: 'Can I request a plan tailored to my needs?',
        answer: 'Absolutely! We understand that every project is unique. Our Custom Plan is designed specifically for clients who need tailored solutions. Simply reach out to us with your requirements, and we\'ll create a personalized package that fits your vision, timeline, and budget.',
    },
    {
        id: 2,
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer flexible payment plans to make our services more accessible. You can choose to pay in installments based on project milestones. Contact us to discuss a payment structure that works best for you.',
    },
    {
        id: 3,
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary depending on the scope and complexity. A simple website can take 7-14 days, while more complex web applications may take 4-12 weeks. We provide a detailed timeline during the initial consultation and keep you updated throughout the development process.',
    },
    {
        id: 4,
        question: 'Can you maintain or update my website after delivery?',
        answer: 'Yes! We offer ongoing maintenance and support packages to keep your website running smoothly. This includes regular updates, security patches, content changes, and technical support. We\'re here to ensure your digital presence stays fresh and functional.',
    },
    {
        id: 5,
        question: 'Do I own my files after project completion?',
        answer: 'Absolutely! Once the project is completed and payment is finalized, you receive full ownership of all source files, designs, and code. We believe in complete transparency and ensuring you have full control over your digital assets.',
    },
];

// Reusable FAQItem component
function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
    return (
        <div
            className={`bg-[#FFFFFF] rounded-2xl p-6 transition-all duration-300 ease-in-out ${isOpen ? 'shadow-md' : 'hover:bg-gray-100'
                }`}
        >
            {/* Question Row */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 text-left"
                aria-expanded={isOpen}
            >
                {/* Index Number */}
                <span className="text-[#393838] font-medium text-2xl flex-shrink-0 w-8">
                    {String(item.id).padStart(2, '0')}
                </span>
                {/* Question Text */}
                <span className="flex-grow text-[#393838] font-semibold text-base md:text-lg">
                    {item.question}
                </span>

                {/* Chevron Icon */}
                <svg
                    className={`w-6 h-6 text-black flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Answer (Expandable) */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pl-12 pr-10">
                    <p className="text-gray-600 text-base leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-20 px-6 bg-[#FFF8F5]">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-16">
    {/* Main Heading */}
    <div className="relative inline-block">
        <span className="absolute -top-4 -left-6 bg-[#A2FF76] text-green-800 text-sm font-medium px-4 py-1 rounded-full -rotate-20">
            FAQ
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Frequently Asked Questions
        </h2>
    </div>
</div>

                {/* FAQ Accordion List */}
                <div className="space-y-4 mb-16">
                    {faqData.map((item) => (
                        <FAQAccordionItem
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => handleToggle(item.id)}
                        />
                    ))}
                </div>

                {/* CTA Banner */}
                <div className="bg-[#556B2F] to-[#4A6B49] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                    {/* CTA Content */}
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-medium text-white mb-3">
                            Ready To Build Something Amazing
                        </h3>
                        <p className="text-white text-base font-light md:text-lg leading-relaxed max-w-2xl">
                            Let's bring your ideas to life with beautiful design and powerful technology.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button className="hidden md:flex items-center gap-2 bg-[#F24F04] hover:bg-orange-600 text-white px-6 py-3 rounded-full">
                        Start a Project <Rocket className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
