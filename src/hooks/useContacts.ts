/**
 * useContacts — React Query hook for fetching paginated/filtered contacts.
 */
'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { contactApi } from '@/lib/api/contact.api';
import type { GetContactsParams } from '@/types/contact.types';

export const CONTACTS_QUERY_KEY = 'contacts';

export function useContacts(params: GetContactsParams = {}) {
  return useQuery({
    queryKey: [CONTACTS_QUERY_KEY, params],
    queryFn: () => contactApi.getContacts(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000, // 30 seconds — contacts don't change super-frequently
    select: (res) => res.data,
  });
}
