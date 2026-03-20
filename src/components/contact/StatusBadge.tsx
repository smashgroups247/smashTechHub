/**
 * StatusBadge — displays a contact status with colour-coded pill styling.
 * Also used in dropdowns and table quick-select.
 */
'use client';

import { ContactStatus } from '@/types/contact.types';

interface StatusBadgeProps {
  status: ContactStatus;
  /** Make the badge slightly larger for detail views */
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  ContactStatus,
  { label: string; className: string; dot: string }
> = {
  new: {
    label: 'New',
    className: 'bg-blue-50 text-blue-700 border border-blue-100',
    dot: 'bg-blue-500',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-amber-50 text-amber-700 border border-amber-100',
    dot: 'bg-amber-500',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    dot: 'bg-emerald-500',
  },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const padding = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide ${padding} ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}

export { STATUS_CONFIG };
