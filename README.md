# Camping Trip Itinerary Website

A beautiful, modern, single-page trip itinerary website for William, Rana, and Leo's camping adventure through California's Paso Robles wine country and Terranea Resort.

## 🏕️ Trip Overview

**Duration:** Saturday, March 28 - Tuesday, March 31, 2025

**Travelers:**
- William
- Rana
- Leo (4.5 years old)

**Highlights:**
- Paso Robles wine country with kid-friendly activities
- Camping at Historic Almond Springs
- Coastal drive with beach stops
- Luxury resort stay at Terranea Resort in Rancho Palos Verdes
- Tide pools, beaches, and scenic coastal trails

## ✨ Features

- **Beautiful, Modern Design**: Warm color palette with earth tones and sunset colors
- **Single Page App**: Smooth scrolling through day-by-day itinerary sections
- **Mobile-First**: Fully responsive design that looks great on phones and desktop
- **Day Navigation**: Quick navigation header to jump between days
- **Timeline Layout**: Activities organized chronologically with visual timeline
- **Google Maps Integration**: Every venue includes a Google Maps link
- **Hero Section**: Trip title, participant names, and overview
- **Easy to Edit**: Itinerary data stored in separate TypeScript file (`src/data/itinerary.ts`)
- **Premium Feel**: Smooth animations, hover effects, gradient backgrounds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd camping-trip-itinerary
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files.

### Building for Production

Build the project:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## 📝 Editing the Itinerary

All itinerary content is stored in `src/data/itinerary.ts`. This file contains:

- **Day information**: Date, day of week, emoji, theme, description
- **Activities**: Time, title, description, details, notes, and Google Maps URLs

### Example: Adding an Activity

```typescript
{
  id: 'sat-8',
  time: '10:00 PM',
  title: 'Activity Name',
  description: 'Brief description of what you\'ll do',
  details: [
    'Detail point 1',
    'Detail point 2',
  ],
  googleMapsUrl: 'https://maps.google.com/?q=location',
  notes: 'Pro tip or additional information',
}
```

### Example: Changing a Day's Theme

Simply edit the day object in the itinerary array:

```typescript
{
  id: 'saturday',
  date: 'March 28',
  dayOfWeek: 'Saturday',
  dayNumber: 1,
  emoji: '🚗',  // Change emoji
  theme: 'Your New Theme',  // Change theme
  description: 'Your new description',  // Change description
  activities: [...]
}
```

## 🎨 Design System

### Color Palette

The site uses custom Tailwind colors defined in `tailwind.config.ts`:

- **Earth Tones** (`earth-*`): Browns and neutrals for base colors
- **Sunset Colors** (`sunset-*`): Warm oranges and golds for accents
- **Sage Colors** (`sage-*`): Muted greens for complementary colors
- **Additional Colors**: Blue, emerald, purple for day-specific sections

### Typography

- **Font Family**: System fonts for optimal performance
- **Font Sizes**: Responsive scaling from mobile to desktop
- **Weights**: Semantic use of font weights (400, 600, 700, 900)

### Components

- **Hero Section**: Full-screen gradient background with animated elements
- **Day Sections**: Color-coded by day with emoji headers
- **Activity Cards**: Timeline-based layout with visual connectors
- **Navigation Header**: Sticky header with day navigation
- **Footer**: Information and credits

## 🛠️ Tech Stack

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer
- **React 19**: Latest React features

## 📦 Project Structure

```
camping-trip-itinerary/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page component
│   │   ├── globals.css         # Global styles and animations
│   │   └── favicon.ico
│   └── data/
│       └── itinerary.ts        # Itinerary data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .gitignore
└── README.md
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

Vercel will automatically detect that this is a Next.js project and configure everything correctly.

### Deploy to Other Platforms

This is a standard Next.js app, so it can be deployed to:

- **Netlify**: Supports Next.js out of the box
- **AWS Amplify**: Good for AWS-based deployments
- **Docker**: Build a Docker image and deploy anywhere
- **Self-hosted**: Run the production build on any Node.js server

## 🎯 Customization Tips

### Change Colors

Edit `tailwind.config.ts` to modify the color palette. Each day can have its own color scheme by editing the `getDayColors` function in `src/app/page.tsx`.

### Add More Activities

Add new activity objects to the `activities` array for any day in `src/data/itinerary.ts`.

### Modify Navigation

The header navigation automatically generates buttons for each day. To change how it's styled, edit the navigation section in `src/app/page.tsx`.

### Add More Days

To add a new day:
1. Create a new day object in `src/data/itinerary.ts`
2. Update the `dayNumber` and increment for subsequent days
3. The page will automatically generate a new section

## 📱 Responsive Design

The site is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 640px and up
- **Desktop**: 1024px and up

All components use responsive utilities and mobile-first design principles.

## ✅ Performance

- **Optimized Images**: Using Next.js Image component
- **CSS Optimization**: Tailwind CSS purges unused styles
- **Code Splitting**: Next.js automatically splits code by route
- **Font Optimization**: System fonts for fast loading
- **Minimal Dependencies**: Lightweight bundle size

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### Tailwind Styles Not Showing

Ensure you've run `npm install` to install all dependencies. Restart the dev server if styles don't appear.

### TypeScript Errors

Run `npm run build` to see all TypeScript errors. Most can be fixed by ensuring proper type imports.

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or issues, check the Next.js documentation at [nextjs.org](https://nextjs.org).

---

**Safe travels! 🏕️✈️🏖️**
