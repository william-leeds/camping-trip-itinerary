'use client';

import { useState, useEffect } from 'react';
import { itinerary, tripTitle, tripSubtitle, travelers, heroImage, heroImageAlt } from '@/data/itinerary';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDay = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky nav */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between">
          <span className={`text-sm font-semibold tracking-wide transition-colors ${scrolled ? 'text-stone-800' : 'text-white'}`}>
            {tripTitle}
          </span>
          <div className="flex gap-1">
            {itinerary.map((day) => (
              <button
                key={day.id}
                onClick={() => scrollToDay(day.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  scrolled
                    ? 'text-stone-600 hover:bg-stone-100'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {day.dayOfWeek.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[70vh] min-h-[400px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto w-full px-5 pb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {tripTitle}
          </h1>
          <p className="text-lg text-white/70 mt-1 font-medium">
            {tripSubtitle}
          </p>
          <p className="text-sm text-white/50 mt-3">
            {travelers}
          </p>
        </div>
      </header>

      {/* Days */}
      <main className="max-w-2xl mx-auto px-5 py-16">
        {itinerary.map((day) => (
          <section key={day.id} id={day.id} className="mb-20 scroll-mt-20">
            {/* Day image banner */}
            <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-6">
              <img
                src={day.image}
                alt={day.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="text-2xl font-bold text-white">
                  {day.dayOfWeek} — {day.subtitle}
                </h2>
                <p className="text-sm text-white/60 mt-0.5">{day.date}</p>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-8">
              {day.activities.map((activity) => (
                <div key={activity.id} className="group">
                  {/* Time + emoji line */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-base">{activity.emoji}</span>
                    <span className="text-sm font-semibold text-stone-900">
                      {activity.time}
                    </span>
                    {activity.duration && (
                      <span className="text-xs text-stone-400">
                        · {activity.duration}
                      </span>
                    )}
                    {activity.driveTime && (
                      <span className="text-xs text-stone-400">
                        · {activity.driveTime}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-stone-800 mb-1.5">
                    {activity.title}
                    {activity.optional && (
                      <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        Optional
                      </span>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Confirmed badge */}
                  {activity.confirmed && (
                    <p className="text-xs text-emerald-700 mt-2 font-medium">
                      {activity.confirmed}
                    </p>
                  )}

                  {/* Link */}
                  {activity.link && (
                    <a
                      href={activity.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-stone-400 hover:text-stone-600 mt-2 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-500 transition-colors"
                    >
                      {activity.link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p className="text-xs text-stone-400">
            {tripTitle} · {tripSubtitle} · {travelers}
          </p>
        </div>
      </footer>
    </>
  );
}
