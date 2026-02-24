## ADDED Requirements

### Requirement: Vite + React + TypeScript project initialised at repo root
The scaffold SHALL produce a working Vite + React + TypeScript project in the repository root, co-existing with existing static files (`card.html`, `globe.html`, `datas.json`, `data.js`).

Required root files: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `postcss.config.js`, `tailwind.config.ts`.

Required source tree:
```
src/
  main.tsx          — React DOM entry point
  App.tsx           — Root component with Router and ThemeProvider
  index.css         — Tailwind directives (@tailwind base/components/utilities)
  types/
    game.ts         — GameEntry type (re-exported from game-registry)
  pages/
    HubPage.tsx     — Main hub page component
  components/
    Header.tsx
    SearchBar.tsx
    FilterBar.tsx
    GameCard.tsx
    ThemeToggle.tsx
  games/
    games.config.ts — Central game registry
  hooks/
    useTheme.ts
    useGameFilter.ts
public/
  games/
    card.html
    globe.html
    datas.json
    data.js
  thumbnails/       — Game thumbnail images
```

#### Scenario: Dev server starts
- **WHEN** developer runs `npm run dev`
- **THEN** Vite dev server starts on `http://localhost:5173` with HMR enabled and no compile errors

#### Scenario: Production build succeeds
- **WHEN** developer runs `npm run build`
- **THEN** Vite outputs a complete static bundle in `dist/` with no TypeScript errors

#### Scenario: Static game files are accessible in dev
- **WHEN** the dev server is running
- **THEN** `http://localhost:5173/games/card.html` and `/games/globe.html` are accessible and functional

---

### Requirement: Tailwind CSS v3 configured with Apple-style design tokens
Tailwind SHALL be configured with the project's custom design tokens. Dark mode SHALL use the `class` strategy.

`tailwind.config.ts` SHALL extend the default theme with:
- `colors.brand.green` — `#16a34a` (Tailwind green-600 equivalent; primary accent)
- `colors.brand.red` — `#e74c3c` (secondary / badge accent)
- `fontFamily.sans` — `['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif']`
- `borderRadius.card` — `1rem` (16px)
- `boxShadow.card` — soft layered shadow for cards
- `transitionTimingFunction.apple` — `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

#### Scenario: Custom tokens available in components
- **WHEN** a component uses `text-brand-green` or `bg-brand-red`
- **THEN** Tailwind outputs the correct custom colour in the compiled CSS

#### Scenario: Dark mode class toggle works
- **WHEN** `<html>` has class `dark`
- **THEN** all `dark:` variants in Tailwind CSS are applied

---

### Requirement: React Router with HashRouter
The app SHALL use `react-router-dom` with `HashRouter` for client-side routing, ensuring it works on GitHub Pages without server configuration.

The router SHALL define a single route: `"/"` → `<HubPage />`.

#### Scenario: App renders at root hash route
- **WHEN** user navigates to `<base-url>/#/`
- **THEN** `HubPage` renders without 404 errors

#### Scenario: Direct URL load on GitHub Pages
- **WHEN** user opens `https://<org>.github.io/<repo>/#/`
- **THEN** the page loads correctly and shows the hub

---

### Requirement: TypeScript strict mode enabled
`tsconfig.json` SHALL enable `"strict": true` and `"noUnusedLocals": true`. The build SHALL produce zero TypeScript errors.

#### Scenario: Type error prevents build
- **WHEN** a TypeScript type error exists in any `src/` file
- **THEN** `npm run build` exits with a non-zero code and reports the error
