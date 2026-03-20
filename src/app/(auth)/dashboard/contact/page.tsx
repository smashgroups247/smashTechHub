/**
 * /dashboard/contact — Contact Management CRM page.
 *
 * Architecture:
 * 1. StatsCards (GET /contact/stats)
 * 2. ContactFilters (client state → query params)
 * 3. ContactTable   (GET /contact, paginated)
 * 4. ContactModal   (GET /contact/:id + PATCH)
 *
 * All data-fetching via React Query (useContacts, useContactStats).
 * Mutations handled by useUpdateContact / useUpdateStatus / useDeleteContact.
 */
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/contact/StatsCards';
import { ContactFilters } from '@/components/contact/ContactFilters';
import { ContactTable } from '@/components/contact/ContactTable';
import { ContactModal } from '@/components/contact/ContactModal';
import { useContacts } from '@/hooks/useContacts';
import type { GetContactsParams } from '@/types/contact.types';

const DEFAULT_FILTERS: GetContactsParams = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 15,
};

export default function ContactManagementPage() {
  const [filters, setFilters] = useState<GetContactsParams>(DEFAULT_FILTERS);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const { data, isLoading } = useContacts(filters);

  const hasFilters = !!(
    filters.search ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo
  );

  function handleFiltersChange(next: GetContactsParams) {
    setFilters(next);
  }

  function handlePageChange(page: number) {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <DashboardLayout title="Contact Management">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Contact Submissions
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage, respond, and track all inbound contact requests.
        </p>
      </div>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <StatsCards />

      {/* ── Filters ─────────────────────────────────────────────── */}
      <ContactFilters filters={filters} onChange={handleFiltersChange} />

      {/* ── Table ───────────────────────────────────────────────── */}
      <ContactTable
        data={data}
        isLoading={isLoading}
        hasFilters={hasFilters}
        page={filters.page ?? 1}
        onPageChange={handlePageChange}
        onView={(id) => setSelectedContactId(id)}
      />

      {/* ── Detail drawer ───────────────────────────────────────── */}
      <ContactModal
        contactId={selectedContactId}
        onClose={() => setSelectedContactId(null)}
      />
    </DashboardLayout>
  );
}
