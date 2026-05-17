import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FDF8F5',
        card: '#FFFFFF',
        text: '#3D2A1E',
        sub: '#9A7060',
        accent: '#F3C3B2',
        accent2: '#C9A46A',
        countdown: '#FDE8D3',
        border: 'rgba(243, 195, 178, 0.4)',
        btn: '#F3C3B2',
        btnText: '#3D2A1E',
      },
      fontFamily: {
        'cormorant': ['var(--font-cormorant)'],
        'jost': ['var(--font-jost)'],
        'cursive': ['var(--font-cursive)'],
      },
      letterSpacing: {
        'wider-2': '2px',
        'wider-3': '3px',
        'wider-4': '4px',
        'wider-6': '6px',
      },
      animation: {
        'bounce-slow': 'bounce 1.8s infinite',
        'pulse-slow': 'pulse 2.4s infinite',
      },
    },
  },
  plugins: [],
};
export default config;