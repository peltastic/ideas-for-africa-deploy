import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: "400px",
      xs: "480px",
      sm: "600px",
      md: "768px",
      mm: "860px",
      lg: "1024px",
      des: "1200px",
      xl: "1440px",
      xxl: "1600px",
    },
    extend: {
      colors: {
        primary: "#B35009",
        "primary-light": "#E68B03",
        "primary-bg": "#FFFCFA",
        black1: "#131316",
        black2: "#131523",
        black3: "#363637",
        black4: "#333752",
        "black-footer": "#0B0B0B",
        gray1: "#56616B",
        gray2: "#E6E9EF",
        gray3: "#EFF1F6",
        gray4: "#6C6D75",
        gray5: "#B7B8BC",
        gray6: "#A6ABAF",
        gray7: "#F5F6FA",
        gray8: "#D7DBEC",
        gray9: "#A1A7C4",
        gray10: "#2B2B2F",
        "bg-grey1": "#F3F3F3",
        lightBlue: "#F3F3F3",
        butter: "#FFF3EA",
        errorRed: "#FF4F1E",
        errorFill: "#FDE7EA",
        errorText: "#F0142F",
        red1: "#E11900",
        "idea-bg": "#E5E9EA",
        "amber-bg": "#FFF9E5",
        "amber-dark": "#332600"
      },
      backgroundImage: {
        "auth": "url('/public/assets/auth-image.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
