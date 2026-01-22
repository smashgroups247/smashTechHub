import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import Navbar from '../features/components/Navbar'; // <-- import your Navbar
import { Footer } from '@/features/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'SSR boilerplate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        

        <main className="pt-15">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
