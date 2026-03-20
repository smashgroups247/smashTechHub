'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/features/components/Navbar';
import { Footer } from '@/features/components/Footer';

const AUTH_PATHS = ['/login', '/dashboard'];

/**
 * Conditionally renders Navbar + Footer.
 * Auth/dashboard routes get their own full-screen shell so we skip global nav there.
 */
export function ConditionalNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-15">{children}</main>
      <Footer />
    </>
  );
}
