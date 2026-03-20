'use client';

import { useState } from 'react';
import { usePricingPlans } from '@/services/pricing';
import { Check } from 'lucide-react';

// Category tabs
type Category = 'Website' | 'Web App' | 'Mobile App' | 'Branding';
const categories: Category[] = ['Website', 'Web App', 'Mobile App', 'Branding'];

const bgColors = ['bg-[#F0F9FD]', 'bg-[#F6F9F1]', 'bg-[#F8F0E8]', 'bg-[#E7FFDB]'];

// Reusable PlanCard component
function PlanCard({ plan, bgColor, isHighlighted }: { plan: any; bgColor: string; isHighlighted: boolean }) {
    return (
        <div
            className={`${bgColor} rounded-3xl p-8 flex flex-col w-full h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative`}
        >
            
            {/* Plan Name */}
            <h3 className="text-2xl font-semibold text-[#393838] mb-3">{plan.title}</h3>

            {/* Description */}
            <p className="text-[#393838] lg:text-[15px] sm:text-xs text-sm font-light mt-2 mb-8 leading-tight h-10">
                {plan.description}
            </p>

            {/* Price */}
            <div className="mb-8">
                <p className="text-4xl font-semibold text-[#393838]">
                    {plan.price}
                    {plan.price !== 'Custom Pricing' && (
                        <span className="text-lg font-normal text-gray-500 ml-1">{plan.billing}</span>
                    )}
                </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-[#393838] text-lg leading-relaxed">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <button className="w-full bg-[#F24F04] hover:bg-[#FF5722] text-white font-light py-3 px-6 rounded-full transition-all duration-300 hover:shadow-md active:scale-[0.98] mt-auto">
                {plan.price === 'Custom Pricing' ? 'Contact Sales' : 'Get Started'}
            </button>
        </div>
    );
}

export default function Plan() {
    const [activeCategory, setActiveCategory] = useState<Category>('Website');
    const { data: rawPlans, isLoading, error } = usePricingPlans();

    // Mapping logic
    const plans = (rawPlans || [])
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .filter(plan => {
            // If API supports category, use it; else, display all.
            const p = plan as any;
            if (p.category) {
                return (p.category as string).toLowerCase() === activeCategory.toLowerCase();
            }
            return true;
        })
        .map((plan) => ({
            id: plan.id,
            title: plan.name,
            price:
                plan.price === 0
                    ? "Custom Pricing"
                    : `₦${plan.price.toLocaleString()}`,
            billing:
                plan.billingCycle === "monthly"
                    ? "/month"
                    : plan.billingCycle === "yearly"
                        ? "/year"
                        : "One-time",
            features: plan.features || [],
            description: plan.description,
        }));

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
                <div className="flex flex-wrap gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-8 py-3 rounded-full font-medium text-base transition-all duration-300 ${activeCategory === category
                                ? 'bg-[#FED5C3]/20 text-[#F24F04]'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards Grid states */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F24F04]"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        <p className="text-xl">Unable to load pricing plans.</p>
                        <p className="text-sm mt-2 text-gray-500">Please try again later.</p>
                    </div>
                ) : plans.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No active plans found for this category.</p>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan, index) => {
                            const isMiddle = index === Math.floor(plans.length / 2) && plans.length > 2;
                            return (
                                <div key={plan.id || index} className="w-full h-full">
                                    <PlanCard 
                                        plan={plan} 
                                        bgColor={bgColors[index % bgColors.length]} 
                                        isHighlighted={isMiddle || !!plan.title?.toLowerCase().includes('professional')}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
