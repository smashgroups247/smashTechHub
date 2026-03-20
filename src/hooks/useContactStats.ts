/**
 * useContactStats — React Query hook for fetching contact stats cards.
 */
'use client';

import { useQuery } from '@tanstack/react-query';
import { contactApi } from '@/lib/api/contact.api';

export const STATS_QUERY_KEY = 'contact-stats';

export function useContactStats() {
  return useQuery({
    queryKey: [STATS_QUERY_KEY],
    queryFn: () => contactApi.getStats(),
    staleTime: 60_000, // 1 minute
    select: (res) => res.data,
  });
}
