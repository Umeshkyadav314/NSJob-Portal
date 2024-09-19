/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  container: {
    screens: {
      lg: "768px",
      xl: "768px",
      "2xl": "768px",
    },
    center: true,
    padding: {
      DEFAULT: "1.5rem",

    },
  },
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
};
export const plugins = [];
