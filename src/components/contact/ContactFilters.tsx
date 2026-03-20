/**
 * ContactFilters — search input, status dropdown, date range, and sort controls.
 * All state is lifted to the parent via `onChange`.
 */
'use client';

import { useRef, useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { ContactStatus, GetContactsParams } from '@/types/contact.types';

interface ContactFiltersProps {
  filters: GetContactsParams;
  onChange: (next: GetContactsParams) => void;
}

const STATUS_OPTIONS: { label: string; value: ContactStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Resolved', value: 'resolved' },
];

const SORT_OPTIONS = [
  { label: 'Newest first', value: 'createdAt:desc' },
  { label: 'Oldest first', value: 'createdAt:asc' },
  { label: 'Name A–Z', value: 'name:asc' },
  { label: 'Name Z–A', value: 'name:desc' },
];

export function ContactFilters({ filters, onChange }: ContactFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input by 350ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ ...filters, search: localSearch, page: 1 });
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  const currentSort = `${filters.sortBy ?? 'createdAt'}:${filters.sortOrder ?? 'desc'}`;

  function handleSortChange(value: string) {
    const [sortBy, sortOrder] = value.split(':') as [string, 'asc' | 'desc'];
    onChange({ ...filters, sortBy, sortOrder, page: 1 });
  }

  function handleStatusChange(value: ContactStatus | '') {
    onChange({ ...filters, status: value, page: 1 });
  }

  function handleDateFrom(value: string) {
    onChange({ ...filters, dateFrom: value || undefined, page: 1 });
  }

  function handleDateTo(value: string) {
    onChange({ ...filters, dateTo: value || undefined, page: 1 });
  }

  function clearAll() {
    setLocalSearch('');
    onChange({ sortBy: 'createdAt', sortOrder: 'desc', page: 1 });
  }

  const hasActiveFilters =
    localSearch ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo ||
    currentSort !== 'createdAt:desc';

  return (
    <div className="bg-white rounded-2xl border border-gray-50 shadow-sm shadow-gray-100 px-4 py-3 mb-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* ── Search ─────────────────────────────────────────────── */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="contact-search"
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
          />
        </div>

        {/* ── Status filter ───────────────────────────────────────── */}
        <select
          id="contact-status-filter"
          value={filters.status ?? ''}
          onChange={(e) => handleStatusChange(e.target.value as ContactStatus | '')}
          className="h-9 px-3 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all cursor-pointer"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* ── Sort ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <select
            id="contact-sort"
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-9 px-3 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* ── Date range ──────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <input
            id="contact-date-from"
            type="date"
            value={filters.dateFrom ?? ''}
            onChange={(e) => handleDateFrom(e.target.value)}
            className="h-9 px-3 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
          />
          <span className="text-xs text-gray-400">to</span>
          <input
            id="contact-date-to"
            type="date"
            value={filters.dateTo ?? ''}
            onChange={(e) => handleDateTo(e.target.value)}
            className="h-9 px-3 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
          />
        </div>

        {/* ── Clear all ───────────────────────────────────────────── */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            id="contact-clear-filters"
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition-all"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
