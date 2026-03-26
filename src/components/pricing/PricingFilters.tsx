import React from 'react';
import { Search } from 'lucide-react';
import { PricingQueryParams } from '@/types/pricing';

interface PricingFiltersProps {
  filters: PricingQueryParams;
  setFilters: React.Dispatch<React.SetStateAction<PricingQueryParams>>;
}

export default function PricingFilters({ filters, setFilters }: PricingFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
        {/* Status Filter */}
        <select
          value={filters.isActive === undefined ? '' : filters.isActive ? 'true' : 'false'}
          onChange={(e) => {
            const val = e.target.value;
            setFilters((prev) => ({
              ...prev,
              isActive: val === '' ? undefined : val === 'true',
              page: 1, // Reset page
            }));
          }}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 w-full md:w-48"
        >
          <option value="">All Statuses</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category || ''}
          onChange={(e) => {
            const val = e.target.value;
            setFilters((prev) => ({
              ...prev,
              category: val === '' ? undefined : val,
              page: 1, // Reset page
            }));
          }}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 w-full md:w-36"
        >
          <option value="">All Categories</option>
          <option value="WEBSITE">Website</option>
          <option value="WEB_APP">Web App</option>
          <option value="MOBILE_APP">Mobile App</option>
          <option value="BRANDING">Branding</option>
        </select>

        {/* Sort By Filter */}
        <select
          value={filters.sortBy || 'displayOrder'}
          onChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              sortBy: e.target.value,
              page: 1, // Reset page
            }));
          }}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 w-full md:w-48"
        >
          <option value="displayOrder">Display Order</option>
          <option value="createdAt">Date Created</option>
          <option value="price">Price</option>
        </select>

        {/* Sort Order Toggle */}
        <button
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc',
              page: 1,
            }));
          }}
          className="px-4 py-2 border border-gray-200 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm font-medium w-full md:w-auto"
        >
          {filters.sortOrder === 'desc' ? 'Descending' : 'Ascending'}
        </button>
      </div>
    </div>
  );
}
