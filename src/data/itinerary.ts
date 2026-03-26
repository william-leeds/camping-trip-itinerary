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

export const tripTitle = "Leo's Great California Adventure";
export const tripSubtitle = 'Mar 2026';
export const travelers = 'Adventurers: Leo, Mama Rana & Captain William';
export const tripStartDate = '2026-03-28';

export const heroImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80';
export const heroImageAlt = 'California coastline';

export const mapStops: { name: string; emoji: string; x: number; y: number; image?: string }[] = [
  { name: 'Bay Area', emoji: '🏠', x: 15, y: 18, image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80' },
  { name: 'Paso Robles', emoji: '🍇', x: 30, y: 45, image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
  { name: 'Almond Springs Ranch', emoji: '🐐', x: 38, y: 42, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80' },
  { name: 'Pismo Beach', emoji: '🐚', x: 28, y: 55, image: 'https://images.unsplash.com/photo-1520483691742-bada60a1a1f0?w=400&q=80' },
  { name: 'Terranea Resort', emoji: '🏰', x: 55, y: 82, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80' },
  { name: 'Home!', emoji: '🏠', x: 15, y: 18 },
];

export const packingList = [
  { id: 'swimsuit', emoji: '🩱', label: 'Swimsuit' },
  { id: 'sunscreen', emoji: '🧴', label: 'Sunscreen' },
  { id: 'beach-toys', emoji: '🏖️', label: 'Beach toys & bucket' },
  { id: 'water-shoes', emoji: '👟', label: 'Water shoes' },
  { id: 'binoculars', emoji: '🔭', label: 'Binoculars' },
  { id: 'stuffie', emoji: '🧸', label: 'Stuffed animal friend' },
  { id: 'camera', emoji: '📸', label: 'Camera' },
  { id: 'backpack', emoji: '🎒', label: 'Adventure backpack' },
  { id: 'jacket', emoji: '🧥', label: 'Warm jacket (for stargazing!)' },
  { id: 'flashlight', emoji: '🔦', label: 'Flashlight' },
  { id: 'snacks', emoji: '🍿', label: 'Road trip snacks' },
  { id: 'blanket', emoji: '🛏️', label: 'Cozy blanket' },
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
  { id: 'full-day', emoji: '💪', name: 'Day Crusher', description: 'Complete every mission in a single day' },
  { id: 'all-packed', emoji: '🎒', name: 'Ready to Go', description: 'Pack every item in the Explorer\'s Pack' },
  { id: 'map-explorer', emoji: '🗺️', name: 'Map Explorer', description: 'Tap every location on the adventure map' },
  { id: 'all-missions', emoji: '👑', name: 'Legendary Explorer', description: 'Complete ALL missions' },
  { id: 'speed-demon', emoji: '⚡', name: 'Speed Demon', description: 'Complete 3 missions in a row', secret: true },
  { id: 'night-owl', emoji: '🦉', name: 'Night Owl', description: 'Complete a mission after 7 PM', secret: true },
  { id: 'early-bird', emoji: '🐦', name: 'Early Bird', description: 'Complete a mission before 9 AM', secret: true },
];

export const itinerary: Day[] = [
  {
    id: 'saturday',
    date: 'Mar 28',
    dayOfWeek: 'Saturday',
    subtitle: 'Wine Country & Ranch Life',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
    imageAlt: 'Rolling vineyard hills in Paso Robles wine country',
    mapEmoji: '🍇',
    stamp: '🐐',
    stampName: 'Ranch Explorer',
    mapStopIndex: 2,
    quests: [
      {
        id: 'sat-1',
        emoji: '🚗',
        time: '10:00 AM',
        title: 'Depart San Francisco',
        description: 'Head south on US-101 toward Paso Robles wine country. About 3.5 hours. Pack snacks and entertainment for Leo — it gets warmer as you go south.',
        leoMission: '🗺️ Mission: Count how many tractors you see from the car window!',
        questStamp: '🚜',
        questStampName: 'Tractor Spotter',
        driveTime: '~3.5 hrs to Paso Robles',
      },
      {
        id: 'sat-2',
        emoji: '🍺',
        time: '1:30 PM',
        duration: '~90 min',
        title: 'Lunch — Firestone Walker Brewing',
        description: 'Iconic Paso Robles craft brewery with a huge taproom, beer garden, and great food. Wood-fired pizzas, burgers, and BBQ. The outdoor patio is spacious and kid-friendly with plenty of room for Leo to roam.',
        leoMission: '🍕 Mission: Find the biggest pizza in the restaurant! Bonus: spot all the giant beer tanks!',
        questStamp: '🍕',
        questStampName: 'Pizza Scout',
        link: { label: 'Firestone Walker on Google Maps', url: 'https://maps.google.com/?q=Firestone+Walker+Brewing+Company+Paso+Robles' },
      },
      {
        id: 'sat-3',
        emoji: '🍷',
        time: '3:00 PM',
        duration: '~90 min',
        title: 'Halter Ranch Vineyard',
        description: 'A stunning 2,000-acre ranch and vineyard in the hills west of Paso Robles. Beautiful tasting room, sprawling oak-studded grounds, and a historic 1880s homestead. Adults enjoy world-class wines while Leo explores the wide-open spaces.',
        leoMission: '🌳 Mission: Find the BIGGEST oak tree on the ranch! How many arms wide is it? Bonus: spot any animals hiding in the hills!',
        questStamp: '🌳',
        questStampName: 'Oak Explorer',
        driveTime: '15 min from downtown',
        link: { label: 'Halter Ranch on Google Maps', url: 'https://maps.google.com/?q=Halter+Ranch+Vineyard+Paso+Robles' },
      },
      {
        id: 'sat-4',
        emoji: '🏡',
        time: '5:00 PM',
        title: 'Drive to Historic Almond Springs',
        description: 'Head to your glamping cabins at the Miller Moth Ranch — a 5th-generation working ranch. 77990 Ranchita Canyon Road, San Miguel. Last 2 miles on dirt road. Cell service is spotty; download directions ahead.',
        leoMission: '🤠 Mission: You\'re arriving at a REAL ranch! Keep your eyes peeled for animals on the drive in!',
        questStamp: '🤠',
        questStampName: 'Ranch Rider',
        driveTime: '25 min from downtown Paso (16 miles)',
        link: { label: 'Almond Springs on Google Maps', url: 'https://maps.google.com/?q=77990+Ranchita+Canyon+Road+San+Miguel+CA+93451' },
      },
      {
        id: 'sat-5',
        emoji: '🐐',
        time: '6:00 PM',
        duration: '~90 min',
        title: 'Settle In & Explore the Ranch',
        description: 'Check into your glamping cabin (queen bed, A/C, mini fridge, Keurig). Explore the Lounge Barn, Legends Saloon, Antique Barns, and Game Room. See the ranch animals — Angus cattle, Boer goats, and more.',
        leoMission: '🐄 Mission: Meet ALL the ranch animals! Can you find: goats, cows, and anything else? Draw your favorite one later!',
        questStamp: '🐄',
        questStampName: 'Animal Whisperer',
        confirmed: 'Check-in 3–8 PM',
      },
      {
        id: 'sat-6',
        emoji: '🔥',
        time: '7:30 PM',
        title: 'Campfire & Stargazing',
        description: 'Campfires allowed — wood bundles available. Make s\'mores under the stars. Zero light pollution; the Milky Way is incredible. Café lighting adds a magical glow.',
        leoMission: '⭐ Mission: Find the Big Dipper in the sky! It looks like a giant soup ladle. Also: make the PERFECT s\'more!',
        questStamp: '⭐',
        questStampName: 'Star Gazer',
      },
    ],
  },
  {
    id: 'sunday',
    date: 'Mar 29',
    dayOfWeek: 'Sunday',
    subtitle: 'Coastal Drive to Terranea',
    image: 'https://images.unsplash.com/photo-1520483691742-bada60a1a1f0?w=1200&q=80',
    imageAlt: 'Pismo Beach California coastline',
    mapEmoji: '🐚',
    stamp: '🐚',
    stampName: 'Shell Collector',
    mapStopIndex: 4,
    quests: [
      {
        id: 'sun-1',
        emoji: '☀️',
        time: '8:00 AM',
        duration: '~2 hrs',
        title: 'Ranch Morning & Breakfast',
        description: 'Leisurely morning at the ranch. Communal kitchen for breakfast or Keurig in the cabin. Let Leo say goodbye to the goats. Pack up — checkout is 11 AM.',
        leoMission: '👋 Mission: Say goodbye to each animal by name (make up names if you have to)!',
        questStamp: '👋',
        questStampName: 'Animal Friend',
      },
      {
        id: 'sun-2',
        emoji: '🏖️',
        time: '11:00 AM',
        duration: '~90 min',
        title: 'Pismo Beach',
        description: 'Wide sandy California beach. Build sandcastles, splash in waves, collect shells. Check if the Monarch Butterfly Grove is open (seasonal, best Oct–Feb). Bring beach toys and sunscreen.',
        leoMission: '🏰 Mission: Build the TALLEST sandcastle on the entire beach! Collect 5 different shells for your treasure bag!',
        questStamp: '🏰',
        questStampName: 'Sandcastle King',
        driveTime: '~1 hr from Almond Springs',
        link: { label: 'Pismo Beach on Google Maps', url: 'https://maps.google.com/?q=Pismo+Beach+California' },
      },
      {
        id: 'sun-3',
        emoji: '🦞',
        time: '12:30 PM',
        duration: '~60 min',
        title: 'Lunch — Splash Cafe, Pismo Beach',
        description: 'Famous clam chowder in a sourdough bread bowl. A Pismo institution — expect a line but it moves fast. Fish & chips also excellent.',
        leoMission: '🍞 Mission: Try eating your SOUP BOWL! (It\'s made of bread — you can eat the whole thing!)',
        questStamp: '🍞',
        questStampName: 'Soup Bowl Champ',
        link: { label: 'Splash Cafe on Google Maps', url: 'https://maps.google.com/?q=Splash+Cafe+Pismo+Beach' },
      },
      {
        id: 'sun-4',
        emoji: '🚗',
        time: '2:00 PM',
        title: 'Drive to Terranea Resort',
        description: 'Head south to Rancho Palos Verdes through gorgeous coastline. Leo will probably nap — good time for a long drive.',
        leoMission: '😴 Mission: Nap time! When you wake up, you\'ll be at a CASTLE by the ocean!',
        questStamp: '😴',
        questStampName: 'Dream Traveler',
        driveTime: '~3 hrs from Pismo Beach',
      },
      {
        id: 'sun-5',
        emoji: '🏰',
        time: '5:00 PM',
        title: 'Check In — Terranea Resort',
        description: 'Arrive at your luxury oceanfront resort on the cliffs of Rancho Palos Verdes. Multiple pools, beach access, stunning coastal views.',
        leoMission: '🏰 Mission: Explore the castle! Find the pools, the beach, and the secret paths along the cliffs!',
        questStamp: '🔑',
        questStampName: 'Castle Explorer',
        link: { label: 'Terranea Resort', url: 'https://maps.google.com/?q=Terranea+Resort+Rancho+Palos+Verdes' },
      },
      {
        id: 'sun-6',
        emoji: '🌅',
        time: '5:30 PM',
        duration: '~45 min',
        title: 'Coastal Trail Walk',
        description: 'Golden-hour walk along the cliffs. Breathtaking views, tide pools visible from above. Easy and flat enough for Leo.',
        leoMission: '🔭 Mission: Be a cliff explorer! Can you spot any dolphins, seals, or pelicans from up high?',
        questStamp: '🔭',
        questStampName: 'Cliff Scout',
      },
      {
        id: 'sun-7',
        emoji: '🍽️',
        time: '7:00 PM',
        duration: '~90 min',
        title: 'Dinner — Nelson\'s at Terranea',
        description: 'Casual oceanfront dining with outdoor seating and Pacific sunset views. Fresh seafood, kid-friendly menu.',
        leoMission: '🌅 Mission: Watch the sun disappear into the ocean! Count how long it takes from when it touches the water.',
        questStamp: '🌅',
        questStampName: 'Sunset Watcher',
        link: { label: 'Nelson\'s at Terranea', url: 'https://maps.google.com/?q=Nelsons+Restaurant+Terranea+Resort' },
      },
    ],
  },
  {
    id: 'monday',
    date: 'Mar 30',
    dayOfWeek: 'Monday',
    subtitle: 'Pool Day & Tide Pools',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    imageAlt: 'Luxury resort pool overlooking the ocean',
    mapEmoji: '🦀',
    stamp: '🦀',
    stampName: 'Tide Pool Master',
    mapStopIndex: 4,
    quests: [
      {
        id: 'mon-1',
        emoji: '😴',
        time: '8:30 AM',
        duration: '~90 min',
        title: 'Sleep In & Breakfast',
        description: 'No alarm. Breakfast at Catalina Kitchen or room service with ocean views.',
        leoMission: '🥞 Mission: Order your dream breakfast! Pancakes? Waffles? Both?!',
        questStamp: '🥞',
        questStampName: 'Breakfast Boss',
      },
      {
        id: 'mon-2',
        emoji: '🏊',
        time: '10:30 AM',
        duration: '~3 hrs',
        title: 'Pool Day',
        description: 'Terranea has a fantastic pool complex with shallow areas perfect for Leo. Pool bar and snacks nearby. This is the main event — no rush.',
        leoMission: '🏊 Mission: Practice your biggest splash! Can you swim to Mama underwater? Jump in at least 10 times!',
        questStamp: '🏊',
        questStampName: 'Splash Champion',
      },
      {
        id: 'mon-3',
        emoji: '🏖️',
        time: '1:30 PM',
        duration: '~90 min',
        title: 'Beach & Sandcastles',
        description: 'Head to the resort beach. Rocky coves and clear water — more dramatic than typical LA beaches.',
        leoMission: '🏗️ Mission: Build a sandcastle with a MOAT! Fill the moat with ocean water using a bucket. Bonus: decorate it with shells!',
        questStamp: '🏗️',
        questStampName: 'Master Builder',
      },
      {
        id: 'mon-4',
        emoji: '🦀',
        time: '3:30 PM',
        duration: '~60 min',
        title: 'Tide Pool Exploration',
        description: 'The rocky coast has incredible tide pools — starfish, sea anemones, hermit crabs, small fish. Wear water shoes (rocks are slippery). Time it around low tide. Gently observe, don\'t disturb.',
        leoMission: '🔍 Mission: The ULTIMATE treasure hunt! Find: a starfish ⭐, a hermit crab 🦀, a sea anemone 🌸, and a tiny fish 🐟. Gentle hands only — these are living treasures!',
        questStamp: '🔍',
        questStampName: 'Tide Pool Detective',
      },
      {
        id: 'mon-5',
        emoji: '🚿',
        time: '5:00 PM',
        duration: '~90 min',
        title: 'Rest & Refresh',
        description: 'Back to the room. Shower off salt water. Rest before dinner.',
        leoMission: '🫧 Mission: Take the bubbliest bath ever! Make a bubble beard and a bubble hat!',
        questStamp: '🫧',
        questStampName: 'Bubble King',
      },
      {
        id: 'mon-6',
        emoji: '🍽️',
        time: '7:00 PM',
        duration: '~90 min',
        title: 'Dinner — Your Choice',
        description: 'Mar\'sel for a special occasion vibe — fine dining with ocean views. Or Sea Beans for casual fresh seafood, great for families.',
        leoMission: '🎉 Mission: This is our FAREWELL FEAST! Tell everyone your favorite part of the whole adventure!',
        questStamp: '🎉',
        questStampName: 'Story Teller',
        link: { label: 'mar\'sel at Terranea', url: 'https://maps.google.com/?q=marsel+Restaurant+Terranea' },
      },
    ],
  },
  {
    id: 'tuesday',
    date: 'Mar 31',
    dayOfWeek: 'Tuesday',
    subtitle: 'Journey Home',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80',
    imageAlt: 'Pacific Coast Highway driving north along the California coast',
    mapEmoji: '🏠',
    stamp: '🗺️',
    stampName: 'Adventure Complete',
    mapStopIndex: 0,
    quests: [
      {
        id: 'tue-1',
        emoji: '☀️',
        time: '8:00 AM',
        duration: '~60 min',
        title: 'Final Breakfast',
        description: 'Last breakfast at Terranea. Soak up the ocean views one more time.',
        leoMission: '📸 Mission: Take one last look at the ocean. Can you remember this view forever?',
        questStamp: '📸',
        questStampName: 'Memory Keeper',
      },
      {
        id: 'tue-2',
        emoji: '🏊',
        time: '9:00 AM',
        duration: '~90 min',
        title: 'Last Swim & Beach Time',
        description: 'One more dip in the pool or a final beach walk. Collect a few more shells for the road.',
        leoMission: '🐚 Mission: Find ONE special shell to bring home as your adventure souvenir!',
        questStamp: '🐚',
        questStampName: 'Shell Seeker',
      },
      {
        id: 'tue-3',
        emoji: '🧳',
        time: '10:30 AM',
        title: 'Check Out',
        description: 'Pack up, check out by 11 AM. Say goodbye to Terranea.',
        leoMission: '🧳 Mission: Help pack your own suitcase! Can you fit everything inside and zip it up?',
        questStamp: '🧳',
        questStampName: 'Pack Master',
      },
      {
        id: 'tue-4',
        emoji: '🚗',
        time: '11:00 AM',
        title: 'Begin Drive North',
        description: 'Start the journey back to the Bay Area. About 5–6 hours total with stops.',
        leoMission: '🗺️ Mission: You\'re the navigator now! Help Captain William find the way home!',
        questStamp: '🧭',
        questStampName: 'Navigator',
        driveTime: '~5–6 hrs total to Bay Area',
      },
      {
        id: 'tue-5',
        emoji: '🍽️',
        time: '1:00 PM',
        duration: '~75 min',
        title: 'Lunch Stop — Santa Barbara or SLO',
        description: 'Santa Barbara has beautiful State Street. San Luis Obispo is a charming college town. Both roughly halfway.',
        leoMission: '🌴 Mission: Spot a palm tree, a seagull, and something PINK! First one to find all three wins!',
        questStamp: '🌴',
        questStampName: 'Sharp Eye',
        optional: true,
        link: { label: 'Downtown Santa Barbara', url: 'https://maps.google.com/?q=State+Street+Santa+Barbara+California' },
      },
      {
        id: 'tue-6',
        emoji: '🏠',
        time: '5:30 PM',
        title: 'Arrive Home — Adventure Complete!',
        description: 'Pull into the driveway. Unload, unpack, and start planning the next one.',
        leoMission: '🏆 FINAL MISSION: Tell someone at home about your WHOLE adventure from start to finish! You did it, explorer!',
        questStamp: '🏆',
        questStampName: 'True Explorer',
      },
    ],
  },
];
