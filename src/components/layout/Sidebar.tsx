'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  CreditCard,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard',          icon: LayoutDashboard },
  { label: 'Profile',   href: '/dashboard/profile',  icon: User },
  { label: 'Pricing',   href: '/dashboard/pricing',  icon: CreditCard },
  { label: 'Contact',   href: '/dashboard/contact',  icon: Mail },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout, isLoading } = useAuth();

  return (
    <aside
      className={`relative flex flex-col h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* ── Brand ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-gray-900 text-sm tracking-tight truncate">
            SmashTechHub
          </span>
        )}
      </div>

      {/* ── Nav ────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon
                className={`flex-shrink-0 w-[18px] h-[18px] transition-colors ${
                  active ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-700'
                }`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ─────────────────────────────────────────────── */}
      <div className="px-2 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={logout}
          disabled={isLoading}
          title={collapsed ? 'Logout' : undefined}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group disabled:opacity-50"
        >
          <LogOut className="flex-shrink-0 w-[18px] h-[18px] text-gray-400 group-hover:text-red-500 transition-colors" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* ── Collapse Toggle ────────────────────────────────────── */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3.5 top-[68px] w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
}
