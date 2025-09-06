
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Brew & Bean - Artisanal Coffee Shop',
  description: 'Experience the perfect blend of artisanal coffee and cozy atmosphere at Brew & Bean.',
  keywords: 'coffee, cafe, espresso, latte, cappuccino, pastry, coffee shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}