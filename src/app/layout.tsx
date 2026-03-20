import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { ConditionalNav } from '@/components/layout/ConditionalNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmashTechHub',
  description: 'We Design & Build Digital Experiences That Move Brands Forward',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ConditionalNav>{children}</ConditionalNav>
        </Providers>
      </body>
    </html>
  );
}
