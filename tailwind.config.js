/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  extend: {
    animation: {
      bounce200: "bounce 1s infinite 200ms",
      bounce400: "bounce 1s infinite 400ms",
    },
  },
};
