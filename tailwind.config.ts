import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#939598',
      },
      fontFamily: {
        sans: ['var(--font-SF-Pro-Display)'],
        mono: ['var(--font-NeueMontreal)'],
      },
      dropShadow: {
        '3xl': '10 0px 4px #F3F3F3',
      },
      flex: {
        '2': '1.5 1.5 0%',
      },
    },
  },
  plugins: [],
};
export default config;
