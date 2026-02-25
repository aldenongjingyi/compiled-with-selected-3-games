import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B35',
          'orange-dk': '#E5561F',
          yellow: '#FFD23F',
          coral: '#EF476F',
          mint: '#06D6A0',
        },
        makan: {
          cream: '#FFF8F0',
          'cream-alt': '#FFE8D0',
          brown: '#2D1506',
          'brown-2': '#8B5E3C',
          'brown-muted': '#C09070',
        },
      },
      fontFamily: {
        sans: [
          'Nunito',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(255,107,53,0.06), 0 4px 14px 0 rgba(255,107,53,0.08)',
        'card-hover': '0 6px 18px 0 rgba(255,107,53,0.14), 0 18px 44px 0 rgba(255,107,53,0.10)',
      },
      transitionTimingFunction: {
        apple:  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
