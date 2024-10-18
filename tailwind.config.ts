import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'defaultBg': '#0E0813',
      },
      textShadow: {
        'text': '1px 1px 2px rgba(69, 0, 229, 0.5)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      colors:{
        'redDefault': '#6638C6'
      }
    },
  },
  plugins: [],
};
export default config;
