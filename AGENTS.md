# Agents

## Project Overview

Map72 Game Hub — a Vite + React + TypeScript + Tailwind CSS web application that serves as a launcher for small web-based demo games. The hub is deployable on GitHub Pages and runs locally during development.

## Tech Stack

- **Build tool**: Vite 5 with `@vitejs/plugin-react`
- **Framework**: React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 (class-based dark mode, custom brand tokens)
- **Routing**: React Router v6 with `HashRouter` (GitHub Pages compatible)
- **Data**: Game metadata in `src/games/games.config.ts`
- **Deployment**: `gh-pages` npm package, GitHub Pages

Individual game files are pure HTML/CSS/JS (no framework) served from `public/games/`.

## Project Structure

```
compiled-with-selected-3-games/
├── src/
│   ├── main.tsx              — React entry point
│   ├── App.tsx               — Root component (HashRouter + theme)
│   ├── index.css             — Tailwind directives
│   ├── vite-env.d.ts         — Vite type declarations
│   ├── types/
│   │   └── game.ts           — GameEntry TypeScript interface
│   ├── games/
│   │   └── games.config.ts   — Central game registry (edit here to add games)
│   ├── hooks/
│   │   ├── useTheme.ts       — Dark/light theme with localStorage persistence
│   │   └── useGameFilter.ts  — Search + tag + category filter logic
│   ├── components/
│   │   ├── Header.tsx        — Sticky frosted-glass header with logo
│   │   ├── ThemeToggle.tsx   — Sun/moon toggle button
│   │   ├── SearchBar.tsx     — Live search input
│   │   ├── FilterBar.tsx     — Tag + category filter chips
│   │   └── GameCard.tsx      — Animated game card with badges
│   └── pages/
│       └── HubPage.tsx       — Main hub page
├── public/
│   ├── games/
│   │   ├── card.html         — Food Randomiser game
│   │   ├── globe.html        — Globe Randomiser game
│   │   ├── data.js           — Shared data loader
│   │   └── datas.json        — Sunway Malls dataset
│   └── thumbnails/           — Game thumbnail images (optional)
├── index.html                — Vite HTML entry point
├── vite.config.ts            — Vite config (base URL for GitHub Pages)
├── tailwind.config.ts        — Tailwind design tokens
├── tsconfig.json             — TypeScript config (strict mode)
├── package.json              — Scripts and dependencies
└── AGENTS.md                 — This file
```

## Development Server

Do not start or spin up the development server. We run it manually.

To start: `npm run dev` → opens at `http://localhost:5173`

## Architecture Notes

- **Game registry** (`src/games/games.config.ts`) is the single source of truth. Game cards are auto-generated from this array — no manual UI changes needed when adding games.
- **Theme** is managed by `useTheme` hook in `App.tsx`; persisted in `localStorage["theme"]`; toggled by setting `class="dark"` on `<html>`.
- **Game files** in `public/games/` are passed through Vite verbatim and served at `/games/*`. They are self-contained and reference each other by relative path (`data.js` fetches `datas.json`).
- **URL resolution**: Game URLs in the registry use the form `games/card.html` (no leading slash). `GameCard.tsx` prepends `import.meta.env.BASE_URL` so links resolve correctly on both localhost and GitHub Pages.

---

## Adding a New Game

To add a new game, edit **one file only**: `src/games/games.config.ts`.

Add a new entry to the `GAMES` array:

```typescript
{
  id: 'my-game',                    // unique kebab-case id
  title: 'My Game',                 // display name
  description: 'One sentence.',     // shown on the card
  category: 'Puzzle',               // e.g. Randomiser / Puzzle / Strategy / Prototype
  tags: ['casual', 'multiplayer'],  // any tags you like
  stats: {
    multiplayer: true,              // optional: shows "Multiplayer" badge
    ai: false,                      // optional: shows "AI" badge
    prototype: false,               // optional: shows "Prototype" badge
  },
  thumbnail: 'thumbnails/my-game.png',  // optional — omit for letter placeholder
  url: 'games/my-game.html',            // or any absolute URL
},
```

Then:
1. Place the game HTML file at `public/games/my-game.html` (if applicable)
2. Optionally add a thumbnail at `public/thumbnails/my-game.png`
3. Run `npm run dev` — the card appears in the hub automatically

New tags and categories appear in the filter bar without any additional changes.

---

## Deployment

### Prerequisites
- Node.js 18+ and npm
- Git remote `origin` pointing to your GitHub repository
- GitHub Pages enabled in repo settings (Settings → Pages → Source: `gh-pages` branch, root `/`)

### First-time setup
1. Push your code to `main`
2. Run `npm run deploy` (this publishes the `dist/` folder to the `gh-pages` branch)
3. In GitHub repo Settings → Pages, set source to `gh-pages` branch, `/ (root)`
4. Site will be live at `https://<org>.github.io/compiled-with-selected-3-games/`

### Deploy command
```bash
npm run deploy
```
This runs `npm run build` then pushes `dist/` to the `gh-pages` branch automatically.

### Local preview (production build)
```bash
npm run preview
```

### Changing the repo name / base URL
If the repository is renamed, update the `base` value in `vite.config.ts`:
```typescript
process.env.NODE_ENV === 'production' ? '/new-repo-name/' : '/'
```
Or set the `VITE_BASE_PATH` environment variable at build time:
```bash
VITE_BASE_PATH=/new-repo-name/ npm run build
```
