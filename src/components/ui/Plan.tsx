'use client';

import { useState } from 'react';

// Plan data structure
interface PlanFeature {
    text: string;
    included: boolean;
}

interface PlanData {
    name: string;
    description: string;
    price: string | null;
    priceLabel?: string;
    features: string[];
    buttonText: string;
    highlighted?: boolean;
    bgColor: string;
}

// Category tabs
type Category = 'Website' | 'Web App' | 'Mobile App' | 'Branding';

const categories: Category[] = ['Website', 'Web App', 'Mobile App', 'Branding'];

// Plans data for Website category
// Plans data
const websitePlans: PlanData[] = [
    {
        name: 'Starter Plan',
        description: 'Best for small businesses and simple project',
        price: '₦150,000',
        features: [
            '1 page website',
            'Design',
            'Development',
            '7 days timeline',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Starter Plan',
        bgColor: 'bg-[#F0F9FD]',
    },
    {
        name: 'Professional Plan',
        description: 'Ideal for growing startups and mid-sized companies',
        price: '₦350,000',
        features: [
            '3 page website',
            'Design',
            'Development',
            '14 days timeline',
            '1 Free logo',
            'SEO',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Professional Plan',
        bgColor: 'bg-[#F6F9F1]',
    },
    {
        name: 'Business Plan',
        description: 'Perfect for larger organizations with advanced needs',
        price: '₦650,000',
        features: [
            '5 page website',
            'Design',
            'Development',
            '20 days timeline',
            '1 Free logo',
            'SEO',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Business Plan',
        bgColor: 'bg-[#F8F0E8]',
    },
    {
        name: 'Custom Plan',
        description: 'To be negotiated based on requested features',
        price: null,
        priceLabel: 'Contact us',
        features: [
            'Based on request',
            'Design',
            'Development',
            'Based on features',
            '1 Free logo',
            'SEO',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Custom Plan',
        highlighted: true,
        bgColor: 'bg-[#E7FFDB]',
    },
];

const webAppPlans: PlanData[] = [
    {
        name: 'Starter Plan',
        description: 'Best for small businesses and simple project',
        price: '₦300,000',
        features: [
            '1 page webapp',
            'Design',
            'Development',
            '7 days timeline',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Starter Plan',
        bgColor: 'bg-[#F0F9FD]',
    },
    {
        name: 'Professional Plan',
        description: 'Ideal for growing startups and mid-sized companies',
        price: '₦600,000',
        features: [
            '3 page webapp',
            'Design',
            'Development',
            '14 days timeline',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Professional Plan',
        bgColor: 'bg-[#F6F9F1]',
    },
    {
        name: 'Business Plan',
        description: 'Perfect for larger organizations with advanced needs',
        price: '₦800,000',
        features: [
            '5 page webapp',
            'Design',
            'Development',
            '20 days timeline',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Business Plan',
        bgColor: 'bg-[#F8F0E8]',
    },
    {
        name: 'Custom Plan',
        description: 'To be negotiated based on requested features',
        price: null,
        priceLabel: 'Contact us',
        features: [
            'Based on request',
            'Design',
            'Development',
            'Based on features',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Custom Plan',
        highlighted: true,
        bgColor: 'bg-[#E7FFDB]',
    },
];

const mobileAppPlans: PlanData[] = [
    {
        name: 'Starter Plan',
        description: 'Best for small businesses and simple project',
        price: '₦2,700,000',
        features: [
            'Required MVP pages',
            'Design',
            'Development',
            '2 months timeline',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Starter Plan',
        bgColor: 'bg-[#F0F9FD]',
    },
    {
        name: 'Custom Plan',
        description: 'To be negotiated based on requested features',
        price: null,
        priceLabel: 'Contact us',
        features: [
            'Based on request',
            'Design',
            'Development',
            'Based on features',
            '1 Free logo',
            '24/7 Customer Support',
        ],
        buttonText: 'Get Custom Plan',
        highlighted: true,
        bgColor: 'bg-[#E7FFDB]',
    },
];

const brandingPlans: PlanData[] = [
    {
        name: 'Starter Plan',
        description: 'Best for small businesses and simple project',
        price: '₦150,000',
        features: [
            '1 logo concept',
            '1 alternate logo',
            '3 color palette',
            '5 days timeline',
            'Brand Guideline',
            'PNG/JPEG/SVG/PDF',
        ],
        buttonText: 'Get Starter Plan',
        bgColor: 'bg-[#F0F9FD]',
    },
    {
        name: 'Professional Plan',
        description: 'Ideal for growing startups and mid-sized companies',
        price: '₦350,000',
        features: [
            '3 logo concept',
            '3 alternate logo',
            'Brand pattern & Icon set',
            '12 days timeline',
            'Brand Guideline',
            'Business card design',
        ],
        buttonText: 'Get Professional Plan',
        bgColor: 'bg-[#F6F9F1]',
    },
    {
        name: 'Business Plan',
        description: 'Perfect for larger organizations with advanced needs',
        price: '₦650,000',
        features: [
            '3 - 5 logo concepts',
            'Full logo suite',
            'Brand pattern & Elements',
            '20 days timeline',
            'Brand Guideline',
            'Stationary pack',
        ],
        buttonText: 'Get Business Plan',
        bgColor: 'bg-[#F8F0E8]',
    },
    {
        name: 'Custom Plan',
        description: 'To be negotiated based on requested features',
        price: null,
        priceLabel: 'Contact us',
        features: [
            'Based on request',
            'Based on request',
            'Based on request',
            'Based on features',
            'Based on request',
            'Based on request',
        ],
        buttonText: 'Get Custom Plan',
        highlighted: true,
        bgColor: 'bg-[#E7FFDB]',
    },
];

const plans: Record<Category, PlanData[]> = {
    'Website': websitePlans,
    'Web App': webAppPlans,
    'Mobile App': mobileAppPlans,
    'Branding': brandingPlans,
};

// Reusable PlanCard component
function PlanCard({ plan }: { plan: PlanData }) {
    return (
        <div
            className={`${plan.bgColor} rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
        >
            {/* Plan Name */}
            <h3 className="text-2xl font-semibold text-[#393838] mb-3">{plan.name}</h3>


            {/* Description */}
            <p className="text-[#393838] lg:text-[15px] sm:text-xs text-sm font-light mt-2 mb-8 leading-tight">
                {plan.description}
            </p>

            {/* Price */}
            <div className="mb-8">
                {plan.price ? (
                    <p className="text-4xl font-semibold text-[#393838]">{plan.price}</p>
                ) : (
                    <p className="text-3xl font-semibold text-[#393838]">{plan.priceLabel}</p>
                )}

            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">

                        <span className="text-[#393838] text-lg leading-relaxed">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <a href="mailto:hello@smashtechhub.com
                ?subject=Business%20Website%20Plan%20Inquiry
                &body=Hi,%0D%0A%0D%0A
                I’m%20interested%20in%20the%20Business%20Website%20Plan,%20built%20for%20organizations%20that%20need%20performance,%20scale,%20and%20flexibility.%0D%0A%0D%0A
                Plan%20highlights:%0D%0A
                -5-page%20website%0D%0A
                -Custom%20design%20%26%20development%0D%0A
                -1%20free%20logo%0D%0A
                -SEO%20optimization%0D%0A
                -20-day%20delivery%20timeline%0D%0A
                -24/7%20customer%20support%0D%0A%0D%0A
                Price:%20₦650,000%0D%0A%0D%0A
                Looking%20to%20discuss%20timelines,%20content,%20and%20next%20steps.%0D%0A%0D%0A
                Best%20regards,"
                >
                <button className="w-full bg-[#F24F04] hover:bg-[#FF5722] text-white font-light py-3 px-6 rounded-full transition-all duration-300 hover:shadow-md active:scale-[0.98]">
                    {plan.buttonText}
                </button>
            </a>
        </div>
    );
}

export default function Plan() {
    const [activeCategory, setActiveCategory] = useState<Category>('Website');

    return (
        <section className="py-20 px-6 mt-10 bg-[#FFF8F5]">
            <div className="max-w-screen mx-auto">
                {/* Header Section */}
                <div className="mb-16">
                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#393838] mb-4 leading-tight">
                        Choose a Plan That <span className="relative inline-block">
                            Fits
                            <span className="absolute md:flex hidden -top-3 -right-10 bg-[#D2F801] text-[#393838] text-sm font-normal px-3 py-1 rounded-full rotate-17">
                                Projects
                            </span>
                        </span> <br></br>
                        Your Vision
                    </h2>

                    {/* Subtext */}
                    <p className="text-[#393838] text-lg md:text-xl max-w-4xl leading-tight tracking-tight font-light">
                        Each package is designed to deliver quality work, clear timelines,
                        and measurable <br className='hidden md:flex'></br> results. No hidden fees. No surprises.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-8 py-3 hover: rounded-full font-medium text-base transition-all duration-300 ${activeCategory === category
                                ? 'bg-[#FED5C3]/20 text-[#F24F04]'
                                : ' text-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                    {plans[activeCategory].map((plan, index) => (
                        <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex">
                            <PlanCard plan={plan} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
