import React from 'react';
import { PricingPlan } from '@/types/pricing';
import PricingCard from './PricingCard';
import { motion } from 'framer-motion';

interface PricingGridProps {
  plans: PricingPlan[];
  onEdit: (plan: PricingPlan) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  isToggling: boolean;
}

export default function PricingGrid({
  plans,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling,
}: PricingGridProps) {
  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No pricing plans yet</h3>
        <p className="text-gray-500 max-w-sm mb-6">
          Get started by creating your first pricing plan. It will appear here once created.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {plans.map((plan) => (
        <PricingCard
          key={plan.id || plan._id}
          plan={plan}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          isToggling={isToggling}
        />
      ))}
    </motion.div>
  );
}
