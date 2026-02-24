## 1. Project Scaffold

- [x] 1.1 Initialise Vite + React + TypeScript project in repo root (`npm create vite@latest . -- --template react-ts`)
- [x] 1.2 Install Tailwind CSS v3, PostCSS, and Autoprefixer (`npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`)
- [x] 1.3 Install React Router DOM (`npm install react-router-dom`)
- [x] 1.4 Install `gh-pages` as a dev dependency (`npm install -D gh-pages`)
- [x] 1.5 Configure `tailwind.config.ts` with `content` paths, `darkMode: 'class'`, and custom design tokens (brand colours, font family, card radius, card shadow, apple easing)
- [x] 1.6 Create `src/index.css` with Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`)
- [x] 1.7 Update `tsconfig.json` to enable `strict: true` and `noUnusedLocals: true`
- [x] 1.8 Create `src/` folder structure: `types/`, `pages/`, `components/`, `games/`, `hooks/`

## 2. Static Assets Migration

- [x] 2.1 Create `public/games/` directory and copy `card.html`, `globe.html`, `data.js`, and `datas.json` into it
- [x] 2.2 Create `public/thumbnails/` directory (placeholder for game thumbnail images)
- [x] 2.3 Verify that `http://localhost:5173/games/card.html` and `/games/globe.html` are accessible when dev server runs

## 3. Type Definitions & Game Registry

- [x] 3.1 Create `src/types/game.ts` exporting the `GameEntry` interface (id, title, description, category, tags, stats, thumbnail?, url)
- [x] 3.2 Create `src/games/games.config.ts` exporting `GAMES: GameEntry[]` with three initial entries: Food Randomiser (`/games/card.html`), Globe Randomiser (`/games/globe.html`), and a placeholder prototype game

## 4. Core Hooks

- [x] 4.1 Create `src/hooks/useTheme.ts` — reads `localStorage["theme"]` and OS preference, toggles `dark` class on `<html>`, exposes `{ theme, toggleTheme }`
- [x] 4.2 Create `src/hooks/useGameFilter.ts` — accepts `GameEntry[]`, exposes `{ query, setQuery, selectedTags, toggleTag, selectedCategory, setCategory, filteredGames }` with combined search + tag + category filter logic

## 5. UI Components

- [x] 5.1 Create `src/components/ThemeToggle.tsx` — button that calls `toggleTheme()`; shows sun SVG in dark mode, moon SVG in light mode
- [x] 5.2 Create `src/components/Header.tsx` — sticky frosted-glass header with Map72 circular avatar (36px), "Map72 Game Hub" title, and `<ThemeToggle />` on the right
- [x] 5.3 Create `src/components/SearchBar.tsx` — controlled text input wired to `setQuery`; clears on Escape key
- [x] 5.4 Create `src/components/FilterBar.tsx` — renders tag chips and category chips derived from `GAMES`; active chips use `bg-brand-green`; "All" chip clears the group; tag multi-select, category single-select
- [x] 5.5 Create `src/components/GameCard.tsx` — renders thumbnail (with letter-fallback on error), title, description, category badge, stats badges (AI / Multiplayer / Prototype), hover scale + shadow animation; wrapped in `<a target="_blank" rel="noopener noreferrer">`

## 6. Hub Page & Routing

- [x] 6.1 Create `src/pages/HubPage.tsx` — uses `useGameFilter(GAMES)`, renders `<SearchBar />`, `<FilterBar />`, game card grid, and empty state message when no results
- [x] 6.2 Update `src/App.tsx` — wrap with `HashRouter`, define route `"/" → <HubPage />`; apply theme class to root element
- [x] 6.3 Update `src/main.tsx` — import `./index.css`, render `<App />`
- [x] 6.4 Update root `index.html` — set `<title>Map72 Game Hub</title>`, remove default Vite boilerplate content

## 7. Deployment Configuration

- [x] 7.1 Update `vite.config.ts` — set `base` to `/compiled-with-selected-3-games/` for production builds (or use `VITE_BASE_PATH` env variable)
- [x] 7.2 Update `package.json` scripts — add `"deploy": "npm run build && gh-pages -d dist"`
- [x] 7.3 Create or update `.gitignore` — ensure `dist/` and `node_modules/` are excluded

## 8. Documentation

- [x] 8.1 Update `AGENTS.md` — add "## Adding a New Game" section with step-by-step guide and copy-pasteable `GameEntry` template
- [x] 8.2 Update `AGENTS.md` — add "## Deployment" section with GitHub Pages setup steps, deploy command, and note about `base` URL
- [x] 8.3 Update `AGENTS.md` — update Tech Stack and Project Structure sections to reflect the new Vite/React architecture
