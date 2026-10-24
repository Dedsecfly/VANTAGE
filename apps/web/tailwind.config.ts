const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{html,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d060b',
        surface: '#1b0e17',
        ink: '#ffffff',
        muted: '#9a8f97',
        accent: '#ff488b',
        'accent-ink': '#0d060b',
        'field-1': '#470c35',
        'field-1-ink': '#ffffff',
        'field-2': '#ffffff',
        'field-2-ink': '#101421',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        border: '#332e38',
      },
      fontFamily: {
        sans: ['Archivo', ...fontFamily.sans],
      },
      fontSize: {
        'step-small': 'clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)',
        'step-body': 'clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)',
        'step-lead': 'clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)',
        'step-head': 'clamp(2rem, 1.3rem + 3.2vw, 4rem)',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

module.exports = config