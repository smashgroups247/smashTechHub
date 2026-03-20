'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useAuth } from '@/hooks/useAuth';
import DashboardError from '@/app/(auth)/dashboard/error';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * Shell layout used by all protected dashboard pages.
 * Performs a client-side auth guard as a secondary check after middleware.
 */
export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { isAuthenticated, isHydrated, isLoading, error, fetchMe, user } = useAuth();
  const router = useRouter();
  const [timeoutError, setTimeoutError] = useState(false);

  // After hydration, redirect if no token
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isHydrated, isAuthenticated, router]);

  // Fetch fresh user data on mount
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      fetchMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  // Timeout fallback for infinite loading states
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setTimeoutError(true);
      }, 10000); // 10 seconds timeout
    } else {
      setTimeoutError(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (error || timeoutError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAFA]">
        <DashboardError
          error={new Error(error || 'Loading timeout')}
          reset={() => {
            setTimeoutError(false);
            if (isAuthenticated) fetchMe();
          }}
        />
      </div>
    );
  }

  if (!isHydrated || !isAuthenticated || (isLoading && !user)) {
    // Minimal full-page skeleton while store rehydrates or fetches initial user
    return (
      <div className="flex h-screen bg-[#FAFAFA] animate-pulse">
        <div className="w-[240px] h-full bg-white border-r border-gray-100" />
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-white border-b border-gray-100" />
          <div className="flex-1 p-6 space-y-4">
            <div className="h-8 w-48 bg-gray-100 rounded-xl" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white rounded-2xl shadow-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
