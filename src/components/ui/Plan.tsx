'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { usePricingPlans, PricingCategory } from '@/services/pricing';

// ─── Utility ────────────────────────────────────────────────────────────────

/** Strips parenthetical category suffixes: "Starter Plan (Website)" → "Starter Plan" */
export function cleanPlanName(name: string): string {
  return name.replace(/\s*\(.*?\)/g, '').trim();
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TABS: { key: PricingCategory; label: string }[] = [
  { key: 'WEBSITE', label: 'Website' },
  { key: 'WEB_APP', label: 'Web App' },
  { key: 'MOBILE_APP', label: 'Mobile App' },
  { key: 'BRANDING', label: 'Branding' },
];

const CARD_COLORS = [
  'bg-[#F0F9FD]',
  'bg-[#F6F9F1]',
  'bg-[#F8F0E8]',
  'bg-[#E7FFDB]',
];

const CATEGORY_LABEL: Record<PricingCategory, string> = {
  WEBSITE: 'Website',
  WEB_APP: 'Web App',
  MOBILE_APP: 'Mobile App',
  BRANDING: 'Branding',
};

// ─── PlanCard ────────────────────────────────────────────────────────────────

interface PlanCardProps {
  plan: {
    id: string;
    displayName: string;
    price: string;
    billing: string;
    features: string[];
    description: string;
    isCustom: boolean;
    categoryLabel: string;
    isMostPopular: boolean;
  };
  bgColor: string;
}

function PlanCard({ plan, bgColor }: PlanCardProps) {
  const ctaLabel = plan.isCustom
    ? `Contact Sales`
    : `Order ${plan.categoryLabel} ${plan.displayName}`;

  return (
    <div
      className={`${bgColor} rounded-3xl p-8 flex flex-col w-full h-full
        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
        relative group`}
    >
      {/* Most Popular Badge */}
      {plan.isMostPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5
          bg-[#F24F04] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
          <Zap className="w-3.5 h-3.5" />
          Most Popular
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl font-semibold text-[#393838] mb-3 mt-2">
        {plan.displayName}
      </h3>

      {/* Description */}
      <p className="text-[#393838] lg:text-[15px] sm:text-xs text-sm font-light mt-2 mb-8 leading-tight min-h-[2.5rem]">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mb-8">
        {plan.isCustom ? (
          <p className="text-3xl font-semibold text-[#393838]">Custom Pricing</p>
        ) : (
          <p className="text-4xl font-semibold text-[#393838]">
            {plan.price}
            <span className="text-lg font-normal text-gray-500 ml-1">{plan.billing}</span>
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <span className="text-[#393838] text-base leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        aria-label={ctaLabel}
        className="w-full bg-[#F24F04] hover:bg-[#FF5722] text-white font-medium py-3 px-6
          rounded-full transition-all duration-300 hover:shadow-md active:scale-[0.98] mt-auto
          group-hover:ring-2 group-hover:ring-[#F24F04]/40"
      >
        {plan.isCustom ? 'Contact Sales' : 'Get Started'}
      </button>
    </div>
  );
}

// ─── CategoryTabs ────────────────────────────────────────────────────────────

interface CategoryTabsProps {
  active: PricingCategory;
  onChange: (tab: PricingCategory) => void;
}

function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Pricing categories"
      className="flex flex-wrap gap-2 mb-10"
    >
      {TABS.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-[#F24F04]/60
              ${isActive
                ? 'bg-[#F24F04] text-white shadow-md shadow-[#F24F04]/30'
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {label}
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[#F24F04] -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Plan() {
  const [activeTab, setActiveTab] = useState<PricingCategory>('WEBSITE');
  const { data: rawPlans, isLoading, error } = usePricingPlans();

  // Group and sort plans by category using useMemo
  const groupedPlans = useMemo(() => {
    const list = rawPlans ?? [];
    const grouped: Record<PricingCategory, typeof list> = {
      WEBSITE: [],
      WEB_APP: [],
      MOBILE_APP: [],
      BRANDING: [],
    };
    list.forEach((plan) => {
      const cat = plan.category as PricingCategory;
      if (cat && grouped[cat]) {
        grouped[cat].push(plan);
      }
    });
    // Sort each category by displayOrder ASC
    (Object.keys(grouped) as PricingCategory[]).forEach((cat) => {
      grouped[cat].sort((a, b) => a.displayOrder - b.displayOrder);
    });
    return grouped;
  }, [rawPlans]);

  // Plans visible in the active tab
  const activePlans = groupedPlans[activeTab];

  // Build display-ready plan objects
  const displayPlans = useMemo(
    () =>
      activePlans.map((plan) => ({
        id: plan.id,
        displayName: cleanPlanName(plan.name),
        price: `₦${plan.price.toLocaleString()}`,
        billing:
          plan.billingCycle === 'monthly'
            ? '/month'
            : plan.billingCycle === 'yearly'
            ? '/year'
            : 'One-time',
        features: plan.features,
        description: plan.description,
        isCustom: plan.price === 0,
        categoryLabel: CATEGORY_LABEL[activeTab],
        isMostPopular: cleanPlanName(plan.name).toLowerCase().includes('professional'),
      })),
    [activePlans, activeTab]
  );

  return (
    <section className="py-20 px-6 mt-10 bg-[#FFF8F5]">
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#393838] mb-4 leading-tight">
            Choose a Plan That{' '}
            <span className="relative inline-block">
              Fits
              <span className="absolute md:flex hidden -top-3 -right-10 bg-[#D2F801] text-[#393838] text-sm font-normal px-3 py-1 rounded-full rotate-17">
                Projects
              </span>
            </span>
            <br />
            Your Vision
          </h2>
          <p className="text-[#393838] text-lg md:text-xl max-w-4xl leading-tight tracking-tight font-light">
            Each package is designed to deliver quality work, clear timelines,
            and measurable{' '}
            <br className="hidden md:flex" />
            results. No hidden fees. No surprises.
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryTabs active={activeTab} onChange={setActiveTab} />

        {/* Category Context Heading */}
        <AnimatePresence mode="wait">
          <motion.h3
            key={`heading-${activeTab}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-2xl font-semibold text-[#393838] mb-8"
          >
            {CATEGORY_LABEL[activeTab]} Plans
          </motion.h3>
        </AnimatePresence>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F24F04]" />
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="text-center py-20 text-red-500">
            <p className="text-xl">Unable to load pricing plans.</p>
            <p className="text-sm mt-2 text-gray-500">Please try again later.</p>
          </div>
        )}

        {/* Plans Grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${activeTab}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {displayPlans.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-xl">No active plans found for this category.</p>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                  {displayPlans.map((plan, index) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      bgColor={CARD_COLORS[index % CARD_COLORS.length]}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
