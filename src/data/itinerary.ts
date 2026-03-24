export interface Activity {
  id: string;
  emoji: string;
  time: string;
  duration?: string;
  title: string;
  description: string;
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
  activities: Activity[];
}

export const tripTitle = 'Paso Robles & Terranea';
export const tripSubtitle = 'Mar 2026';
export const travelers = 'William, Rana & Leo';

export const itinerary: Day[] = [
  {
    id: 'saturday',
    date: 'Mar 28',
    dayOfWeek: 'Saturday',
    subtitle: 'Wine Country & Ranch Life',
    activities: [
      {
        id: 'sat-1',
        emoji: '🚗',
        time: '8:00 AM',
        title: 'Depart Bay Area',
        description: 'Head south on US-101 toward Paso Robles wine country. About 3.5 hours. Pack snacks and entertainment for Leo — it gets warmer as you go south.',
        driveTime: '~3.5 hrs to Paso Robles',
      },
      {
        id: 'sat-2',
        emoji: '🍗',
        time: '12:00 PM',
        duration: '~90 min',
        title: 'Lunch — Downtown Paso Robles',
        description: 'The Hatch Rotisserie & Bar has great rotisserie chicken and a big outdoor patio, perfect for Leo. Alternative: Jeffry\'s Wine Country BBQ. Both are right on the town square — the park across the street has a playground for pre/post lunch energy burns.',
        link: { label: 'The Hatch on Google Maps', url: 'https://maps.google.com/?q=The+Hatch+Rotisserie+Paso+Robles' },
      },
      {
        id: 'sat-3',
        emoji: '🍷',
        time: '2:00 PM',
        duration: '~90 min',
        title: 'Sculpterra Winery',
        description: 'A gorgeous winery with a sculpture garden, roaming peacocks, and wide-open picnic grounds. Adults get wine tasting while Leo explores the sculptures and chases birds. Great photo ops everywhere. One of the most kid-friendly wineries in Paso.',
        driveTime: '10 min from downtown',
        link: { label: 'Sculpterra on Google Maps', url: 'https://maps.google.com/?q=Sculpterra+Winery+Paso+Robles' },
      },
      {
        id: 'sat-4',
        emoji: '🍦',
        time: '4:00 PM',
        duration: '~60 min',
        title: 'Downtown Paso Robles — Ice Cream & Town Square',
        description: 'Stroll through the charming downtown. The town square park has a nice playground for Leo. Browse the local shops and tasting rooms, grab ice cream, and soak up the small-town wine country vibe.',
        link: { label: 'Paso Robles City Park', url: 'https://maps.google.com/?q=Paso+Robles+City+Park' },
      },
      {
        id: 'sat-5',
        emoji: '🏡',
        time: '5:30 PM',
        title: 'Drive to Historic Almond Springs',
        description: 'Head to your glamping cabins at the Miller Moth Ranch — a 5th-generation working ranch in the hills northeast of Paso Robles. 77990 Ranchita Canyon Road, San Miguel, CA 93451. The last 2 miles are on a maintained dirt road — drive slow and enjoy the scenery. Cell service is spotty; download directions ahead of time. Wi-Fi at the cabins.',
        driveTime: '25 min from downtown Paso (16 miles)',
        link: { label: 'Almond Springs on Google Maps', url: 'https://maps.google.com/?q=77990+Ranchita+Canyon+Road+San+Miguel+CA+93451' },
      },
      {
        id: 'sat-6',
        emoji: '🐐',
        time: '6:00 PM',
        duration: '~90 min',
        title: 'Settle In & Explore the Ranch',
        description: 'Check into your cozy one-room glamping cabin (queen bed, A/C, mini fridge, Keurig). Then explore: the Lounge Barn, Legends Saloon, Antique Barns, and Game Room. Leo can meet the ranch animals — Angus cattle, Boer goats, and more. There\'s a fully equipped communal kitchen with stove, oven, BBQ, and utensils if you want to cook dinner.',
        confirmed: 'Check-in 3–8 PM',
      },
      {
        id: 'sat-7',
        emoji: '🔥',
        time: '7:30 PM',
        title: 'Campfire & Stargazing',
        description: 'Campfires allowed — wood bundles available for purchase. Make s\'mores with Leo under the stars. Zero light pollution out here; the Milky Way is incredible. Café lighting around the property adds a magical glow. Pack marshmallows, graham crackers, chocolate, and a headlamp.',
      },
    ],
  },
  {
    id: 'sunday',
    date: 'Mar 29',
    dayOfWeek: 'Sunday',
    subtitle: 'Coastal Drive to Terranea',
    activities: [
      {
        id: 'sun-1',
        emoji: '☀️',
        time: '8:00 AM',
        duration: '~2 hrs',
        title: 'Ranch Morning & Breakfast',
        description: 'Leisurely morning at the ranch. Use the communal kitchen to cook breakfast or have Keurig coffee in your cabin. Let Leo say goodbye to the goats. Pack up — checkout is 11 AM. The ranch is beautiful in morning light; take photos.',
      },
      {
        id: 'sun-2',
        emoji: '🏖️',
        time: '11:00 AM',
        duration: '~90 min',
        title: 'Pismo Beach',
        description: 'Let Leo loose on the sand. Build sandcastles, splash in the waves, collect shells. Pismo is a classic wide California beach — perfect for a 4.5-year-old. Check if the Monarch Butterfly Grove is open (seasonal, best Oct–Feb). Bring beach toys and sunscreen.',
        driveTime: '~1 hr from Almond Springs',
        link: { label: 'Pismo Beach on Google Maps', url: 'https://maps.google.com/?q=Pismo+Beach+California' },
      },
      {
        id: 'sun-3',
        emoji: '🦞',
        time: '12:30 PM',
        duration: '~60 min',
        title: 'Lunch — Splash Cafe, Pismo Beach',
        description: 'The famous clam chowder in a sourdough bread bowl. A Pismo Beach institution — expect a line but it moves fast. Fish & chips also excellent. Kid-friendly, casual, right near the beach.',
        link: { label: 'Splash Cafe on Google Maps', url: 'https://maps.google.com/?q=Splash+Cafe+Pismo+Beach' },
      },
      {
        id: 'sun-4',
        emoji: '🚗',
        time: '2:00 PM',
        title: 'Drive to Terranea Resort',
        description: 'Head south to Rancho Palos Verdes. You\'ll pass through Santa Barbara and along some gorgeous stretches of coastline. Leo will probably nap — good time for a long drive.',
        driveTime: '~3 hrs from Pismo Beach',
      },
      {
        id: 'sun-5',
        emoji: '🏨',
        time: '5:00 PM',
        title: 'Check In — Terranea Resort',
        description: 'Arrive at your luxury oceanfront resort on the cliffs of Rancho Palos Verdes. Get settled, explore the property. Multiple pools, beach access, stunning coastal views in every direction.',
        link: { label: 'Terranea Resort', url: 'https://maps.google.com/?q=Terranea+Resort+Rancho+Palos+Verdes' },
      },
      {
        id: 'sun-6',
        emoji: '🌅',
        time: '5:30 PM',
        duration: '~45 min',
        title: 'Coastal Trail Walk',
        description: 'Take the resort\'s coastal trail for a golden-hour walk along the cliffs. Breathtaking views, tide pools visible from above, and perfect for photos. Easy and flat enough for Leo. Stretch your legs after the drive.',
      },
      {
        id: 'sun-7',
        emoji: '🍽️',
        time: '7:00 PM',
        duration: '~90 min',
        title: 'Dinner — Nelson\'s at Terranea',
        description: 'Casual oceanfront dining with outdoor seating and Pacific sunset views. Fresh seafood, kid-friendly menu. The perfect first-night-at-the-resort meal. Watch the sun go down over the water.',
        link: { label: 'Nelson\'s at Terranea', url: 'https://maps.google.com/?q=Nelsons+Restaurant+Terranea+Resort' },
      },
    ],
  },
  {
    id: 'monday',
    date: 'Mar 30',
    dayOfWeek: 'Monday',
    subtitle: 'Pool Day & Tide Pools',
    activities: [
      {
        id: 'mon-1',
        emoji: '😴',
        time: '8:30 AM',
        duration: '~90 min',
        title: 'Sleep In & Breakfast',
        description: 'No alarm. Breakfast at Catalina Kitchen or room service with ocean views. Enjoy the luxury of not having anywhere to be.',
      },
      {
        id: 'mon-2',
        emoji: '🏊',
        time: '10:30 AM',
        duration: '~3 hrs',
        title: 'Pool Day',
        description: 'Terranea has a fantastic pool complex with shallow areas perfect for Leo. Grab loungers with ocean views. Pool bar and snacks nearby. This is the main event today — no rush.',
      },
      {
        id: 'mon-3',
        emoji: '🏖️',
        time: '1:30 PM',
        duration: '~90 min',
        title: 'Beach & Sandcastles',
        description: 'Head down to the resort beach. Build sandcastles with Leo, collect shells, swim if the water\'s warm enough. The beach here is more secluded and dramatic than typical LA beaches — rocky coves and clear water.',
      },
      {
        id: 'mon-4',
        emoji: '🦀',
        time: '3:30 PM',
        duration: '~60 min',
        title: 'Tide Pool Exploration',
        description: 'The real highlight for Leo. The rocky coast near Terranea has incredible tide pools — starfish, sea anemones, hermit crabs, small fish. Wear water shoes (rocks are slippery). Time it around low tide if possible. Gently observe, don\'t disturb the creatures.',
      },
      {
        id: 'mon-5',
        emoji: '🚿',
        time: '5:00 PM',
        duration: '~90 min',
        title: 'Rest & Refresh',
        description: 'Head back to the room. Shower off the salt water. Let Leo rest before dinner. Fresh clothes, maybe catch the sunset from your balcony.',
      },
      {
        id: 'mon-6',
        emoji: '🍽️',
        time: '7:00 PM',
        duration: '~90 min',
        title: 'Dinner — Your Choice',
        description: 'Mar\'sel for a special occasion vibe — fine dining with spectacular ocean views. Or Sea Beans for casual fresh seafood, great for families. Both have incredible views. Either way, it\'s your last real dinner of the trip — enjoy it.',
        link: { label: 'mar\'sel at Terranea', url: 'https://maps.google.com/?q=marsel+Restaurant+Terranea' },
      },
    ],
  },
  {
    id: 'tuesday',
    date: 'Mar 31',
    dayOfWeek: 'Tuesday',
    subtitle: 'Journey Home',
    activities: [
      {
        id: 'tue-1',
        emoji: '☀️',
        time: '8:00 AM',
        duration: '~60 min',
        title: 'Final Breakfast',
        description: 'Last breakfast at Terranea. Catalina Kitchen or room service. Soak up the ocean views one more time.',
      },
      {
        id: 'tue-2',
        emoji: '🏊',
        time: '9:00 AM',
        duration: '~90 min',
        title: 'Last Swim & Beach Time',
        description: 'One more dip in the pool or a final walk on the beach. Let Leo splash around. Take your last photos of the coast. Collect a few more shells for the road.',
      },
      {
        id: 'tue-3',
        emoji: '🧳',
        time: '10:30 AM',
        title: 'Check Out',
        description: 'Pack up, check out by 11 AM. Load the car, final bathroom breaks. Say goodbye to Terranea.',
      },
      {
        id: 'tue-4',
        emoji: '🚗',
        time: '11:00 AM',
        title: 'Begin Drive North',
        description: 'Start the journey back to the Bay Area. About 5–6 hours total with stops. The drive up the coast is just as beautiful as the drive down.',
        driveTime: '~5–6 hrs total to Bay Area',
      },
      {
        id: 'tue-5',
        emoji: '🍽️',
        time: '1:00 PM',
        duration: '~75 min',
        title: 'Lunch Stop — Santa Barbara or SLO',
        description: 'Santa Barbara has beautiful State Street with great restaurants. San Luis Obispo is a charming college town with excellent food. Both are roughly halfway. Stretch your legs and grab a real meal before the final push.',
        optional: true,
        link: { label: 'Downtown Santa Barbara', url: 'https://maps.google.com/?q=State+Street+Santa+Barbara+California' },
      },
      {
        id: 'tue-6',
        emoji: '🏡',
        time: '5:30 PM',
        title: 'Arrive Home',
        description: 'Pull into the driveway. Unload, unpack, and start planning the next one.',
      },
    ],
  },
];
