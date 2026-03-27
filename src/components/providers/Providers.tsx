'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Optional: throwOnError: true for mutations
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#fff',
            color: '#111827',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            border: '1px solid #f3f4f6',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#16a34a', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
          },
        }}
      />
    </QueryClientProvider>
  );
}