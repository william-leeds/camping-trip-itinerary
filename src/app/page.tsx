'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { itinerary, tripTitle, tripSubtitle, travelers, heroImage, heroImageAlt, mapStops, packingList, tripStartDate, achievements } from '@/data/itinerary';
import { playStampSound, playUncollectSound, playMissionSound, playMissionCompleteSound, playDayCompleteSound, playVictoryFanfare, playMapSound, playCheckSound, playUncheckSound } from './sounds';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCountdown() {
  const start = new Date(tripStartDate + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function getTodayDayId(): string | null {
  const now = new Date();
  for (const day of itinerary) {
    const d = new Date(day.date + ', 2026');
    if (d.toDateString() === now.toDateString()) return day.id;
  }
  return null;
}

const STORAGE_KEY = 'leo-adventure-v2';

interface SavedState {
  questCompleted: Record<string, boolean>;
  packingChecked: Record<string, boolean>;
  earnedAchievements: Record<string, boolean>;
  mapTapped: Record<number, boolean>;
  soundOn: boolean;
}

function loadSaved(): SavedState {
  const empty: SavedState = { questCompleted: {}, packingChecked: {}, earnedAchievements: {}, mapTapped: {}, soundOn: true };
  if (typeof window === 'undefined') return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...empty, ...JSON.parse(raw) };
  } catch {}
  return empty;
}

// Sound wrapper — respects mute state
let _soundOn = true;
function updateSoundOn(on: boolean) { _soundOn = on; }
function sfx(fn: () => void) { if (_soundOn) fn(); }

// ─── Confetti Component ───────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];

function Confetti({ count = 60, onDone }: { count?: number; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone]);

  const pieces = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 8 + 4}px`,
      height: `${Math.random() * 12 + 4}px`,
      bg: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      radius: Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '2px' : '0',
      delay: `${Math.random() * 1.5}s`,
      duration: `${Math.random() * 2 + 2}s`,
    }))
  , [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: p.left,
            top: '-3%',
            width: p.width,
            height: p.height,
            backgroundColor: p.bg,
            borderRadius: p.radius,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [questCompleted, setQuestCompleted] = useState<Record<string, boolean>>({});
  const [expandedMissions, setExpandedMissions] = useState<Record<string, boolean>>({});
  const [packingChecked, setPackingChecked] = useState<Record<string, boolean>>({});
  const [justCompletedQuest, setJustCompletedQuest] = useState<string | null>(null);
  const [justCompletedDay, setJustCompletedDay] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mapAnimated, setMapAnimated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [earnedAchievements, setEarnedAchievements] = useState<Record<string, boolean>>({});
  const [mapTapped, setMapTapped] = useState<Record<number, boolean>>({});
  const [justEarnedAchievement, setJustEarnedAchievement] = useState<string | null>(null);
  const [soundOn, setSoundOnState] = useState(true);

  const mapRef = useRef<HTMLDivElement>(null);
  const prevDayCompleteRef = useRef<Record<string, boolean>>({});
  const prevTotalRef = useRef(0);

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOnState(next);
    updateSoundOn(next);
    // Play a quick test sound when turning on
    if (next) playStampSound();
  }, [soundOn]);

  // ─── Load from localStorage ───────────────────────────────────────────────
  useEffect(() => {
    const saved = loadSaved();
    setQuestCompleted(saved.questCompleted);
    setPackingChecked(saved.packingChecked);
    setEarnedAchievements(saved.earnedAchievements);
    setMapTapped(saved.mapTapped);
    setSoundOnState(saved.soundOn !== false);
    updateSoundOn(saved.soundOn !== false);
    setLoaded(true);
  }, []);

  // ─── Save to localStorage ────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ questCompleted, packingChecked, earnedAchievements, mapTapped, soundOn }));
  }, [questCompleted, packingChecked, earnedAchievements, mapTapped, soundOn, loaded]);

  // ─── Scroll handler ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Map animation via Intersection Observer ─────────────────────────────
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMapAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ─── Computed: quest & day progress ──────────────────────────────────────
  const dayMissionIds = useMemo(() =>
    itinerary.map(day => ({
      dayId: day.id,
      missionIds: day.quests.filter(q => q.leoMission).map(q => q.id),
    }))
  , []);

  const dayCompleted = useMemo(() =>
    Object.fromEntries(
      dayMissionIds.map(({ dayId, missionIds }) => [
        dayId,
        missionIds.length > 0 && missionIds.every(id => questCompleted[id]),
      ])
    )
  , [questCompleted, dayMissionIds]);

  const totalMissions = useMemo(() =>
    dayMissionIds.reduce((sum, d) => sum + d.missionIds.length, 0)
  , [dayMissionIds]);

  const completedMissions = Object.values(questCompleted).filter(Boolean).length;
  const allComplete = completedMissions === totalMissions && totalMissions > 0;
  const daysCompleted = Object.values(dayCompleted).filter(Boolean).length;

  const countdown = getCountdown();
  const todayDayId = getTodayDayId();

  // ─── Actions ─────────────────────────────────────────────────────────────

  const scrollToDay = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMission = useCallback((questId: string) => {
    sfx(playMissionSound);
    setExpandedMissions(prev => ({ ...prev, [questId]: !prev[questId] }));
  }, []);

  const completeMission = useCallback((questId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const wasCompleted = questCompleted[questId];

    if (wasCompleted) {
      // Uncomplete
      sfx(playUncollectSound);
      setQuestCompleted(prev => ({ ...prev, [questId]: false }));
      return;
    }

    // Complete!
    sfx(playMissionCompleteSound);
    const next = { ...questCompleted, [questId]: true };
    setQuestCompleted(next);
    setJustCompletedQuest(questId);
    setTimeout(() => setJustCompletedQuest(null), 800);

    // Check if a day just completed
    for (const { dayId, missionIds } of dayMissionIds) {
      const wasComplete = prevDayCompleteRef.current[dayId];
      const isNowComplete = missionIds.length > 0 && missionIds.every(id => next[id]);
      if (isNowComplete && !wasComplete) {
        setTimeout(() => {
          sfx(playDayCompleteSound);
          setJustCompletedDay(dayId);
          setTimeout(() => setJustCompletedDay(null), 1200);
        }, 500);
      }
    }

    // Check if ALL missions now complete
    const newTotal = Object.values(next).filter(Boolean).length;
    if (newTotal === totalMissions && prevTotalRef.current < totalMissions) {
      setTimeout(() => {
        sfx(playVictoryFanfare);
        setShowConfetti(true);
      }, 1000);
    }

    prevTotalRef.current = newTotal;
    prevDayCompleteRef.current = Object.fromEntries(
      dayMissionIds.map(({ dayId, missionIds }) => [
        dayId,
        missionIds.length > 0 && missionIds.every(id => next[id]),
      ])
    );
  }, [questCompleted, dayMissionIds, totalMissions]);

  const togglePacking = useCallback((id: string) => {
    const wasChecked = packingChecked[id];
    if (wasChecked) {
      sfx(playUncheckSound);
    } else {
      sfx(playCheckSound);
    }
    setPackingChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }, [packingChecked]);

  const packedCount = Object.values(packingChecked).filter(Boolean).length;
  const mapTappedCount = Object.values(mapTapped).filter(Boolean).length;
  const earnedCount = Object.values(earnedAchievements).filter(Boolean).length;

  // ─── Achievement checking ─────────────────────────────────────────────────
  const checkAndAwardAchievements = useCallback((
    nextQuest: Record<string, boolean>,
    nextPacking: Record<string, boolean>,
    nextMapTapped: Record<number, boolean>,
  ) => {
    const completed = Object.values(nextQuest).filter(Boolean).length;
    const newAchievements: Record<string, boolean> = { ...earnedAchievements };
    let anyNew = false;
    let latestNew: string | null = null;

    const tryAward = (id: string) => {
      if (!newAchievements[id]) { newAchievements[id] = true; anyNew = true; latestNew = id; }
    };

    if (completed >= 1) tryAward('first-mission');
    if (completed >= 5) tryAward('five-missions');
    if (completed >= Math.ceil(totalMissions / 2)) tryAward('half-missions');
    if (completed >= totalMissions) tryAward('all-missions');

    // Full day check
    for (const { missionIds } of dayMissionIds) {
      if (missionIds.length > 0 && missionIds.every(id => nextQuest[id])) {
        tryAward('full-day');
        break;
      }
    }

    // Packing
    if (Object.values(nextPacking).filter(Boolean).length >= packingList.length) tryAward('all-packed');

    // Map
    if (Object.values(nextMapTapped).filter(Boolean).length >= 5) tryAward('map-explorer');

    // Time-based (secret)
    const hour = new Date().getHours();
    if (completed > Object.values(earnedAchievements).filter(Boolean).length || anyNew) {
      if (hour >= 19) tryAward('night-owl');
      if (hour < 9) tryAward('early-bird');
    }

    // Speed demon — check if 3+ missions were completed (approximation: just earned one and total >= 3)
    if (completed >= 3 && !earnedAchievements['speed-demon']) {
      // We award this on the 3rd mission as a fun surprise
      const justCompletedCount = completed - (Object.values(earnedAchievements).length > 0 ? 0 : 0);
      if (completed >= 3) tryAward('speed-demon');
    }

    if (anyNew) {
      setEarnedAchievements(newAchievements);
      if (latestNew) {
        setTimeout(() => {
          sfx(playStampSound);
          setJustEarnedAchievement(latestNew);
          setTimeout(() => setJustEarnedAchievement(null), 2000);
        }, 300);
      }
    }
  }, [earnedAchievements, totalMissions, dayMissionIds]);

  // Trigger achievement checks when relevant state changes
  useEffect(() => {
    if (!loaded) return;
    checkAndAwardAchievements(questCompleted, packingChecked, mapTapped);
  }, [questCompleted, packingChecked, mapTapped, loaded, checkAndAwardAchievements]);

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}

      {/* Floating speaker button */}
      <button
        onClick={toggleSound}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-200 active:scale-90 flex items-center justify-center text-2xl ${
          soundOn
            ? 'bg-amber-500 text-white shadow-amber-500/30'
            : 'bg-stone-300 text-stone-500 shadow-stone-300/30'
        }`}
        aria-label={soundOn ? 'Mute sounds' : 'Unmute sounds'}
      >
        {soundOn ? '🔊' : '🔇'}
      </button>

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
          <div className="flex gap-1 items-center">
            {itinerary.map((day) => (
              <button
                key={day.id}
                onClick={() => scrollToDay(day.id)}
                className={`relative px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  scrolled
                    ? 'text-amber-800 hover:bg-amber-100'
                    : 'text-white/70 hover:text-white'
                } ${todayDayId === day.id ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}
              >
                {day.mapEmoji}
                {dayCompleted[day.id] && (
                  <span className="absolute -top-1 -right-1 text-[8px]">✅</span>
                )}
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
          <p className="text-xs text-amber-300/50 mt-2">
            🔊 Tap things to hear sounds!
          </p>
        </div>
      </header>

      {/* Countdown */}
      <div className="max-w-2xl mx-auto px-5 -mt-6 relative z-20">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 shadow-lg text-center">
          {countdown > 1 ? (
            <>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Adventure begins in</p>
              <p className="text-5xl font-black text-white animate-count-bounce">{countdown}</p>
              <p className="text-white font-bold text-lg mt-1">
                {countdown === 1 ? 'sleep' : 'sleeps'} to go!
              </p>
            </>
          ) : countdown === 1 ? (
            <>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Adventure begins</p>
              <p className="text-4xl font-black text-white animate-count-bounce">TOMORROW!</p>
              <p className="text-white font-bold text-sm mt-1">Get your explorer pack ready!</p>
            </>
          ) : countdown === 0 ? (
            <>
              <p className="text-4xl font-black text-white animate-count-bounce">ADVENTURE DAY!</p>
              <p className="text-white font-bold text-sm mt-1">Let&apos;s GOOOOO! 🚗💨</p>
            </>
          ) : countdown >= -3 ? (
            <>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Adventure in progress!</p>
              <p className="text-3xl font-black text-white">Day {Math.abs(countdown) + 1} of 4</p>
              <p className="text-white font-bold text-sm mt-1">Keep exploring, Leo! 🌟</p>
            </>
          ) : (
            <>
              <p className="text-3xl font-black text-white">What an Adventure! 🏆</p>
              <p className="text-white font-bold text-sm mt-1">You did it, explorer!</p>
            </>
          )}
        </div>
      </div>

      {/* Treasure Map */}
      <div className="max-w-2xl mx-auto px-5 mt-6" ref={mapRef}>
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-lg">
          <h2 className="text-center text-amber-900 font-extrabold text-lg mb-4">
            🗺️ The Adventure Map
          </h2>
          <p className="text-center text-amber-700/60 text-xs mb-3">🔊 Tap the places to hear them!</p>
          <svg viewBox="0 0 100 100" className="w-full h-auto" style={{ maxHeight: '300px' }}>
            {/* Parchment background */}
            <rect x="0" y="0" width="100" height="100" fill="#fef3c7" rx="4" />

            {/* Dotted trail path — animated */}
            <path
              d={`M ${mapStops[0].x} ${mapStops[0].y} ${mapStops.slice(1, -1).map(s => `L ${s.x} ${s.y}`).join(' ')}`}
              fill="none"
              stroke="#92400e"
              strokeWidth="0.8"
              strokeDasharray={mapAnimated ? '2 1.5' : '0'}
              strokeLinecap="round"
              style={{
                strokeDashoffset: 0,
                transition: 'stroke-dasharray 2s ease-in-out',
              }}
              opacity={mapAnimated ? 1 : 0}
            />
            {/* Return path */}
            <path
              d={`M ${mapStops[mapStops.length - 2].x} ${mapStops[mapStops.length - 2].y} C 70 60, 40 30, ${mapStops[mapStops.length - 1].x} ${mapStops[mapStops.length - 1].y}`}
              fill="none"
              stroke="#92400e"
              strokeWidth="0.5"
              strokeDasharray="1.5 2"
              opacity={mapAnimated ? 0.4 : 0}
              style={{ transition: 'opacity 1s ease-in-out 1.5s' }}
            />

            {/* Ocean area */}
            <ellipse cx="10" cy="70" rx="12" ry="20" fill="#bfdbfe" opacity="0.3" />
            <text x="6" y="70" fontSize="2.5" fill="#60a5fa" opacity="0.5">🌊</text>

            {/* Map label */}
            <text x="50" y="6" fontSize="2" fill="#92400e" fontWeight="bold" textAnchor="middle" opacity="0.4">CALIFORNIA</text>

            {/* YOU ARE HERE — pulsing glow on today's stop */}
            {todayDayId && (() => {
              const today = itinerary.find(d => d.id === todayDayId);
              if (!today) return null;
              const stop = mapStops[today.mapStopIndex];
              return (
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="5"
                  fill="#f59e0b"
                  className="animate-pulse-glow"
                />
              );
            })()}

            {/* Stop markers — ALL tappable including Home return */}
            {mapStops.map((stop, i) => {
              // Skip the duplicate home at the end if it's the same as index 0
              if (i === mapStops.length - 1) return null;
              return (
                <g
                  key={`${stop.name}-${i}`}
                  onClick={() => { sfx(() => playMapSound(i)); setMapTapped(prev => ({ ...prev, [i]: true })); }}
                  style={{ cursor: 'pointer' }}
                  opacity={mapAnimated ? 1 : 0}
                  className="transition-opacity duration-500"
                >
                  {/* Larger tap target */}
                  <circle cx={stop.x} cy={stop.y} r="6" fill="transparent" />
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
              );
            })}

            {/* X marks the treasure */}
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

      {/* Explorer's Pack — Packing Checklist */}
      <div className="max-w-2xl mx-auto px-5 mt-6">
        <div className="bg-emerald-900 rounded-2xl p-5 shadow-lg">
          <h2 className="text-emerald-200 font-extrabold text-sm uppercase tracking-widest mb-1 text-center">
            🎒 Explorer&apos;s Pack
          </h2>
          <p className="text-emerald-400/60 text-xs mb-4 text-center">
            🔊 Tap each item when it&apos;s packed!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {packingList.map((item) => (
              <button
                key={item.id}
                onClick={() => togglePacking(item.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 text-left active:scale-[0.97] ${
                  packingChecked[item.id]
                    ? 'bg-emerald-500/30 border-2 border-emerald-400/50'
                    : 'bg-emerald-800/50 border-2 border-transparent hover:border-emerald-600/30'
                }`}
              >
                <span className={`text-lg transition-all ${packingChecked[item.id] ? '' : 'grayscale opacity-50'}`}>
                  {item.emoji}
                </span>
                <span className={`text-xs font-bold transition-colors ${
                  packingChecked[item.id] ? 'text-emerald-200 line-through' : 'text-emerald-400/70'
                }`}>
                  {item.label}
                </span>
                {packingChecked[item.id] && (
                  <span className="text-emerald-400 text-xs ml-auto">✓</span>
                )}
              </button>
            ))}
          </div>
          <p className="text-emerald-400 text-xs mt-4 font-bold text-center">
            {packedCount === 0
              ? 'Nothing packed yet — let\'s get ready!'
              : packedCount === packingList.length
              ? '🎉 ALL PACKED! Ready for adventure!'
              : `${packedCount} of ${packingList.length} items packed!`}
          </p>
        </div>
      </div>

      {/* Adventure Passport — All stamps */}
      <div className="max-w-2xl mx-auto px-5 mt-6">
        <div className="bg-amber-900 rounded-2xl p-5 shadow-lg">
          <h2 className="text-amber-200 font-extrabold text-sm uppercase tracking-widest mb-1 text-center">
            🛂 Leo&apos;s Adventure Passport
          </h2>
          <p className="text-amber-400/60 text-xs mb-4 text-center">
            Complete missions to earn stamps!
          </p>

          {/* Overall progress bar */}
          <div className="mb-5">
            <div className="flex justify-between text-xs text-amber-400/80 font-bold mb-1">
              <span>🎖️ {completedMissions} of {totalMissions} stamps</span>
              <span>{Math.round((completedMissions / totalMissions) * 100)}%</span>
            </div>
            <div className="h-3 bg-amber-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(completedMissions / totalMissions) * 100}%` }}
              />
            </div>
          </div>

          {/* Stamp collection grouped by day */}
          {itinerary.map((day) => {
            const questsWithMissions = day.quests.filter(q => q.leoMission && q.questStamp);
            const dayDone = dayCompleted[day.id];
            const dayProgress = questsWithMissions.filter(q => questCompleted[q.id]).length;

            return (
              <div key={day.id} className="mb-4 last:mb-0">
                {/* Day header with day stamp */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xl transition-all duration-300 ${dayDone ? '' : 'grayscale opacity-50'} ${justCompletedDay === day.id ? 'animate-stamp-pop' : ''}`}>
                    {day.stamp}
                  </span>
                  <span className={`text-xs font-bold ${dayDone ? 'text-amber-200' : 'text-amber-500/60'}`}>
                    Day {day.id === 'saturday' ? 1 : day.id === 'sunday' ? 2 : day.id === 'monday' ? 3 : 4} — {day.stampName}
                  </span>
                  <span className="text-[10px] text-amber-500/50 ml-auto">
                    {dayProgress}/{questsWithMissions.length}
                  </span>
                </div>

                {/* Quest stamps grid */}
                <div className="flex flex-wrap gap-1.5 ml-7">
                  {questsWithMissions.map((quest) => {
                    const earned = questCompleted[quest.id];
                    const justDone = justCompletedQuest === quest.id;
                    return (
                      <div
                        key={quest.id}
                        className={`flex flex-col items-center w-14 p-1.5 rounded-lg transition-all duration-300 ${
                          earned
                            ? 'bg-amber-500/20'
                            : 'bg-amber-800/30 opacity-40'
                        } ${justDone ? 'animate-stamp-pop' : ''}`}
                        title={quest.questStampName}
                      >
                        <span className={`text-lg transition-all ${earned ? '' : 'grayscale'}`}>
                          {quest.questStamp}
                        </span>
                        <span className={`text-[8px] font-bold text-center leading-tight mt-0.5 ${
                          earned ? 'text-amber-300' : 'text-amber-600/40'
                        }`}>
                          {quest.questStampName}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Day complete badge */}
                {dayDone && (
                  <div className="ml-7 mt-1.5">
                    <span className="text-[10px] font-bold text-emerald-400">✓ Day complete — {day.stampName} earned!</span>
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-4 pt-3 border-t border-amber-800">
            <p className="text-amber-400 text-xs font-bold text-center">
              {allComplete
                ? '🎉 ALL STAMPS COLLECTED! LEGENDARY EXPLORER! 🎉'
                : completedMissions === 0
                ? 'No stamps yet — the adventure awaits!'
                : `${completedMissions} of ${totalMissions} stamps collected!`}
            </p>
          </div>
        </div>
      </div>

      {/* Achievement Trophy Case */}
      <div className="max-w-2xl mx-auto px-5 mt-6">
        <div className="bg-purple-900 rounded-2xl p-5 shadow-lg">
          <h2 className="text-purple-200 font-extrabold text-sm uppercase tracking-widest mb-1 text-center">
            🏅 Trophy Case
          </h2>
          <p className="text-purple-400/60 text-xs mb-4 text-center">
            Special achievements — can you unlock them all?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {achievements.map((ach) => {
              const earned = earnedAchievements[ach.id];
              const justEarned = justEarnedAchievement === ach.id;
              return (
                <div
                  key={ach.id}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-500 ${
                    earned
                      ? 'bg-purple-500/30 shadow-md shadow-purple-500/20'
                      : 'bg-purple-800/40 opacity-50'
                  } ${justEarned ? 'animate-bounce' : ''}`}
                >
                  <span className={`text-2xl transition-all ${earned ? '' : 'grayscale'} ${justEarned ? 'animate-stamp-pop' : ''}`}>
                    {earned || !ach.secret ? ach.emoji : '❓'}
                  </span>
                  <span className={`text-[10px] font-bold text-center ${earned ? 'text-purple-200' : 'text-purple-400/50'}`}>
                    {earned || !ach.secret ? ach.name : '???'}
                  </span>
                  <span className={`text-[9px] text-center leading-tight ${earned ? 'text-purple-300/70' : 'text-purple-500/40'}`}>
                    {earned || !ach.secret ? ach.description : 'Secret achievement!'}
                  </span>
                  {earned && <span className="text-[9px] text-purple-400">✓</span>}
                </div>
              );
            })}
          </div>
          <p className="text-purple-400 text-xs mt-4 font-bold text-center">
            {earnedCount === 0
              ? 'No trophies yet — start your adventure!'
              : earnedCount === achievements.length
              ? '🏆 ALL TROPHIES EARNED! ULTIMATE EXPLORER! 🏆'
              : `${earnedCount} of ${achievements.length} trophies earned!`}
          </p>
        </div>
      </div>

      {/* Days */}
      <main className="max-w-2xl mx-auto px-5 py-12">
        {itinerary.map((day) => {
          const isToday = todayDayId === day.id;
          const missionIds = day.quests.filter(q => q.leoMission).map(q => q.id);
          const dayDone = dayCompleted[day.id];
          const dayProgress = missionIds.filter(id => questCompleted[id]).length;

          return (
            <section
              key={day.id}
              id={day.id}
              className={`mb-20 scroll-mt-20 ${isToday ? 'ring-2 ring-amber-400 ring-offset-4 ring-offset-stone-50 rounded-2xl' : ''}`}
            >
              {/* Today banner */}
              {isToday && (
                <div className="bg-amber-400 text-amber-900 text-xs font-black uppercase tracking-widest text-center py-1.5 rounded-t-xl -mb-2 relative z-10">
                  📍 You Are Here — Today&apos;s Adventure!
                </div>
              )}

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
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className={`text-3xl ${dayDone ? '' : 'grayscale opacity-50'}`}>{day.stamp}</span>
                </div>
                {/* Day progress badge */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-white">
                    {dayProgress}/{missionIds.length} ⭐
                  </span>
                </div>
              </div>

              {/* Day stamp collection — shows earned quest stamps */}
              {dayProgress > 0 && (
                <div className="mb-6 flex flex-wrap gap-2 justify-center">
                  {day.quests.filter(q => q.questStamp && questCompleted[q.id]).map(q => (
                    <span
                      key={q.id}
                      className="inline-flex items-center gap-1 bg-amber-100 border border-amber-300 rounded-full px-2.5 py-1 animate-stamp-pop"
                    >
                      <span className="text-sm">{q.questStamp}</span>
                      <span className="text-[10px] font-bold text-amber-800">{q.questStampName}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Quests */}
              <div className="space-y-6">
                {day.quests.map((quest) => {
                  const isCompleted = questCompleted[quest.id];
                  const isExpanded = expandedMissions[quest.id];
                  const isJustDone = justCompletedQuest === quest.id;

                  return (
                    <div
                      key={quest.id}
                      className={`group transition-all duration-300 ${
                        isCompleted ? 'pl-3 border-l-4 border-emerald-400' : ''
                      }`}
                    >
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
                        {isCompleted && quest.questStamp && (
                          <span className={`ml-auto text-lg ${isJustDone ? 'animate-stamp-pop' : ''}`}>
                            {quest.questStamp}
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

                      {/* Leo's Mission — tappable to reveal, completable! */}
                      {quest.leoMission && (
                        <div className="mt-2">
                          <button
                            onClick={() => !isCompleted && toggleMission(quest.id)}
                            className={`w-full text-left rounded-lg px-4 py-3 transition-all duration-200 active:scale-[0.98] border-2 ${
                              isCompleted
                                ? 'bg-emerald-50 border-emerald-300 shadow-md shadow-emerald-200/30'
                                : isExpanded
                                ? 'bg-amber-100 border-amber-400 shadow-md shadow-amber-200/50'
                                : 'bg-amber-50 border-amber-200 hover:border-amber-300'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                                    ✅ Mission Complete!
                                  </p>
                                  <span className="text-lg">{quest.questStamp}</span>
                                </div>
                                <p className="text-sm text-emerald-800 font-bold leading-relaxed mt-1 line-through opacity-70">
                                  {quest.leoMission}
                                </p>
                                <button
                                  onClick={(e) => completeMission(quest.id, e)}
                                  className="mt-2 text-xs text-emerald-600/60 hover:text-emerald-600 transition-colors"
                                >
                                  Undo
                                </button>
                              </>
                            ) : isExpanded ? (
                              <>
                                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">
                                  🔓 Leo&apos;s Mission
                                </p>
                                <p className="text-sm text-amber-900 font-bold leading-relaxed">
                                  {quest.leoMission}
                                </p>
                                <button
                                  onClick={(e) => completeMission(quest.id, e)}
                                  className="mt-3 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm py-2.5 rounded-lg transition-all active:scale-[0.97] shadow-md"
                                >
                                  {quest.questStamp} Complete Mission!
                                </button>
                              </>
                            ) : (
                              <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">
                                🔒 Tap for Leo&apos;s Mission! 🔊
                              </p>
                            )}
                          </button>
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
                  );
                })}
              </div>

              {/* Day complete celebration */}
              {dayDone && (
                <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-center shadow-lg">
                  <p className="text-3xl mb-2">{day.stamp}</p>
                  <p className="text-white font-extrabold text-lg">
                    Day {day.id === 'saturday' ? 1 : day.id === 'sunday' ? 2 : day.id === 'monday' ? 3 : 4} Complete!
                  </p>
                  <p className="text-white/80 text-sm font-medium mt-1">
                    &ldquo;{day.stampName}&rdquo; stamp earned!
                  </p>
                </div>
              )}
            </section>
          );
        })}
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
          <p className="text-amber-400/40 text-[10px] mt-3">
            {completedMissions} missions · {daysCompleted} day stamps · {earnedCount} trophies
          </p>
          {allComplete && earnedCount === achievements.length && (
            <p className="text-amber-300 font-bold text-xs mt-2 animate-pulse">
              🌟 ULTIMATE LEGENDARY EXPLORER STATUS 🌟
            </p>
          )}
        </div>
      </footer>
    </>
  );
}
