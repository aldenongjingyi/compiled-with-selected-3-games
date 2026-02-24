## ADDED Requirements

### Requirement: Persistent dark/light theme toggle
The app SHALL support dark and light colour modes. The user's preference SHALL be persisted in `localStorage` under the key `"theme"` and restored on every page load. The default SHALL be the OS preference (`prefers-color-scheme`), falling back to `"light"`.

Theme switching SHALL work by toggling the `dark` class on the `<html>` element. A `useTheme` hook at `src/hooks/useTheme.ts` SHALL encapsulate this logic and expose `{ theme, toggleTheme }`.

#### Scenario: Theme persists across page reloads
- **WHEN** user selects dark mode and refreshes the page
- **THEN** the page loads in dark mode without a flash of the wrong theme

#### Scenario: Toggle button changes theme
- **WHEN** user clicks the theme toggle button in the header
- **THEN** the mode switches between light and dark instantly

#### Scenario: OS preference respected on first visit
- **WHEN** a new user with no stored preference visits and their OS is in dark mode
- **THEN** the hub defaults to dark mode

---

### Requirement: Header with branding and theme toggle
The `Header` component SHALL render:
- App title: **"Map72 Game Hub"**
- Map72 org logo image fetched from `https://avatars.githubusercontent.com/u/63832361?s=200&v=4`, displayed as a circular 36px avatar to the left of the title
- `ThemeToggle` button on the right (sun icon in dark mode, moon icon in light mode; icons via inline SVG or a lightweight icon library)
- Full-width, sticky at top on scroll, with a subtle frosted-glass backdrop (`backdrop-blur`) in both themes

#### Scenario: Logo renders
- **WHEN** the hub loads
- **THEN** the Map72 circular avatar is visible in the header

#### Scenario: Header stays visible on scroll
- **WHEN** the user scrolls down past the fold
- **THEN** the header remains at the top of the viewport

---

### Requirement: Live search bar filters games by name
A `SearchBar` component SHALL render a text input that filters the `GAMES` array in real time as the user types. Matching SHALL be case-insensitive and match against `title` and `description` fields. No debounce required (synchronous filtering is acceptable for < 50 games).

#### Scenario: Search narrows results
- **WHEN** user types "card" in the search bar
- **THEN** only games whose title or description contains "card" (case-insensitive) are shown

#### Scenario: Empty search shows all games
- **WHEN** the search bar is cleared
- **THEN** all games matching the active tag/category filters are shown

---

### Requirement: Tag and category filter chips
A `FilterBar` component SHALL render two groups of toggle chips:
- **Tags** — one chip per unique tag derived from the registry (e.g. "multiplayer", "AI", "prototype")
- **Categories** — one chip per unique category (e.g. "Randomiser", "Puzzle")

Multiple tags may be selected simultaneously (OR logic within tags). A single category may be selected at a time. Selecting a chip filters the game grid. An "All" chip SHALL deselect all filters in the group.

Active chips SHALL have a visually distinct state (filled background using `brand.green`).

#### Scenario: Tag filter narrows grid
- **WHEN** user selects the "prototype" tag chip
- **THEN** only games with `tags` containing "prototype" are shown

#### Scenario: Multiple tags use OR logic
- **WHEN** user selects both "AI" and "multiplayer" tag chips
- **THEN** games matching either tag are shown

#### Scenario: Category filter combines with tag filter
- **WHEN** user selects category "Randomiser" and tag "prototype"
- **THEN** only games that match BOTH the category AND at least one selected tag are shown

#### Scenario: Clear all filters
- **WHEN** user clicks "All" in any filter group
- **THEN** that group's filter is cleared and all games matching remaining active filters show

---

### Requirement: Animated game cards with stats badges
A `GameCard` component SHALL render each `GameEntry` as a card with:
- **Thumbnail** — `<img>` using `thumbnail` path; falls back to a placeholder (coloured div with game initial letter) if `thumbnail` is undefined or fails to load
- **Title** — `GameEntry.title` in bold
- **Description** — `GameEntry.description` in muted text
- **Category badge** — small pill with `GameEntry.category`
- **Stats badges** — for each true flag in `GameEntry.stats` (multiplayer / AI / prototype), a distinct coloured badge appears
- **Hover animation** — scale `1.03` + elevated box shadow, using Tailwind `transition-transform` with `ease-apple` timing (300ms)
- **Click action** — entire card is a link (`<a>`) opening `GameEntry.url` in a new tab with `rel="noopener noreferrer"`

#### Scenario: Card thumbnail fallback
- **WHEN** a game has no thumbnail or the image fails to load
- **THEN** a placeholder with the first letter of the title is shown instead

#### Scenario: Card opens game in new tab
- **WHEN** user clicks a game card
- **THEN** the game URL opens in a new browser tab; the hub page remains open

#### Scenario: Stats badges render correctly
- **WHEN** a game has `stats.ai = true` and `stats.prototype = true`
- **THEN** two badges ("AI" and "Prototype") appear on the card; no "Multiplayer" badge

#### Scenario: Hover animation triggers
- **WHEN** user hovers over a game card on desktop
- **THEN** the card scales up smoothly and casts a deeper shadow

---

### Requirement: Responsive game card grid
The hub's main content area SHALL display games in a CSS grid:
- Mobile (default): 1 column
- `sm` (640px+): 2 columns
- `lg` (1024px+): 3 columns
- Cards SHALL have equal height within a row (stretch)

#### Scenario: Grid reflows on resize
- **WHEN** viewport is resized from desktop to mobile width
- **THEN** the grid collapses from 3 columns to 1 column without horizontal overflow

---

### Requirement: Empty state when no games match filters
When the combined search + filter query matches zero games, the hub SHALL display an empty state message (e.g. "No games found — try clearing your filters.") instead of an empty grid.

#### Scenario: Empty state shown on no match
- **WHEN** user types a search term that matches no games
- **THEN** the empty state message is shown and no cards are visible

---

### Requirement: useGameFilter hook encapsulates filter logic
A `useGameFilter` hook at `src/hooks/useGameFilter.ts` SHALL accept the full `GAMES` array and return `{ query, setQuery, selectedTags, toggleTag, selectedCategory, setCategory, filteredGames }`. The `HubPage` component SHALL use this hook exclusively for all search/filter state.

#### Scenario: Hook returns correct filtered list
- **WHEN** `setQuery("globe")` is called on the hook
- **THEN** `filteredGames` contains only games matching "globe" in title or description
