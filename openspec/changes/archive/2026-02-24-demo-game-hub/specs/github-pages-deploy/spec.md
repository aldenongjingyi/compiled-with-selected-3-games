## ADDED Requirements

### Requirement: Vite base URL configured for GitHub Pages
`vite.config.ts` SHALL set the `base` option to the repository sub-path when building for GitHub Pages. The base SHALL default to `"/"` for local development and be overridden by the `VITE_BASE_PATH` environment variable (or hard-coded to the repo name) for production builds.

Recommended pattern:
```typescript
base: process.env.NODE_ENV === 'production' ? '/compiled-with-selected-3-games/' : '/',
```
(or via env variable for flexibility)

#### Scenario: Built assets use correct base path
- **WHEN** `npm run build` runs
- **THEN** all asset `src` and `href` attributes in `dist/index.html` are prefixed with the configured base path

#### Scenario: Game links resolve on GitHub Pages
- **WHEN** a user clicks a game card on the deployed GitHub Pages site
- **THEN** the game URL (`/compiled-with-selected-3-games/games/card.html`) resolves correctly

---

### Requirement: `gh-pages` deploy script in `package.json`
`package.json` SHALL include a `deploy` script that builds the project and publishes `dist/` to the `gh-pages` branch using the `gh-pages` npm package.

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

`gh-pages` SHALL be listed as a `devDependency`.

#### Scenario: Single command deploys to GitHub Pages
- **WHEN** developer runs `npm run deploy`
- **THEN** the project builds and the `dist/` folder is published to the `gh-pages` branch without manual steps

---

### Requirement: Deployment section in AGENTS.md
`AGENTS.md` SHALL contain a "## Deployment" section documenting:
1. Prerequisites (Node.js, npm, GitHub remote configured)
2. First-time setup: enable GitHub Pages in repo settings, select `gh-pages` branch as source
3. Deploy command: `npm run deploy`
4. Local preview: `npm run preview`
5. Note about `base` URL and how to update it if the repo is renamed

#### Scenario: New developer can deploy from docs alone
- **WHEN** a new developer reads the AGENTS.md Deployment section
- **THEN** they have all information needed to deploy without asking for help

---

### Requirement: `dist/` excluded from git
`.gitignore` SHALL include `dist/` so the build output is not committed to the main branch. The `gh-pages` branch is managed exclusively by the `gh-pages` npm package.

#### Scenario: Build output not tracked
- **WHEN** developer runs `npm run build` and then `git status`
- **THEN** no files in `dist/` appear as untracked or modified in git
