import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Landing Page Builder - Financial Services',
  description: 'Generate beautiful, brand-matched landing pages for financial services companies in minutes using AI.',
  keywords: 'AI, landing page, financial services, money transfer, remittance, web design',
  authors: [{ name: 'AI Landing Page Builder Team' }],
  robots: process.env.DEMO_MODE === 'true' ? 'noindex, nofollow' : 'index, follow',
  openGraph: {
    title: 'AI Landing Page Builder for Financial Services',
    description: 'Generate beautiful, brand-matched landing pages in minutes',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/7414284/pexels-photo-7414284.jpeg',
        width: 1200,
        height: 630,
        alt: 'AI Landing Page Builder'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}