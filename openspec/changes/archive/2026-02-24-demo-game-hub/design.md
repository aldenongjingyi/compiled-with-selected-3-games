## Context

The project is currently a folder of standalone HTML files (`index.html`, `card.html`, `globe.html`) with no build tooling. The landing page is hand-maintained. Adding a third game requires manually editing the grid in `index.html`. The goal is to introduce a proper Vite + React + TypeScript + Tailwind build layer that turns the hub into a data-driven, searchable, filterable game launcher — while leaving the individual game files completely untouched.

**Current constraints:**
- No `package.json`, no node_modules, no CI
- Games are self-contained HTML files; they must remain so (they reference `datas.json` / `data.js` by relative path)
- Deployment target: GitHub Pages (static, no server-side rendering)
- Map72 org avatar at `https://avatars.githubusercontent.com/u/63832361?s=200&v=4` is the only brand asset available

## Goals / Non-Goals

**Goals:**
- Scaffold a Vite + React + TS + Tailwind project in the existing repo root
- Define a `games.config.ts` registry that is the single source of truth for all game metadata
- Build a polished hub UI with search, tag/category filtering, animated cards, dark/light toggle
- Deploy to GitHub Pages with a single `npm run deploy` command
- Keep adding a new game trivially easy (one registry entry = one new card)

**Non-Goals:**
- Rewriting or modifying `card.html`, `globe.html`, `datas.json`, or `data.js`
- Embedding games as iframes or in-app routes — games always open in a new tab
- Server-side rendering, SSG frameworks (Next.js, Astro), or backend
- Authentication, user accounts, or persistent game state
- Automated thumbnail generation (developers provide thumbnails manually)

## Decisions

### 1. Vite + React + TypeScript (over plain HTML/CDN)
The current CDN approach is fine for single files but doesn't support component reuse, type safety, or hot-reload. Vite gives instant HMR, tree-shaking, and a clean build/deploy pipeline with minimal config. The hub is a UI-only app with no backend, so Vite is the right fit. **Alternative considered:** Parcel — less ecosystem and less Tailwind integration out of the box.

### 2. `HashRouter` over `BrowserRouter`
GitHub Pages serves static files and cannot handle SPA deep-link redirects (no `200.html` trick wanted). `HashRouter` requires zero server config and works everywhere. **Caveat:** URLs contain `#` — acceptable for a demo hub; we're not doing SEO-sensitive routing.

### 3. Tailwind CSS v3 (class-based dark mode) over v4
Tailwind v4 is still in alpha/early release. v3 is stable, has full IDE plugin support, and the `darkMode: 'class'` strategy pairs cleanly with a root `<html class="dark">` toggle stored in `localStorage`. **Alternative considered:** CSS custom properties alone — more verbose, less ecosystem tooling.

### 4. `games.config.ts` as a plain TypeScript array (not JSON/CMS)
A typed TS array gives autocomplete when adding games, zero runtime fetch cost, and trivially extends with new fields. A CMS or JSON file would require a build loader or fetch and adds no value for a < 20 game library. **Alternative considered:** `games.json` with a JSON schema — loses TypeScript type safety at point of entry.

### 5. Static assets in `public/` (not `src/assets/`)
`card.html`, `globe.html`, `datas.json`, and `data.js` are copied to `public/games/` so Vite passes them through verbatim to the build output. No transforms or imports needed. Game URLs in the registry point to `./games/card.html` etc. **Risk:** If someone moves files out of `public/` they break game links silently — mitigated by a note in `AGENTS.md`.

### 6. `window.open(url, '_blank')` for launching games
Game cards use `<a href={url} target="_blank" rel="noopener noreferrer">` as a wrapper so middle-click and keyboard navigation work. No programmatic `window.open` needed. This is the safest, most accessible pattern.

### 7. Palette derived from existing green/red brand
Existing games use `#14492a` (forest green) and `#e74c3c` (coral red). For the Apple-style hub, we move green to a subtle accent (e.g., `#16a34a` / Tailwind `green-600`) and red as a secondary badge colour. The base is neutral light (`slate-50`) / dark (`slate-900`). This references the brand without being poker-table-heavy.

## Risks / Trade-offs

- **`public/` duplication**: `datas.json` is 6 MB and will be copied into `dist/` on every build. This is fine for GitHub Pages (one-time upload) but means a 6 MB repo artifact. → *Mitigation*: Document this in deploy notes; consider `.gitignore` for `dist/` and let CI build it.
- **No image assets initially**: Thumbnails may not exist for all games at launch. → *Mitigation*: Registry supports a `thumbnail` field that falls back to a generated placeholder SVG/emoji if omitted.
- **HashRouter `#` in URLs**: Sharing links includes the hash path. → *Acceptable trade-off* for static deployment; noted in docs.
- **Tailwind Play CDN removed**: The old `index.html` used Tailwind CDN. After this change that file is replaced. If someone opens the old file directly from disk it won't look right. → *Non-issue* once the React build is in place.

## Migration Plan

1. `npm create vite@latest . -- --template react-ts` (or manual scaffold) in repo root
2. Install Tailwind CSS v3 + PostCSS
3. Move `card.html`, `globe.html`, `datas.json`, `data.js` → `public/games/`
4. Build and test locally (`npm run dev`)
5. Set `base` in `vite.config.ts` to the GitHub Pages sub-path
6. Run `npm run deploy` to publish to `gh-pages` branch
7. Remove / supersede old `index.html` (keep as `public/legacy-index.html` temporarily for reference, delete before first production deploy)

**Rollback**: Simply re-push the `main` branch without the `gh-pages` branch changes; GitHub Pages can be pointed back to `main`/`root`.

## Open Questions

- What is the exact GitHub Pages repo URL / org name? (Determines `base` in `vite.config.ts` — e.g., `/demo-game-hub/` or `/map711.github.io/`)
- Is there a third game file already in progress, or should the registry include it as a placeholder?
- Should thumbnail images live in `public/thumbnails/` (served as static files) or in `src/assets/` (processed by Vite)? Recommendation: `public/thumbnails/` for simplicity.
