import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#ece7d9',
          300: '#e0d9c3',
          400: '#c9b89f',
          500: '#a89880',
          600: '#8b7968',
          700: '#6d6456',
          800: '#594d48',
          900: '#443b35',
        },
        sunset: {
          50: '#fff9f0',
          100: '#fef3e6',
          200: '#fde3c4',
          300: '#fccb94',
          400: '#f9b35f',
          500: '#f4942f',
          600: '#e67e1b',
          700: '#cc6b17',
          800: '#a5531a',
          900: '#7d3f1a',
        },
        sage: {
          50: '#f8faf7',
          100: '#f0f5f0',
          200: '#dce7dc',
          300: '#bdd4bd',
          400: '#93b393',
          500: '#6b926b',
          600: '#557055',
          700: '#435243',
          800: '#354335',
          900: '#2a352a',
        },
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
