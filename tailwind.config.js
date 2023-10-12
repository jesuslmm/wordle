/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 50%,  100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-15px)" },
          "60%": { transform: "translateY(-10px)" },
          "80%": { transform: "translateY(-5px)" },
        },
      },

      animation: {
        correctChar: "bounce 1s ease-in-out 1",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
