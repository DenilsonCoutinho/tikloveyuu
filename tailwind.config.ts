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
      boxShadow: {
        'custom-light': '0 2px 35px rgba(69, 0, 229, 3.9)', // sombra leve
        'custom-dark': '0 4px 10px rgba(0, 0, 0, 0.3)',  // sombra mais escura
        'inner-glow': 'inset 0 2px 8px rgba(0, 0, 0, 0.2)', // sombra interna
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
