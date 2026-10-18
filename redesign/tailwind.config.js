/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#050b14', 900: '#050b14', 800: '#08121f', 700: '#0c1a2c', 600: '#12243a' },
        navy: '#002a4b',
        lav: { DEFAULT: '#9391c7', bright: '#b4b2f5', deep: '#6d6bb0' },
        gold: { DEFAULT: '#d09b2c', soft: '#e6bd62' },
        paper: { DEFAULT: '#f3f2ee', 2: '#e9e8e2' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
};
