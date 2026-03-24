# Complete Setup Instructions

Follow these steps to get the camping trip itinerary website running on your computer.

## Prerequisites

Before you start, make sure you have:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A text editor (VS Code recommended - [Download here](https://code.visualstudio.com/))

### Check if Node.js is installed:
```bash
node --version
npm --version
```

Both should show version numbers (e.g., v18.16.0, 9.6.4)

## Step 1: Download the Project

Option A: If you have the folder, navigate to it:
```bash
cd camping-trip-itinerary
```

Option B: Clone from GitHub (if applicable):
```bash
git clone <repo-url>
cd camping-trip-itinerary
```

## Step 2: Install Dependencies

This downloads all required packages. Run:

```bash
npm install
```

You'll see it downloading and installing packages. This takes about 1-2 minutes on first run.

**What you should see:**
- Messages like "added 200+ packages"
- A new `node_modules` folder appears (don't edit this!)
- A `package-lock.json` file is created

## Step 3: Start the Development Server

```bash
npm run dev
```

**What you should see:**
```
> next dev

  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in XXXms
```

## Step 4: Open in Your Browser

Click on or copy-paste this URL into your browser:

**http://localhost:3000**

You should see the beautiful trip itinerary website!

## Step 5: Test the Site

- Scroll through the itinerary
- Click the day buttons in the header to navigate
- Click "View on Maps" links
- Try it on your phone (visit same URL from phone on same WiFi)
- Resize your browser window to test responsive design

## Step 6: Make Changes (Optional)

### Edit the Itinerary Content

Open the file: `src/data/itinerary.ts`

Change any activity like this:

**Before:**
```typescript
{
  id: 'sat-2',
  time: '11:30 AM',
  title: 'Arrive in Paso Robles',
  description: 'Arrive in charming wine country town',
}
```

**After:**
```typescript
{
  id: 'sat-2',
  time: '12:00 PM',
  title: 'Arrive in Paso Robles - Coffee Break',
  description: 'Arrive in charming wine country town and grab a coffee',
}
```

Save the file (Ctrl+S or Cmd+S) and the website updates automatically!

### Edit Colors

Open: `tailwind.config.ts`

Find the colors section and modify the hex colors. For example:
```typescript
colors: {
  earth: {
    50: '#faf8f3',  // Change these hex colors
    // ...
  }
}
```

## Troubleshooting

### "Port 3000 is already in use"

Another app is using port 3000. Either:

**Option 1:** Stop the other app and restart
```bash
npm run dev
```

**Option 2:** Use a different port
```bash
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

### "Command not found: npm"

Node.js isn't installed correctly. [Download and install Node.js](https://nodejs.org/) and restart your terminal.

### "Module not found" errors

The dependencies aren't installed. Run:
```bash
npm install
```

### Styles aren't loading

Restart the dev server:
1. Press `Ctrl+C` (or `Cmd+C` on Mac) in the terminal
2. Run `npm run dev` again

### "Cannot find module" errors

Make sure you're in the correct directory:
```bash
cd /path/to/camping-trip-itinerary
npm run dev
```

## Common Commands

### Start Development Server
```bash
npm run dev
```
Runs on http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```
Creates optimized version ready for deployment

### Check for Errors
```bash
npm run lint
```
Finds TypeScript and code issues

### Stop the Server
Press `Ctrl+C` (Windows/Linux) or `Cmd+C` (Mac) in the terminal

## Project Structure Explanation

```
camping-trip-itinerary/
│
├── src/                          # Source code
│   ├── app/
│   │   ├── page.tsx             # Main website (what you see)
│   │   ├── layout.tsx           # Page structure/HTML
│   │   └── globals.css          # Styles & animations
│   │
│   └── data/
│       └── itinerary.ts         # Trip data (EDIT THIS!)
│
├── package.json                 # Dependencies list
├── tsconfig.json               # TypeScript settings
├── tailwind.config.ts          # Color settings
└── README.md                   # Full documentation
```

## What to Edit for Your Trip

### To change activities:
👉 Edit: `src/data/itinerary.ts`

### To change colors:
👉 Edit: `tailwind.config.ts` or `src/app/page.tsx`

### To change styling:
👉 Edit: `src/app/globals.css` or `src/app/page.tsx`

## Deploying to the Internet

Once your site is perfect and you want to share it:

### Deploy to Vercel (Recommended)

1. Install Git (if not installed): [Download Git](https://git-scm.com/)

2. Initialize git in your project:
```bash
git init
git add .
git commit -m "Initial commit - camping trip itinerary"
```

3. Push to GitHub:
   - Create a GitHub account: https://github.com
   - Create a new repository (copy the URL)
   - Push your code:
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

4. Deploy with Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site is live!

### Alternative: Deploy to Netlify

1. Go to https://netlify.com
2. Click "Add new site"
3. Select "Import an existing project"
4. Choose GitHub
5. Select your repository
6. Click "Deploy"

## After Deployment

- Share the link with William, Rana, and Leo!
- The site updates automatically when you push changes to GitHub
- Monitor performance at your deployment dashboard

## Next Steps

1. Run `npm install` (if not done)
2. Run `npm run dev`
3. Open http://localhost:3000
4. Customize `src/data/itinerary.ts`
5. Enjoy!

## Need Help?

**Check the documentation:**
- README.md - Full documentation
- QUICK_START.md - 5-minute quick start
- PROJECT_SUMMARY.md - Project overview

**Common resources:**
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Docs: https://react.dev

---

**You're all set!** 🚀 Happy building! 🏕️
