## ADDED Requirements

### Requirement: GameEntry TypeScript type defines game metadata shape
The file `src/types/game.ts` SHALL export a `GameEntry` interface with the following fields:

```typescript
export interface GameEntry {
  id: string;            // unique kebab-case identifier, e.g. "food-card"
  title: string;         // display name shown on card
  description: string;   // one-sentence description shown on card
  category: string;      // e.g. "Randomiser", "Puzzle", "Strategy"
  tags: string[];        // e.g. ["multiplayer", "AI", "prototype"]
  stats: {
    multiplayer?: boolean;
    ai?: boolean;
    prototype?: boolean;
  };
  thumbnail?: string;    // path relative to public root, e.g. "/thumbnails/food-card.png"
  url: string;           // absolute or root-relative URL opened in new tab
}
```

All fields except `thumbnail` and optional stats flags SHALL be required.

#### Scenario: Missing required field caught by TypeScript
- **WHEN** a registry entry omits `id`, `title`, `description`, `category`, `tags`, `stats`, or `url`
- **THEN** TypeScript reports a compile error identifying the missing field

#### Scenario: Optional fields have safe defaults
- **WHEN** `thumbnail` is omitted from a registry entry
- **THEN** the GameCard component renders a fallback placeholder without runtime errors

---

### Requirement: Central games registry file at `src/games/games.config.ts`
The file `src/games/games.config.ts` SHALL export a `const` array named `GAMES` typed as `GameEntry[]`. This file is the single source of truth for all game metadata.

The initial registry SHALL include at minimum:
- `id: "food-card"` — Food Randomiser (card.html)
- `id: "globe-spin"` — Globe Randomiser (globe.html)
- `id: "placeholder-game"` — A third placeholder game entry (prototype badge set true, url may be "#")

Each entry SHALL use `url: "/games/<filename>"` for existing games so they resolve correctly relative to the Vite base path.

#### Scenario: All initial games rendered as cards
- **WHEN** the hub page loads with no filters active
- **THEN** one card appears for each entry in the `GAMES` array

#### Scenario: Adding a new game requires only one file edit
- **WHEN** a developer adds a new `GameEntry` object to `GAMES` in `games.config.ts`
- **THEN** the new game card appears in the hub automatically on next build/reload with no other file changes required

---

### Requirement: Developer guide for adding games in AGENTS.md
`AGENTS.md` SHALL contain a section titled "## Adding a New Game" that describes the single-step process:
1. Open `src/games/games.config.ts`
2. Add a new `GameEntry` object to the `GAMES` array
3. Place the thumbnail image in `public/thumbnails/<id>.png` (optional)
4. Place the game HTML file in `public/games/<filename>.html` (if applicable)
5. Run `npm run dev` to verify the card appears

The guide SHALL include a copy-pasteable template entry.

#### Scenario: Developer follows guide successfully
- **WHEN** a developer follows the guide to add a new game
- **THEN** the new card appears in the hub with correct title, description, tags, and URL on click

---

### Requirement: All unique tags and categories are auto-derived from the registry
The filter system SHALL derive the list of available tags and categories at runtime by scanning the `GAMES` array — no separate static list of tags or categories is maintained.

#### Scenario: New tag appears in filter UI automatically
- **WHEN** a developer adds a `GameEntry` with a tag not previously in the registry
- **THEN** that tag appears in the filter bar on next load without any other code change
