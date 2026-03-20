/**
 * useUpdateContact — mutations for update, quickStatus, delete.
 * Uses optimistic updates for status changes.
 */
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { contactApi } from '@/lib/api/contact.api';
import { CONTACTS_QUERY_KEY } from './useContacts';
import { STATS_QUERY_KEY } from './useContactStats';
import type { Contact, ContactStatus, PaginatedContacts, UpdateContactPayload } from '@/types/contact.types';

// ─── Error helper ─────────────────────────────────────────────────────────────
function extractMessage(err: unknown, fallback: string): string {
  const axiosErr = err as AxiosError<{ message?: string }>;
  return axiosErr?.response?.data?.message ?? fallback;
}

// ─── Update contact (status + adminNotes) ─────────────────────────────────────
export function useUpdateContact() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateContactPayload }) =>
      contactApi.updateContact(id, payload),
    onSuccess: (res) => {
      // Invalidate list & stats so they re-fetch with fresh data
      qc.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: [STATS_QUERY_KEY] });
      // Update the single-contact cache entry if present
      qc.setQueryData(['contact', res.data.id], res);
      toast.success('Contact updated successfully.');
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Failed to update contact.'));
    },
  });
}

// ─── Quick status update with optimistic UI ───────────────────────────────────
export function useUpdateStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      contactApi.updateStatus(id, { status }),

    // Optimistically update the contact list cache
    onMutate: async ({ id, status }) => {
      // Cancel in-flight contact queries
      await qc.cancelQueries({ queryKey: [CONTACTS_QUERY_KEY] });

      // Snapshot all matching queries for rollback
      const previousQueries = qc.getQueriesData<{ data: PaginatedContacts }>({
        queryKey: [CONTACTS_QUERY_KEY],
      });

      // Optimistically patch every paginated contacts cache entry
      qc.setQueriesData<{ data: PaginatedContacts }>(
        { queryKey: [CONTACTS_QUERY_KEY] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              contacts: old.data.contacts.map((c: Contact) =>
                c.id === id ? { ...c, status } : c,
              ),
            },
          };
        },
      );

      return { previousQueries };
    },

    onError: (err, _vars, context) => {
      // Roll back optimistic update
      context?.previousQueries.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
      toast.error(extractMessage(err, 'Failed to update status.'));
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: [STATS_QUERY_KEY] });
    },
  });
}

// ─── Delete contact ───────────────────────────────────────────────────────────
export function useDeleteContact() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactApi.deleteContact(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: [STATS_QUERY_KEY] });
      toast.success('Contact deleted.');
    },
    onError: (err) => {
      toast.error(extractMessage(err, 'Failed to delete contact.'));
    },
  });
}
