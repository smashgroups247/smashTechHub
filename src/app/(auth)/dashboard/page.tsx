'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useContactStats } from '@/hooks/useContactStats';
import { useContacts } from '@/hooks/useContacts';

import {
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr${diffInHours === 1 ? '' : 's'} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
}

const EVENT_PILL: Record<string, string> = {
  new: 'bg-emerald-50 text-emerald-700',
  'in-progress': 'bg-amber-50 text-amber-700',
  resolved: 'bg-blue-50 text-blue-700',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: contactStats, isLoading: isLoadingStats } = useContactStats();
  const { data: contactsData, isLoading: isLoadingContacts } = useContacts({ limit: 5 });

  const STATS = [
    {
      id: 'total-contacts',
      label: 'Total Contacts',
      value: contactStats?.total?.toString() || '0',
      change: 'Active',
      trend: 'up',
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'new-contacts',
      label: 'New Contacts',
      value: contactStats?.new?.toString() || '0',
      change: 'Recent',
      trend: 'up',
      icon: Mail,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: contactStats?.inProgress?.toString() || '0',
      change: 'Working',
      trend: 'up',
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      id: 'resolved',
      label: 'Resolved',
      value: contactStats?.resolved?.toString() || '0',
      change: 'Done',
      trend: 'up',
      icon: CheckCircle,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  const recentContacts = contactsData?.contacts || [];

  return (
    <DashboardLayout title="Dashboard">
      {/* ── Greeting ─────────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Good morning{user?.firstName ? `, ${user.firstName}` : ''} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const isUp = stat.trend === 'up';
          return (
            <div
              key={stat.id}
              id={stat.id}
              className="bg-white rounded-2xl p-5 shadow-sm shadow-gray-100 border border-gray-50 hover:shadow-md hover:shadow-gray-100 transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {stat.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900 tracking-tight">
                      {isLoadingStats ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : stat.value}
                    </p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    isUp ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Activity Feed ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm shadow-gray-100 border border-gray-50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Recent Contacts</h3>
            <Link href="/dashboard/contact" className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {isLoadingContacts ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${EVENT_PILL[contact.status] || 'bg-gray-50 text-gray-700'}`}
                      >
                        {contact.status.replace('-', ' ')}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5">{contact.email} &mdash; {contact.service}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                    {contact.createdAt ? formatTimeAgo(contact.createdAt) : ''}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-sm text-gray-500">
                No recent contacts found.
              </div>
            )}
          </div>
        </div>

        {/* Quick tips / status card */}
        <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-5 text-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-200 mb-3">
              Platform Status
            </p>
            <h4 className="text-lg font-bold leading-snug mb-2">
              All systems operational
            </h4>
            <p className="text-sm text-red-100 leading-relaxed">
              API, Auth, and Storage services are running normally. Uptime this month:{' '}
              <span className="font-bold text-white">99.97%</span>
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-red-100 font-medium">Live</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
