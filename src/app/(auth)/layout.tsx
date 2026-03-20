/**
 * Auth group layout — strips the site Navbar/Footer for auth pages.
 * Rendered for /login and any other routes inside (auth).
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmashTechHub — Account',
  description: 'Sign in to your SmashTechHub account',
};

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
