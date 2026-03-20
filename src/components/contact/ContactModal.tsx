/**
 * ContactModal — slide-over drawer for viewing full contact details
 * and editing status + admin notes inline.
 */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Save, User, Mail, Briefcase, FileText, StickyNote, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { contactApi } from '@/lib/api/contact.api';
import { useUpdateContact } from '@/hooks/useUpdateContact';
import { StatusBadge } from './StatusBadge';
import type { Contact, ContactStatus } from '@/types/contact.types';

interface ContactModalProps {
  contactId: string | null;
  onClose: () => void;
}

const STATUS_OPTIONS: { label: string; value: ContactStatus }[] = [
  { label: 'New', value: 'new' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Resolved', value: 'resolved' },
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <div className="text-sm text-gray-800 font-medium break-words">{value}</div>
      </div>
    </div>
  );
}

export function ContactModal({ contactId, onClose }: ContactModalProps) {
  const isOpen = !!contactId;

  const { data: contact, isLoading } = useQuery({
    queryKey: ['contact', contactId],
    queryFn: () => contactApi.getContactById(contactId!),
    enabled: !!contactId,
    select: (res) => res.data,
  });

  const { mutate: updateContact, isPending: isSaving } = useUpdateContact();

  const [editStatus, setEditStatus] = useState<ContactStatus>('new');
  const [editNotes, setEditNotes] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Sync local state when contact loads
  useEffect(() => {
    if (contact) {
      setEditStatus(contact.status);
      setEditNotes(contact.adminNotes ?? '');
      setIsDirty(false);
    }
  }, [contact]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSave() {
    if (!contactId) return;
    updateContact(
      { id: contactId, payload: { status: editStatus, adminNotes: editNotes } },
      { onSuccess: () => setIsDirty(false) },
    );
  }

  function handleStatusChange(status: ContactStatus) {
    setEditStatus(status);
    setIsDirty(true);
  }

  function handleNotesChange(notes: string) {
    setEditNotes(notes);
    setIsDirty(true);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ──────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
          />

          {/* ── Drawer ────────────────────────────────────────────── */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-900">Contact Details</h2>
                {contact && (
                  <p className="text-xs text-gray-400 mt-0.5">ID: {contact.id}</p>
                )}
              </div>
              <button
                onClick={onClose}
                id="contact-modal-close"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {isLoading ? (
                <DrawerSkeleton />
              ) : !contact ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                  <p className="text-sm">Failed to load contact.</p>
                </div>
              ) : (
                <ContactDetails
                  contact={contact}
                  editStatus={editStatus}
                  editNotes={editNotes}
                  onStatusChange={handleStatusChange}
                  onNotesChange={handleNotesChange}
                />
              )}
            </div>

            {/* Footer — Save */}
            {contact && (
              <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
                <button
                  id="contact-save-btn"
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                  className="w-full h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
                {!isDirty && (
                  <p className="text-center text-[11px] text-gray-400 mt-2">
                    Make a change above to enable saving.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Inner detail layout ───────────────────────────────────────────────────────
function ContactDetails({
  contact,
  editStatus,
  editNotes,
  onStatusChange,
  onNotesChange,
}: {
  contact: Contact;
  editStatus: ContactStatus;
  editNotes: string;
  onStatusChange: (s: ContactStatus) => void;
  onNotesChange: (n: string) => void;
}) {
  return (
    <div className="space-y-0 divide-y divide-transparent">
      {/* Read-only fields */}
      <DetailRow icon={User} label="Full Name" value={contact.name} />
      <DetailRow
        icon={Mail}
        label="Email"
        value={
          <a
            href={`mailto:${contact.email}`}
            className="text-red-600 hover:underline"
          >
            {contact.email}
          </a>
        }
      />
      <DetailRow icon={Briefcase} label="Service of Interest" value={contact.service} />
      <DetailRow
        icon={FileText}
        label="Project Details"
        value={
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {contact.projectDetails || '—'}
          </p>
        }
      />
      <DetailRow
        icon={Clock}
        label="Submitted"
        value={formatDate(contact.createdAt)}
      />

      {/* ── Editable: Status ───────────────────────────────────── */}
      <div className="pt-5 pb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Status
        </p>
        <div className="flex gap-2 flex-wrap">
          {(['new', 'in-progress', 'resolved'] as ContactStatus[]).map((s) => (
            <button
              key={s}
              id={`status-option-${s}`}
              onClick={() => onStatusChange(s)}
              className={`transition-all duration-150 rounded-full border ${
                editStatus === s
                  ? 'ring-2 ring-offset-1 ring-red-400 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <StatusBadge status={s} size="md" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Editable: Admin Notes ─────────────────────────────── */}
      <div className="pt-5">
        <div className="flex items-center gap-2 mb-2">
          <StickyNote className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Admin Notes
          </p>
        </div>
        <textarea
          id="contact-admin-notes"
          rows={5}
          value={editNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add internal notes…"
          className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all resize-none"
        />
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function DrawerSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-16 bg-gray-100 rounded-full" />
            <div className="h-4 w-40 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
