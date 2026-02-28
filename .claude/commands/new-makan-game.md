---
name: "New Makan Game"
description: Scaffold a new game for MakanHub — creates the themed HTML file, registers it in the game registry, and generates a matching thumbnail component
category: Development
tags: [games, scaffold, ui]
---

Scaffold a fully themed new game for the MakanHub project.

**Input**: The argument after `/new-makan-game` is the game name (PascalCase or plain words), e.g. `/new-makan-game MakanSpin` or `/new-makan-game spin wheel`. If omitted, ask for it.

---

## Step 1 — Gather requirements

If any of the following are not clear from the input, use **AskUserQuestion** to ask (combine into one call, max 3 questions):

- **Game name** — e.g. "MakanSpin" (used for the file name and display title)
- **Core mechanic** — one sentence: what does the player do and how is the restaurant revealed?
- **Visual object** — what is the main interactive element? (e.g. a spinning wheel, a slot machine reel, a claw machine, a scratch tile)

Derive from the answers:
- `id` — kebab-case, e.g. `makanSpin` → `makanspin`
- `filename` — `makan<name>.html`, e.g. `makanSpin.html` → `makanspin.html`
- `ComponentName` — `Makan<Name>Thumbnail`, e.g. `MakanSpinThumbnail`
- `prefix` — 2–3 letter SVG id prefix, e.g. `ms-`

---

## Step 2 — Read reference files

Read these files before writing anything:

1. `public/makan-theme.css` — the full shared design system (tokens, classes, keyframes)
2. `public/games/makanbox.html` — reference for the HTML structure pattern, JS patterns (audio, grid layout, interaction), and how `data.js` / `loadFBShops()` / `pickRandom()` are used
3. `src/components/thumbnails/MakanBoxThumbnail.tsx` — reference for the `const C` colour token pattern and SVG thumbnail structure
4. `src/games/games.config.ts` — to see the current registry and import pattern

---

## Step 3 — Create the game HTML file

Create `public/games/<filename>.html`.

**Required structure — every new game MUST follow this:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>[Game Display Name]</title>
  <link rel="stylesheet" href="../makan-theme.css">
  <style>
    /* game-specific styles only — tokens come from makan-theme.css */
  </style>
</head>
<body>
  <!-- Loading overlay using makan-theme patterns -->
  <div id="loading-overlay">
    <div class="loading-icon">[food emoji relevant to mechanic]</div>
    <p id="loading-text">[fun loading message e.g. "Spinning up…"]</p>
    <button id="tap-prompt">[CTA e.g. "Start Spinning!"]</button>
  </div>

  <!-- Main game area -->
  ...

  <!-- Warm backdrop (reuse from makanbox pattern) -->
  <div id="backdrop"></div>

  <!-- Re-pick / play again button -->
  <button id="repick-btn">[e.g. "Spin Again! 🎉"]</button>

  <script src="data.js"></script>
  <script>
    // Audio synthesis (copy pattern from makanbox, tune frequencies to match mechanic)
    // Layout / sizing utilities
    // DOM creation helpers
    // Game mechanic (unique per game)
    // Interaction handlers
    // init() + document.addEventListener('DOMContentLoaded', init)
  </script>
</body>
</html>
```

**Design rules to apply in the game-specific CSS:**

| Rule | Requirement |
|---|---|
| Background | `body` must use the warm dot pattern: `background-color: var(--makan-bg); background-image: radial-gradient(circle, rgba(255,107,53,0.10) 1.5px, transparent 1.5px); background-size: 28px 28px;` |
| Font | `font-family: var(--font)` everywhere |
| Loading overlay | `background: linear-gradient(160deg, #fff8f0 0%, #ffe8d0 100%)` |
| Loading emoji | Large food/mechanic emoji (48–64px), use `animation: makan-bounce-in 0.7s ...` |
| CTA button | Use `var(--makan-orange)` background, `var(--r-full)` border-radius, Nunito 800 weight |
| Backdrop | `rgba(45, 21, 6, 0.58)` with `backdrop-filter: blur(3px)` — never use black |
| Repick button | Same style as CTA, position fixed bottom-center |
| Accent colours | Use `var(--bc-0)` through `var(--bc-5)` for cycling item colours |
| Animations | Use springy easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for entrance/reveal |
| Max rotation | Items scattered on screen: ±8deg max (family-friendly, not chaotic) |
| Copy language | No gambling words: no "deal", "bet", "jackpot", "shuffle deck". Use food/fun words |

**JS patterns to reuse from makanbox.html:**

- `initAudio()` / Web Audio synthesis functions — copy and retune for the new mechanic
- `computePositions(count)` grid layout algorithm — reuse if items are scattered on screen
- `loadFBShops()` + `pickRandom(allShops, count)` — always use these for data
- `document.addEventListener('DOMContentLoaded', init)` entry point pattern
- `isPlacing` / `revealedItem` guard flags on interaction handlers

---

## Step 4 — Create the thumbnail component

Create `src/components/thumbnails/<ComponentName>.tsx`.

Model it exactly after `MakanBoxThumbnail.tsx`:

```tsx
// All colours defined here — NEVER hardcode hex in the SVG body
const C = {
  bg:        '#FFF8F0',   // body background — var(--makan-bg)
  dots:      'rgba(255,107,53,0.10)', // dot pattern colour
  // ... add tokens for every distinct colour used in the SVG
  // Each token should have an inline comment: // <CSS selector> → <property>
}

export default function <ComponentName>() {
  return (
    <svg viewBox="0 0 320 160" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* Background */}
      <rect width="320" height="160" fill={C.bg} />

      {/* Dot pattern — always include */}
      <defs>
        <pattern id="<prefix>-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.5" fill={C.dots} />
        </pattern>
      </defs>
      <rect width="320" height="160" fill={`url(#<prefix>-dots)`} />

      {/* Game-specific visual — simplified 2D representation of the mechanic */}
      {/* Keep it recognisable but simple: 3–6 SVG shapes max */}
    </svg>
  )
}
```

**SVG rules:**
- `viewBox="0 0 320 160"` — never change this
- `style={{ display: 'block', width: '100%', height: '100%' }}` — never change this
- All SVG `id` attributes must use the game's prefix (e.g. `ms-dots`, `ms-grad`) to avoid DOM collisions
- Every colour must be a `C` token — no bare hex strings in JSX
- Draw a simplified but recognisable version of the main game mechanic

---

## Step 5 — Register in games.config.ts

Open `src/games/games.config.ts` and:

1. Add the import at the top:
   ```ts
   import <ComponentName> from '../components/thumbnails/<ComponentName>'
   ```

2. Add a new `GameEntry` object to the `GAMES` array (before the `coming-soon` placeholder):
   ```ts
   {
     id: '<id>',
     title: '<Display Name>',
     description: '<one sentence — food/fun language, no gambling words>',
     category: 'Randomiser',
     tags: ['casual', 'food'],
     stats: {},
     thumbnailComponent: <ComponentName>,
     url: 'games/<filename>.html',
   },
   ```

---

## Step 6 — Verify build

Run:
```bash
npm run build
```

Fix any TypeScript or import errors before finishing.

---

## Step 7 — Report

Show a summary:
- Game HTML file created: `public/games/<filename>.html`
- Thumbnail component created: `src/components/thumbnails/<ComponentName>.tsx`
- Registry entry added to `src/games/games.config.ts`
- Build result (pass / errors fixed)
- Brief description of what the thumbnail looks like

---

## Guardrails

- Never link a CSS file other than `../makan-theme.css` for base styles — add game-specific overrides inline in `<style>`
- Never use gambling language in copy, button labels, or loading text
- Never hardcode hex colours in SVG body — always use `const C`
- Never change `viewBox` or the `style` prop on the root `<svg>` element
- Always use `loadFBShops()` and `pickRandom()` from `data.js` — do not hardcode restaurant data
- If the game doesn't scatter items on screen (e.g. a single spinning wheel), you don't need `computePositions()` — omit it
- The `coming-soon` placeholder entry in `games.config.ts` must remain last in the array
