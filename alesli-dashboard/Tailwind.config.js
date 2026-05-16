/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        pink: {
          primary: '#FF4DB8',
          soft: '#FCE7F3',
          hover: '#E84393',
        },
        purple: {
          secondary: '#A855F7',
        },
        brand: {
          bg: '#FFF9FC',
          card: '#FFFFFF',
          text: '#1F2937',
          muted: '#64748B',
          border: '#F1F5F9',
        },
        dark: {
          bg: '#0F172A',
          card: '#111827',
          card2: '#1E293B',
          text: '#F8FAFC',
          muted: '#CBD5E1',
          border: '#334155',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 32px rgba(255,77,184,0.15)',
        pink: '0 4px 14px rgba(255,77,184,0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-down': 'slideDown 0.25s ease',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
            transform: 'translateY(6px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          from: {
            opacity: 0,
            transform: 'translateY(-8px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}