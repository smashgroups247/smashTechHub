import React, { useState } from 'react';
import { PricingPlan } from '@/types/pricing';
import { Trash2, Edit3, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingCardProps {
  plan: PricingPlan;
  onEdit: (plan: PricingPlan) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  isToggling: boolean;
}

export default function PricingCard({
  plan,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling,
}: PricingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const formattedPrice = `₦${(plan.price / 100).toLocaleString()}`;
  const displayedFeatures = expanded ? plan.features : plan.features.slice(0, 3);
  const hasMoreFeatures = plan.features.length > 3;

  return (
    <motion.div
      layout
      className={`relative flex flex-col bg-white rounded-2xl border ${
        plan.isActive ? 'border-indigo-100 shadow-xl' : 'border-gray-200 shadow-md opacity-75'
      } overflow-hidden transition-all hover:shadow-2xl`}
    >
      <div className="p-6 md:p-8 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            {plan.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{plan.description}</p>
            )}
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              plan.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {plan.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="mt-4 flex items-baseline text-4xl font-extrabold text-gray-900 mb-2">
          {formattedPrice}
          <span className="ml-1 text-xl font-medium text-gray-500 capitalize">
            /{plan.billingCycle.replace('-', ' ')}
          </span>
        </div>

        <p className="text-sm text-gray-400 mb-6">Display Order: {plan.displayOrder}</p>

        <ul className="space-y-4 mb-6">
          <AnimatePresence>
            {displayedFeatures.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-indigo-500" />
                </div>
                <p className="ml-3 text-sm text-gray-700">{feature}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        
        {hasMoreFeatures && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none mb-6"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                + {plan.features.length - 3} more {plan.features.length - 3 === 1 ? 'feature' : 'features'}{' '}
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="bg-gray-50 p-6 md:p-8 mt-auto border-t border-gray-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={plan.isActive}
              onChange={() => onToggleStatus(plan.id || plan._id, plan.isActive)}
              disabled={isToggling}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 disabled:opacity-50"></div>
          </label>
        </div>

        <div className="flex justify-between gap-3 mt-4">
          <button
            className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onEdit(plan)}
          >
            <Edit3 className="w-4 h-4 mr-2 text-gray-500" />
            Edit
          </button>
          
          <button
            className="flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => onDelete(plan.id || plan._id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
