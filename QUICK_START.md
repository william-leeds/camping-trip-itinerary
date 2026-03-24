# Quick Start Guide

Get the camping trip itinerary website up and running in 3 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Run Development Server

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

## 3. Start Exploring!

- Scroll through the beautiful trip itinerary
- Click day buttons in the header to jump to specific days
- Click "View on Maps" to see venue locations
- The site is fully responsive - try resizing your window!

## 📝 Making Changes

Want to update the itinerary? Edit `src/data/itinerary.ts`:

```typescript
// Change activity details
{
  time: '2:00 PM',
  title: 'Activity Name',
  description: 'What you\'ll do',
  details: ['Bullet point 1', 'Bullet point 2'],
  googleMapsUrl: 'https://maps.google.com/?q=location',
  notes: 'Pro tip or info',
}
```

The page auto-reloads as you save changes - no restart needed!

## 🎨 Customizing Colors

Edit `tailwind.config.ts` to change the color palette. Or modify day-specific colors in `src/app/page.tsx`:

```typescript
const colors: Record<string, { bg: string; gradient: string; accent: string }> = {
  saturday: {
    bg: 'bg-sunset-50',
    gradient: 'from-sunset-400 to-sunset-600',
    accent: 'text-sunset-600',
  },
  // ...
};
```

## 🚀 Deploying to Vercel

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repo
4. Click "Deploy"

Done! Your site is live!

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🔧 Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Styles not loading?**
Restart the dev server: Press `Ctrl+C` then `npm run dev`

**TypeScript errors?**
```bash
npm run build
```

## 📚 File Structure

```
src/
├── app/
│   ├── page.tsx          ← Main page (UI)
│   ├── layout.tsx        ← HTML structure
│   └── globals.css       ← Global styles
└── data/
    └── itinerary.ts      ← Trip data (EDIT THIS!)
```

## ✨ Features

✅ Beautiful, modern design
✅ Mobile responsive
✅ Smooth animations
✅ Google Maps integration
✅ Easy to customize
✅ Deploy-ready
✅ TypeScript support

## 🎯 Next Steps

1. Customize the itinerary data in `src/data/itinerary.ts`
2. Change colors in `tailwind.config.ts` if desired
3. Deploy to Vercel or your hosting of choice
4. Share the link with William, Rana, and Leo!

---

**Happy trails!** 🏕️
