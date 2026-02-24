import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_PATH env var to override, e.g. for a different repo name.
// Defaults to the current repo path for GitHub Pages.
const base = process.env.VITE_BASE_PATH ?? (
  process.env.NODE_ENV === 'production' ? '/compiled-with-selected-3-games/' : '/'
)

export default defineConfig({
  plugins: [react()],
  base,
})
