/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        /* Summus Edge — Primary (Deep Navy) */
        summus: {
          950: '#020617',
          900: '#0B1220',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#E2E8F0',
          50: '#F8FAFC',
        },
        /* Secondary — Electric Blue / Neon */
        electric: {
          950: '#082F49',
          900: '#0C4A6E',
          800: '#075985',
          700: '#0369A1',
          600: '#0284C7',
          500: '#0EA5E9',
          400: '#38BDF8',
          300: '#7DD3FC',
          200: '#BAE6FD',
          neon: '#00D4FF',
          glow: '#22D3EE',
        },
        /* Accent — Gold (Gamification / Levels) */
        gold: {
          950: '#451A03',
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706',
          500: '#F59E0B',
          400: '#FBBF24',
          300: '#FCD34D',
          200: '#FDE68A',
          premium: '#EAB308',
        },
        /* Accent — Emerald (Success / Progress) */
        emerald: {
          950: '#022C22',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          200: '#A7F3D0',
        },
        /* Semantic aliases */
        primary: {
          DEFAULT: '#0F172A',
          foreground: '#F8FAFC',
          muted: '#64748B',
          border: '#1E293B',
          card: '#0B1220',
          surface: '#020617',
        },
        secondary: {
          DEFAULT: '#0EA5E9',
          foreground: '#F0F9FF',
          muted: '#38BDF8',
        },
        accent: {
          gold: '#FBBF24',
          emerald: '#10B981',
          neon: '#00D4FF',
        },
        /* Legacy aliases — mapped to Summus palette for gradual migration */
        slate: {
          50: '#F8FAFC',
          100: '#E2E8F0',
          200: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        amber: {
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        rose: {
          600: '#E11D48',
        },
        sky: {
          100: '#E0F2FE',
          700: '#0369A1',
        },
        pink: {
          100: '#FCE7F3',
          700: '#BE185D',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 212, 255, 0.35)',
        gold: '0 0 20px rgba(251, 191, 36, 0.3)',
        card: '0 8px 32px rgba(2, 6, 23, 0.6)',
      },
    },
  },
  plugins: [],
}
