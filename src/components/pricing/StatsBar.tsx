import React from 'react';
import { useActivePlans } from '@/hooks/useActivePlans';
import { Activity, LayoutGrid, CheckCircle, Tag } from 'lucide-react';
import { PricingPlan } from '@/types/pricing';

export default function StatsBar() {
  const { data: plansData, isLoading } = useActivePlans();
  const plans: PricingPlan[] = Array.isArray(plansData) ? plansData : (plansData as any)?.data || [];

  const activeCount = plans.filter((p) => p.isActive).length;
  const totalCount = plans.length;
  const inactiveCount = totalCount - activeCount;

  // Find lowest and highest price of active plans
  const activePrices = plans.filter((p) => p.isActive).map((p) => p.price);
  const minPrice = activePrices.length > 0 ? Math.min(...activePrices) : 0;
  const maxPrice = activePrices.length > 0 ? Math.max(...activePrices) : 0;

  const formatPrice = (p: number) => `₦${p.toLocaleString()}`;
  const priceRange =
    activePrices.length === 0
      ? '₦0'
      : minPrice === maxPrice
      ? formatPrice(minPrice)
      : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  const stats = [
    { label: 'Total Plans', value: totalCount, icon: LayoutGrid, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active', value: activeCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Inactive', value: inactiveCount, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Price Range', value: priceRange, icon: Tag, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-5 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-2 rounded-full ${stat.bg}`}>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
