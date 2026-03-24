import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Leo's Great California Adventure · Mar 2026",
  description: 'A treasure map adventure for Leo, Rana & William — Paso Robles wine country, glamping at Almond Springs Ranch, and Terranea Resort',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-amber-50 text-stone-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
