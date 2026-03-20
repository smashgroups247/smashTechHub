'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { StatCardSkeleton } from '@/components/ui/Skeleton';
import { Mail, User, Shield, Key, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading, fetchMe, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated) fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-2xl space-y-5">
        {/* ── Avatar / name hero ─────────────────────────────── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex items-center gap-5">
          {isLoading || !user ? (
            <StatCardSkeleton />
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-red-100">
                {user.firstName?.[0]?.toUpperCase() || ''}
                {user.lastName?.[0]?.toUpperCase() || ''}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </>
          )}
        </div>

        {/* ── Info fields ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Account Details</h3>
          </div>

          {isLoading || !user ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <dl className="divide-y divide-gray-50">
              {[
                {
                  icon: User,
                  label: 'First name',
                  value: user.firstName,
                },
                {
                  icon: User,
                  label: 'Last name',
                  value: user.lastName,
                },
                {
                  icon: Mail,
                  label: 'Email address',
                  value: user.email,
                },
                {
                  icon: Key,
                  label: 'User ID',
                  value: user.id,
                  mono: true,
                },
                {
                  icon: Shield,
                  label: 'Role',
                  value: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Administrator',
                },
                {
                  icon: Calendar,
                  label: 'Member since',
                  value: 'March 2024',
                },
              ].map(({ icon: Icon, label, value, mono }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <dt className="w-32 flex-shrink-0 text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {label}
                  </dt>
                  <dd className={`text-sm text-gray-900 ${mono ? 'font-mono text-xs' : 'font-medium'}`}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
