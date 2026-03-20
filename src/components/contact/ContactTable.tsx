/**
 * ContactTable — the main data table for contact submissions.
 *
 * Features:
 * - Skeleton loader
 * - Empty state
 * - Quick inline status update (optimistic)
 * - Confirmed delete with modal
 * - Row actions: View/Edit drawer, Delete
 * - Pagination
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, Loader2, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useUpdateStatus, useDeleteContact } from '@/hooks/useUpdateContact';
import type { Contact, ContactStatus, PaginatedContacts } from '@/types/contact.types';

// ─── Shared helpers ───────────────────────────────────────────────────────────
function formatDateShort(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-50 animate-pulse">
      {[140, 180, 100, 80, 80, 96].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className={`h-3.5 bg-gray-100 rounded-full`} style={{ width: w }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <tr>
      <td colSpan={6}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-600">
            {hasFilters ? 'No contacts match your filters' : 'No contact submissions yet'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {hasFilters
              ? 'Try adjusting your search or filters.'
              : 'When users submit your contact form they\'ll appear here.'}
          </p>
        </div>
      </td>
    </tr>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
function DeleteConfirmModal({
  name,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[380px] p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Delete Contact</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-800">{name}</span>? This action
                cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              id="delete-cancel-btn"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 h-9 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              id="delete-confirm-btn"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-medium text-white transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 active:scale-[0.98]"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Deleting…
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Quick Status Select ──────────────────────────────────────────────────────
function QuickStatusSelect({ contact }: { contact: Contact }) {
  const { mutate: updateStatus, isPending, variables } = useUpdateStatus();
  const isUpdating = isPending && variables?.id === contact.id;

  return (
    <div className="relative flex items-center gap-1.5">
      {isUpdating && <Loader2 className="w-3 h-3 text-gray-400 animate-spin absolute -left-4" />}
      <select
        id={`status-select-${contact.id}`}
        value={contact.status}
        disabled={isUpdating}
        onChange={(e) =>
          updateStatus({ id: contact.id, status: e.target.value as ContactStatus })
        }
        className="appearance-none border-0 bg-transparent text-xs font-medium text-gray-700 outline-none cursor-pointer disabled:opacity-50 pr-1"
        style={{ WebkitAppearance: 'none' }}
      >
        <option value="new">New</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}

// ─── Main Table ───────────────────────────────────────────────────────────────
interface ContactTableProps {
  data: PaginatedContacts | undefined;
  isLoading: boolean;
  hasFilters: boolean;
  page: number;
  onPageChange: (p: number) => void;
  onView: (id: string) => void;
}

export function ContactTable({
  data,
  isLoading,
  hasFilters,
  page,
  onPageChange,
  onView,
}: ContactTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteContact(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  const contacts = data?.contacts ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      {/* ── Table card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm shadow-gray-100 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" id="contacts-table">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {['Name', 'Email', 'Service', 'Status', 'Date', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : contacts.length === 0 ? (
                <EmptyState hasFilters={hasFilters} />
              ) : (
                <AnimatePresence mode="popLayout">
                  {contacts.map((contact, i) => (
                    <motion.tr
                      key={contact.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors group"
                    >
                      {/* Name */}
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-gray-900 text-sm">
                          {contact.name}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-gray-500 hover:text-red-600 transition-colors text-xs"
                        >
                          {contact.email}
                        </a>
                      </td>

                      {/* Service */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-gray-500 truncate max-w-[120px] block">
                          {contact.service}
                        </span>
                      </td>

                      {/* Status — clickable badge wrapping quick-select */}
                      <td className="px-4 py-3.5">
                        <div className="relative inline-block">
                          <StatusBadge status={contact.status} />
                          <div className="absolute inset-0 opacity-0">
                            <QuickStatusSelect contact={contact} />
                          </div>
                          {/* Visible dropdown layered on top */}
                          <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                            <select
                              id={`quick-status-${contact.id}`}
                              value={contact.status}
                              onChange={(e) =>
                                useUpdateStatus
                              }
                              className="absolute inset-0 opacity-0 cursor-pointer w-full"
                              aria-label={`Change status for ${contact.name}`}
                            >
                              <option value="new">New</option>
                              <option value="in-progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatDateShort(contact.createdAt)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <button
                            id={`view-contact-${contact.id}`}
                            onClick={() => onView(contact.id)}
                            title="View / Edit"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            id={`delete-contact-${contact.id}`}
                            onClick={() => setDeleteTarget(contact)}
                            title="Delete"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ────────────────────────────────────────── */}
        {!isLoading && contacts.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">
              Page <span className="font-semibold text-gray-600">{page}</span> of{' '}
              <span className="font-semibold text-gray-600">{totalPages}</span>
              {data?.total !== undefined && (
                <> &mdash; {data.total} total</>
              )}
            </p>
            <div className="flex gap-1.5">
              <button
                id="pagination-prev"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="pagination-next"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Delete confirmation ───────────────────────────────────── */}
      {deleteTarget && (
        <DeleteConfirmModal
          name={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
