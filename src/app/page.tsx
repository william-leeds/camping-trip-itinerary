'use client';

import { useState, useEffect } from 'react';
import { itinerary, tripTitle, tripSubtitle, travelers, heroImage, heroImageAlt, mapStops } from '@/data/itinerary';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [collected, setCollected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDay = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleStamp = (dayId: string) => {
    setCollected((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const collectedCount = Object.values(collected).filter(Boolean).length;

  return (
    <>
      {/* Sticky nav */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-amber-50/95 backdrop-blur-md border-b border-amber-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between">
          <span className={`text-sm font-bold tracking-wide transition-colors ${scrolled ? 'text-amber-900' : 'text-white'}`}>
            🗺️ Leo&apos;s Adventure
          </span>
          <div className="flex gap-1">
            {itinerary.map((day) => (
              <button
                key={day.id}
                onClick={() => scrollToDay(day.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  scrolled
                    ? 'text-amber-800 hover:bg-amber-100'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {day.mapEmoji}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[75vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-amber-900/30 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto w-full px-5 pb-10">
          <p className="text-amber-300 text-sm font-bold uppercase tracking-widest mb-2">
            🧭 {tripSubtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {tripTitle}
          </h1>
          <p className="text-sm text-amber-200/70 mt-3">
            {travelers}
          </p>
        </div>
      </header>

      {/* Treasure Map */}
      <div className="max-w-2xl mx-auto px-5 -mt-6 relative z-20">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-lg">
          <h2 className="text-center text-amber-900 font-extrabold text-lg mb-4">
            🗺️ The Adventure Map
          </h2>
          <svg viewBox="0 0 100 100" className="w-full h-auto" style={{ maxHeight: '300px' }}>
            {/* Parchment background */}
            <rect x="0" y="0" width="100" height="100" fill="#fef3c7" rx="4" />

            {/* Dotted trail path */}
            <path
              d={`M ${mapStops[0].x} ${mapStops[0].y} ${mapStops.slice(1, -1).map(s => `L ${s.x} ${s.y}`).join(' ')}`}
              fill="none"
              stroke="#92400e"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
              strokeLinecap="round"
            />
            {/* Return path (dashed lighter) */}
            <path
              d={`M ${mapStops[mapStops.length - 2].x} ${mapStops[mapStops.length - 2].y} C 70 60, 40 30, ${mapStops[mapStops.length - 1].x} ${mapStops[mapStops.length - 1].y}`}
              fill="none"
              stroke="#92400e"
              strokeWidth="0.5"
              strokeDasharray="1.5 2"
              opacity="0.4"
            />

            {/* Ocean area */}
            <ellipse cx="10" cy="70" rx="12" ry="20" fill="#bfdbfe" opacity="0.3" />
            <text x="6" y="70" fontSize="2.5" fill="#60a5fa" opacity="0.5">🌊</text>

            {/* Map labels */}
            <text x="50" y="6" fontSize="2" fill="#92400e" fontWeight="bold" textAnchor="middle" opacity="0.4">CALIFORNIA</text>

            {/* Stop markers */}
            {mapStops.slice(0, -1).map((stop, i) => (
              <g key={stop.name}>
                {/* Marker glow */}
                <circle cx={stop.x} cy={stop.y} r="4" fill="#fbbf24" opacity="0.3" />
                {/* Marker */}
                <circle cx={stop.x} cy={stop.y} r="2.5" fill="#fef3c7" stroke="#92400e" strokeWidth="0.5" />
                <text x={stop.x} y={stop.y + 1} fontSize="3" textAnchor="middle" dominantBaseline="middle">
                  {stop.emoji}
                </text>
                {/* Label */}
                <text
                  x={stop.x + (i === 0 ? 5 : i === 4 ? 5 : -1)}
                  y={stop.y + (i === 0 ? -4 : i === 2 ? -4 : i === 4 ? -5 : 6)}
                  fontSize="2.2"
                  fill="#78350f"
                  fontWeight="bold"
                  textAnchor={i === 0 ? 'start' : i === 4 ? 'start' : 'start'}
                >
                  {stop.name}
                </text>
                {/* Day number */}
                {i > 0 && i < 5 && (
                  <text
                    x={stop.x + (i === 4 ? 5 : -1)}
                    y={stop.y + (i === 2 ? -2 : i === 4 ? -3 : 8.5)}
                    fontSize="1.8"
                    fill="#92400e"
                    opacity="0.6"
                  >
                    Day {i <= 2 ? 1 : i === 3 ? 2 : '3–4'}
                  </text>
                )}
              </g>
            ))}

            {/* X marks the treasure at Terranea */}
            <text x={mapStops[4].x - 0.5} y={mapStops[4].y + 7} fontSize="3" fill="#dc2626" fontWeight="bold" opacity="0.7">
              ✕
            </text>
            <text x={mapStops[4].x + 2} y={mapStops[4].y + 7.5} fontSize="1.8" fill="#dc2626" opacity="0.6">
              treasure!
            </text>

            {/* Compass rose */}
            <g transform="translate(85, 15)">
              <circle cx="0" cy="0" r="5" fill="#fef3c7" stroke="#92400e" strokeWidth="0.3" />
              <text x="0" y="-2" fontSize="2" textAnchor="middle" fill="#92400e" fontWeight="bold">N</text>
              <text x="0" y="4" fontSize="1.5" textAnchor="middle" fill="#92400e">S</text>
              <text x="3" y="1" fontSize="1.5" textAnchor="middle" fill="#92400e">E</text>
              <text x="-3" y="1" fontSize="1.5" textAnchor="middle" fill="#92400e">W</text>
              <line x1="0" y1="-4" x2="0" y2="3" stroke="#92400e" strokeWidth="0.3" />
              <line x1="-3" y1="0" x2="3" y2="0" stroke="#92400e" strokeWidth="0.3" />
            </g>
          </svg>
        </div>
      </div>

      {/* Stamp Passport */}
      <div className="max-w-2xl mx-auto px-5 mt-6">
        <div className="bg-amber-900 rounded-2xl p-5 text-center shadow-lg">
          <h2 className="text-amber-200 font-extrabold text-sm uppercase tracking-widest mb-1">
            🛂 Leo&apos;s Adventure Passport
          </h2>
          <p className="text-amber-400/60 text-xs mb-4">
            Tap a stamp when you complete each day!
          </p>
          <div className="flex justify-center gap-3 sm:gap-5">
            {itinerary.map((day) => (
              <button
                key={day.id}
                onClick={() => toggleStamp(day.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${
                  collected[day.id]
                    ? 'bg-amber-500/30 scale-110 shadow-lg shadow-amber-500/20'
                    : 'bg-amber-800/50 opacity-50 grayscale hover:opacity-70'
                }`}
              >
                <span className="text-3xl sm:text-4xl">{day.stamp}</span>
                <span className={`text-xs font-bold ${collected[day.id] ? 'text-amber-200' : 'text-amber-500/50'}`}>
                  {day.stampName}
                </span>
                {collected[day.id] && (
                  <span className="text-amber-400 text-xs font-bold">✓ Collected!</span>
                )}
              </button>
            ))}
          </div>
          <p className="text-amber-400 text-xs mt-4 font-bold">
            {collectedCount === 0
              ? 'No stamps yet — the adventure awaits!'
              : collectedCount === 4
              ? '🎉 ALL STAMPS COLLECTED! You are a TRUE EXPLORER! 🎉'
              : `${collectedCount} of 4 stamps collected!`}
          </p>
        </div>
      </div>

      {/* Days */}
      <main className="max-w-2xl mx-auto px-5 py-12">
        {itinerary.map((day) => (
          <section key={day.id} id={day.id} className="mb-20 scroll-mt-20">
            {/* Day image banner */}
            <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-6">
              <img
                src={day.image}
                alt={day.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
                  Day {day.id === 'saturday' ? 1 : day.id === 'sunday' ? 2 : day.id === 'monday' ? 3 : 4} · {day.date}
                </p>
                <h2 className="text-2xl font-extrabold text-white">
                  {day.mapEmoji} {day.dayOfWeek} — {day.subtitle}
                </h2>
              </div>
              {/* Stamp badge */}
              <div className="absolute top-4 right-4">
                <span className="text-3xl">{day.stamp}</span>
              </div>
            </div>

            {/* Quests */}
            <div className="space-y-6">
              {day.quests.map((quest) => (
                <div key={quest.id} className="group">
                  {/* Time + emoji line */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-base">{quest.emoji}</span>
                    <span className="text-sm font-bold text-amber-900">
                      {quest.time}
                    </span>
                    {quest.duration && (
                      <span className="text-xs text-stone-400">
                        · {quest.duration}
                      </span>
                    )}
                    {quest.driveTime && (
                      <span className="text-xs text-stone-400">
                        · {quest.driveTime}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-stone-800 mb-1">
                    {quest.title}
                    {quest.optional && (
                      <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        Optional
                      </span>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {quest.description}
                  </p>

                  {/* Leo's Mission */}
                  {quest.leoMission && (
                    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                      <p className="text-sm text-amber-900 font-bold leading-relaxed">
                        {quest.leoMission}
                      </p>
                    </div>
                  )}

                  {/* Confirmed badge */}
                  {quest.confirmed && (
                    <p className="text-xs text-emerald-700 mt-2 font-medium">
                      {quest.confirmed}
                    </p>
                  )}

                  {/* Link */}
                  {quest.link && (
                    <a
                      href={quest.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-stone-400 hover:text-stone-600 mt-2 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-500 transition-colors"
                    >
                      {quest.link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 py-8">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p className="text-3xl mb-2">🏆</p>
          <p className="text-amber-200 font-bold text-sm">
            The End of One Adventure is the Beginning of Another
          </p>
          <p className="text-xs text-amber-400/50 mt-2">
            {tripTitle} · {tripSubtitle}
          </p>
        </div>
      </footer>
    </>
  );
}
