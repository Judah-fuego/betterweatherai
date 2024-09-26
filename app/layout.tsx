import { Instrument_Sans } from 'next/font/google'
import {SpeedInsights} from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react';

import "./globals.css";
import Navbar from '@/components/nav/navbar';


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "betterweatherai",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const instrument_sans = Instrument_Sans({subsets: ['latin']}) 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrument_sans.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className="bg-background text-foreground min-w-[660px]">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
