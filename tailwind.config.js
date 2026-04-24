/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Rajdhani"', '"Orbitron"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: {
          900: '#03060c',
          800: '#060b18',
          700: '#0a1426',
          600: '#0e1a33',
          500: '#13223f'
        },
        cyber: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490'
        },
        neon: {
          green: '#22ffb7',
          cyan: '#00ffe5',
          magenta: '#ff2bd6',
          amber: '#ffb020',
          red: '#ff3b5c'
        }
      },
      animation: {
        'scan-line': 'scan-line 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'blink': 'blink 1.2s steps(2) infinite',
        'ticker': 'ticker 40s linear infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'grid-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' }
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' }
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.25)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
}
