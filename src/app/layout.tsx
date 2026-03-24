import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Paso Robles & Terranea · Mar 2026',
  description: 'Trip itinerary for William, Rana & Leo — Paso Robles wine country, glamping at Almond Springs, and Terranea Resort',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
