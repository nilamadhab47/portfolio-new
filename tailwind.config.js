/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        th: {
          bg: 'var(--c-bg)',
          card: 'var(--c-card)',
          surface: 'var(--c-surface)',
          hover: 'var(--c-hover)',
          text: 'var(--c-text)',
          'text-sub': 'var(--c-text-sub)',
          'text-muted': 'var(--c-text-muted)',
          'text-faint': 'var(--c-text-faint)',
          'text-dim': 'var(--c-text-dim)',
          'text-ghost': 'var(--c-text-ghost)',
          border: 'var(--c-border)',
          'border-mid': 'var(--c-border-mid)',
          'border-strong': 'var(--c-border-strong)',
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 0.3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
