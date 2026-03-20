'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { LogOut, RefreshCcw, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  const handleLogout = () => {
    useAuthStore.getState().clearAuth();
    router.replace('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
        Something went wrong!
      </h2>
      
      <p className="text-gray-500 max-w-md mb-8">
        We’re having trouble loading your dashboard. This may be due to a temporary server issue or an invalid session.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => {
            // Re-trigger all data fetching by resetting the error boundary
            reset();
            // Alternatively, force a full page reload if needed
            window.location.reload();
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Reload Page</span>
        </button>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <LogOut className="w-4 h-4" />
          <span>Re-authenticate</span>
        </button>
      </div>
    </div>
  );
}
