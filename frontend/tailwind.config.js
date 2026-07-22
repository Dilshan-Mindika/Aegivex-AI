/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#080c14',
        surface: '#0f172a',
        'surface-card': '#1e293b',
        'surface-hover': '#334155',
        'brand-blue': '#3b82f6',
        'brand-cyan': '#06b6d4',
        'brand-purple': '#a855f7',
        'risk-low': '#10b981',
        'risk-medium': '#f59e0b',
        'risk-high': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px -3px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 20px -3px rgba(168, 85, 247, 0.4)',
        'glow-red': '0 0 20px -3px rgba(239, 68, 68, 0.4)',
      }
    },
  },
  plugins: [],
}
