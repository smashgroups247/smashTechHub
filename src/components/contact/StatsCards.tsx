/**
 * StatsCards — 4-card grid showing New / In-Progress / Resolved / Total counts.
 * Shows skeleton loaders while data is fetching.
 */
'use client';

import { motion } from 'framer-motion';
import { Inbox, Clock4, CheckCircle2, LayoutList } from 'lucide-react';
import { useContactStats } from '@/hooks/useContactStats';

const CARD_META = [
  {
    key: 'new' as const,
    label: 'New',
    icon: Inbox,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    valueColor: 'text-blue-700',
    border: 'border-blue-100',
  },
  {
    key: 'inProgress' as const,
    label: 'In Progress',
    icon: Clock4,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    valueColor: 'text-amber-700',
    border: 'border-amber-100',
  },
  {
    key: 'resolved' as const,
    label: 'Resolved',
    icon: CheckCircle2,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    valueColor: 'text-emerald-700',
    border: 'border-emerald-100',
  },
  {
    key: 'total' as const,
    label: 'Total',
    icon: LayoutList,
    bg: 'bg-gray-50',
    iconColor: 'text-gray-600',
    valueColor: 'text-gray-800',
    border: 'border-gray-100',
  },
];

function StatSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-100 rounded-full" />
          <div className="h-7 w-12 bg-gray-100 rounded-lg" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

export function StatsCards() {
  const { data, isLoading } = useContactStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Map each card key to the correct ContactStats field
  const getValue = (key: (typeof CARD_META)[number]['key']): number => {
    if (!data) return 0;
    const map: Record<(typeof CARD_META)[number]['key'], number> = {
      new: data.new,
      inProgress: data.inProgress,
      resolved: data.resolved,
      total: data.total,
    };
    return map[key] ?? 0;
  };

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {CARD_META.map((card, i) => {
        const Icon = card.icon;
        const value = getValue(card.key);
        return (
          <motion.div
            key={card.key}
            id={`stat-${card.key}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="bg-white rounded-2xl p-5 shadow-sm shadow-gray-100 border border-gray-50 hover:shadow-md hover:shadow-gray-100 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  {card.label}
                </p>
                <p className={`text-3xl font-bold tracking-tight ${card.valueColor}`}>
                  {value}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg} border ${card.border}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
