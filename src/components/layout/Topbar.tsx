'use client';

import { Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title = 'Dashboard' }: TopbarProps) {
  const { user } = useAuth();

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase().trim() || '?'
    : '?';

  const displayName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Loading…';

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 flex-shrink-0">
      {/* Page title */}
      <h1 className="text-base font-semibold text-gray-900 tracking-tight">{title}</h1>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        {/* Bell notification (decorative) */}
        <button className="relative p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* User pill */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[140px] truncate">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
}
