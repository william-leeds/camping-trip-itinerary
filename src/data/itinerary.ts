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
  { name: 'Terranea', emoji: '🏰', x: 55, y: 82, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80' },
  { name: 'Bravoland', emoji: '🤠', x: 45, y: 50, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80' },
  { name: 'Casa de Fruta', emoji: '🍒', x: 25, y: 30, image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&q=80' },
  { name: 'Home!', emoji: '🏠', x: 15, y: 18 },
];

export const packingList = [
  { id: 'snacks', emoji: '🍿', label: 'Road trip snacks' },
  { id: 'water', emoji: '💧', label: 'Water bottles' },
  { id: 'stuffie', emoji: '🧸', label: 'Stuffed animal friend' },
  { id: 'camera', emoji: '📸', label: 'Camera' },
  { id: 'blanket', emoji: '🛏️', label: 'Cozy blanket' },
  { id: 'tablet', emoji: '📱', label: 'Tablet & headphones' },
  { id: 'sunglasses', emoji: '🕶️', label: 'Sunglasses' },
  { id: 'jacket', emoji: '🧥', label: 'Warm jacket' },
  { id: 'souvenirs', emoji: '🐚', label: 'Souvenirs & shells' },
  { id: 'suitcase', emoji: '🧳', label: 'Suitcase packed & zipped' },
];

export interface Achievement {
  id: string;
  emoji: string;
  name: string;
  description: string;
  secret?: boolean;
}

export const achievements: Achievement[] = [
  { id: 'first-mission', emoji: '⭐', name: 'First Step', description: 'Complete your very first mission' },
  { id: 'five-missions', emoji: '🔥', name: 'On Fire', description: 'Complete 5 missions' },
  { id: 'half-missions', emoji: '🌟', name: 'Halfway Hero', description: 'Complete half of all missions' },
  { id: 'all-packed', emoji: '🎒', name: 'Ready to Go', description: 'Pack every item in the Explorer\'s Pack' },
  { id: 'map-explorer', emoji: '🗺️', name: 'Map Explorer', description: 'Tap every location on the adventure map' },
  { id: 'all-missions', emoji: '👑', name: 'Legendary Explorer', description: 'Complete ALL missions' },
  { id: 'speed-demon', emoji: '⚡', name: 'Speed Demon', description: 'Complete 3 missions in a row', secret: true },
  { id: 'road-warrior', emoji: '🚗', name: 'Road Warrior', description: 'Complete every driving mission', secret: true },
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
        time: '8:00 AM',
        duration: '~60 min',
        title: 'Last Morning at Terranea',
        description: 'Final breakfast at Terranea. Soak up the ocean views one more time. Catalina Kitchen or room service — your call.',
        leoMission: '📸 Mission: Take one last look at the ocean from the cliffs. Can you spot any dolphins saying goodbye?',
        questStamp: '📸',
        questStampName: 'Memory Keeper',
        link: { label: 'Terranea Resort', url: 'https://maps.google.com/?q=Terranea+Resort+Rancho+Palos+Verdes' },
      },
      {
        id: 'tue-2',
        emoji: '🏊',
        time: '9:00 AM',
        duration: '~60 min',
        title: 'Last Swim',
        description: 'One more dip in the pool before checkout. Make it count!',
        leoMission: '🏊 Mission: Do your BIGGEST splash ever — the farewell cannonball!',
        questStamp: '🏊',
        questStampName: 'Splash Master',
      },
      {
        id: 'tue-3',
        emoji: '🧳',
        time: '10:00 AM',
        title: 'Check Out & Hit the Road',
        description: 'Pack up, check out, and load the car. Say goodbye to Terranea — the adventure isn\'t over yet! Head north on I-5 toward the Central Valley.',
        leoMission: '🧳 Mission: Help pack your own suitcase! Can you fit everything inside and zip it up?',
        questStamp: '🧳',
        questStampName: 'Pack Master',
        driveTime: '~2.5 hrs to Bravoland',
      },
      {
        id: 'tue-4',
        emoji: '🤠',
        time: '12:30 PM',
        duration: '~90 min',
        title: 'Bravoland at Bravo Farms',
        description: 'A wild western-themed roadside stop in the Central Valley! Old West town facades, giant animal statues, a cheese factory, and tons of quirky things to explore. Grab lunch — tri-tip sandwiches, burgers, and famous cheese curds.',
        leoMission: '🤠 Mission: Explore the whole Wild West town! Find the BIGGEST animal statue and stand next to it for a photo. Bonus: taste a cheese sample!',
        questStamp: '🤠',
        questStampName: 'Western Explorer',
        link: { label: 'Bravo Farms on Google Maps', url: 'https://maps.google.com/?q=Bravo+Farms+Traver+CA' },
      },
      {
        id: 'tue-5',
        emoji: '🚗',
        time: '2:00 PM',
        title: 'Drive to Casa de Fruta',
        description: 'Back on the road heading north and west through Pacheco Pass. Beautiful rolling hills and farmland. About 2 hours.',
        leoMission: '🗺️ Mission: Count how many different kinds of animals you see from the car window — cows, horses, sheep, birds… who can spot the most?',
        questStamp: '🔭',
        questStampName: 'Animal Spotter',
        driveTime: '~2 hrs to Casa de Fruta',
      },
      {
        id: 'tue-6',
        emoji: '🍒',
        time: '4:00 PM',
        duration: '~60 min',
        title: 'Casa de Fruta',
        description: 'A legendary California road trip stop near Pacheco Pass! Peacock park with real peacocks roaming free, a carousel, a train ride, fruit stands with dried fruit and candy, a restaurant, and tons of quirky shops. The kids\' rides and animals make it a perfect stretch-your-legs stop.',
        leoMission: '🦚 Mission: Find a REAL peacock and see if it will show you its feathers! Ride the carousel and the train. Bonus: pick out your favorite candy at the fruit stand!',
        questStamp: '🦚',
        questStampName: 'Peacock Finder',
        link: { label: 'Casa de Fruta on Google Maps', url: 'https://maps.google.com/?q=Casa+de+Fruta+Hollister+CA' },
      },
      {
        id: 'tue-7',
        emoji: '🚗',
        time: '5:00 PM',
        title: 'Final Stretch Home',
        description: 'The last leg! Head north on US-101 to San Francisco. About 1.5 hours to 2214 34th Avenue.',
        leoMission: '🗺️ Mission: You\'re the navigator now! Help Captain William find the way home! First one to spot the Golden Gate Bridge (or any SF landmark) wins!',
        questStamp: '🧭',
        questStampName: 'Navigator',
        driveTime: '~1.5 hrs to home',
      },
      {
        id: 'tue-8',
        emoji: '🏠',
        time: '6:30 PM',
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
