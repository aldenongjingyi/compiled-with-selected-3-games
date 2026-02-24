## Why

The current project is a plain HTML/CSS/JS landing page (`index.html`) that links to two standalone game files (`card.html`, `globe.html`). As the game library grows, maintaining individual HTML files and hand-editing the index grid becomes error-prone and doesn't scale. We need a proper React/Vite hub with a centralised game registry so new games can be added with a single config entry — and so the UI automatically gains search, filtering, stats, and polished presentation.

## What Changes

- **NEW** — Vite + React + TypeScript + Tailwind project scaffold replaces the ad-hoc HTML landing page
- **NEW** — Central `games.config.ts` registry; game cards auto-generated from it
- **NEW** — Full hub UI: animated game cards, live search, tag + category filters, stats badges
- **NEW** — Dark/light theme toggle with `localStorage` persistence
- **NEW** — `vite.config.ts` and `package.json` scripts for local dev and GitHub Pages deployment
- **KEEP** — Existing `card.html`, `globe.html`, `datas.json`, `data.js` unchanged; they are served as static assets and linked directly (games open in new tab)
- The old `index.html` is superseded by the React hub entry point

## Capabilities

### New Capabilities

- `project-scaffold`: Vite + React + TypeScript + Tailwind CSS project structure — `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `index.html` entry, `src/main.tsx`, `src/App.tsx`, React Router setup, folder conventions
- `game-registry`: Central `src/games/games.config.ts` with the `GameEntry` TypeScript type, all three initial games pre-populated (Food Randomiser card game, Globe Randomiser, placeholder third game), and developer guide for adding games
- `hub-ui`: Complete hub interface — responsive header with Map72 logo + dark/light toggle; live search bar; tag and category filter chips; animated game card grid (thumbnail, title, description, stats badges, hover grow + shadow); mobile-first responsive grid; Apple-style Tailwind design tokens
- `github-pages-deploy`: `vite.config.ts` `base` URL, `package.json` `deploy` script using `gh-pages`, `.github/` workflow (optional), and written deployment guide

### Modified Capabilities

<!-- none — this is a greenfield hub layer; existing game HTML files are unchanged -->

## Impact

- **New dependencies**: `react`, `react-dom`, `react-router-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `autoprefixer`, `postcss`, `gh-pages`
- **Static assets**: `card.html`, `globe.html`, `datas.json`, `data.js` copied/symlinked into the Vite `public/` directory so they remain accessible at the same relative URLs
- **Branding**: Map72 org avatar (`https://avatars.githubusercontent.com/u/63832361?s=200&v=4`) used in header; accent palette derived from existing green (#14492a / #1e6b32) + red (#e74c3c) with a neutral light/dark base for the Apple-style redesign
- **Routing**: React Router with `HashRouter` (GitHub Pages compatible); game cards open games via `window.open` / `target="_blank"` (no in-app routing into games)
- **No breaking changes to existing game HTML files** — they remain self-contained
