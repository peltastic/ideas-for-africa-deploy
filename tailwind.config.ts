import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      des: "1200px",
      xl: "1440px",
      xxl: "1600px",
    },
    extend: {
      colors: {
        primary: "#B35009",
        black1: "#131316",
        "black-footer": "#0B0B0B",
        gray1: "#56616B",
        gray2: "#E6E9EF",
        gray3: "#EFF1F6",
        gray4: "#6C6D75",
        gray5: "#B7B8BC",
        gray6: "#A6ABAF",
        gray7: "#F5F6FA",
        gray8: "#D7DBEC",
        lightBlue: "#F3F3F3",
        butter: "#FFF3EA"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
