export interface Quest {
  id: string;
  emoji: string;
  time: string;
  duration?: string;
  title: string;
  description: string;
  leoMission?: string;
  questStamp?: string;
  questStampName?: string;
  driveTime?: string;
  link?: { label: string; url: string };
  optional?: boolean;
  confirmed?: string;
}

export interface Day {
  id: string;
  date: string;
  dayOfWeek: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  mapEmoji: string;
  stamp: string;
  stampName: string;
  mapStopIndex: number;
  quests: Quest[];
}

export const tripTitle = "Leo's Great Journey Home";
export const tripSubtitle = 'Mar 31, 2026';
export const travelers = 'Adventurers: Leo, Mama Rana & Captain William';
export const tripStartDate = '2026-03-31';

export const heroImage = 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1400&q=80';
export const heroImageAlt = 'Pacific Coast Highway driving north along the California coast';

export const mapStops: { name: string; emoji: string; x: number; y: number; image?: string }[] = [
  { name: 'Terranea', emoji: '🏰', x: 48, y: 95, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80' },
  { name: 'Bravoland', emoji: '🤠', x: 45, y: 68, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80' },
  { name: 'Casa de Fruta', emoji: '🍒', x: 32, y: 35, image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&q=80' },
  { name: 'Home!', emoji: '🏠', x: 30, y: 15 },
];

export const packingList = [
  { id: 'clothes', emoji: '👕', label: 'Clothes' },
  { id: 'toys', emoji: '🧸', label: 'Toys' },
  { id: 'croissant', emoji: '🥐', label: 'Croissant' },
];

export const itinerary: Day[] = [
  {
    id: 'tuesday',
    date: 'Mar 31',
    dayOfWeek: 'Tuesday',
    subtitle: 'The Great Journey Home',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80',
    imageAlt: 'Pacific Coast Highway driving north along the California coast',
    mapEmoji: '🚗',
    stamp: '🗺️',
    stampName: 'Road Trip Champion',
    mapStopIndex: 0,
    quests: [
      {
        id: 'tue-1',
        emoji: '☀️',
        time: '7:00 AM',
        duration: '~30 min',
        title: 'Breakfast & Goodbye Terranea',
        description: 'Quick breakfast at Terranea — grab something to go or a fast sit-down. Take one last look at the ocean before hitting the road.',
        leoMission: '📸 Mission: Take one last look at the ocean from the cliffs. Can you spot any dolphins saying goodbye?',
        questStamp: '📸',
        questStampName: 'Memory Keeper',
        link: { label: 'Terranea Resort', url: 'https://maps.google.com/?q=Terranea+Resort+Rancho+Palos+Verdes' },
      },
      {
        id: 'tue-2',
        emoji: '🧳',
        time: '7:30 AM',
        title: 'Check Out & Hit the Road',
        description: 'Pack up, check out, and load the car. Say goodbye to Terranea — the adventure isn\'t over yet! Head north on I-5 toward the Central Valley.',
        leoMission: '🧳 Mission: Help pack your own suitcase! Can you fit everything inside and zip it up?',
        questStamp: '🧳',
        questStampName: 'Pack Master',
        driveTime: '~2.5 hrs to Bravoland',
      },
      {
        id: 'tue-3',
        emoji: '🤠',
        time: '10:00 AM',
        duration: '~75 min',
        title: 'Bravoland at Bravo Farms',
        description: 'A wild western-themed roadside stop in the Central Valley! Old West town facades, giant animal statues, a cheese factory, and tons of quirky things to explore. Grab an early lunch — tri-tip sandwiches, burgers, and famous cheese curds.',
        leoMission: '🤠 Mission: Explore the whole Wild West town! Find the BIGGEST animal statue and stand next to it for a photo. Bonus: taste a cheese sample!',
        questStamp: '🤠',
        questStampName: 'Western Explorer',
        link: { label: 'Bravoland at Bravo Farms', url: 'https://maps.google.com/?q=Bravo+Farms+Kettleman+City+CA' },
      },
      {
        id: 'tue-4',
        emoji: '🚗',
        time: '11:15 AM',
        title: 'Drive to Casa de Fruta',
        description: 'Back on the road heading north and west through Pacheco Pass. Beautiful rolling hills and farmland. About 2 hours.',
        leoMission: '🗺️ Mission: Count how many different kinds of animals you see from the car window — cows, horses, sheep, birds… who can spot the most?',
        questStamp: '🔭',
        questStampName: 'Animal Spotter',
        driveTime: '~2 hrs to Casa de Fruta',
      },
      {
        id: 'tue-5',
        emoji: '🍒',
        time: '1:15 PM',
        duration: '~45 min',
        title: 'Casa de Fruta',
        description: 'A legendary California road trip stop near Pacheco Pass! Peacock park with real peacocks roaming free, a carousel, a train ride, fruit stands with dried fruit and candy, and tons of quirky shops. Perfect stretch-your-legs stop.',
        leoMission: '🦚 Mission: Find a REAL peacock and see if it will show you its feathers! Ride the carousel and the train. Bonus: pick out your favorite candy at the fruit stand!',
        questStamp: '🦚',
        questStampName: 'Peacock Finder',
        link: { label: 'Casa de Fruta on Google Maps', url: 'https://maps.google.com/?q=Casa+de+Fruta+Hollister+CA' },
      },
      {
        id: 'tue-6',
        emoji: '🚗',
        time: '2:00 PM',
        title: 'Final Stretch Home',
        description: 'The last leg! Head north on US-101 to San Francisco. About 1.5 hours to 2214 34th Avenue.',
        leoMission: '🗺️ Mission: You\'re the navigator now! Help Captain William find the way home! First one to spot the Golden Gate Bridge (or any SF landmark) wins!',
        questStamp: '🧭',
        questStampName: 'Navigator',
        driveTime: '~1.5 hrs to home',
      },
      {
        id: 'tue-7',
        emoji: '🏠',
        time: '3:30 PM',
        title: 'Home Sweet Home!',
        description: 'Pull into the driveway at 2214 34th Avenue. Unload, unpack, and start telling everyone about the adventure.',
        leoMission: '🏆 FINAL MISSION: Tell someone at home about your WHOLE adventure from start to finish! You did it, explorer!',
        questStamp: '🏆',
        questStampName: 'True Explorer',
        link: { label: 'Home', url: 'https://maps.google.com/?q=2214+34th+Avenue+San+Francisco+CA' },
      },
    ],
  },
];
