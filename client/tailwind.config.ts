import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "min-height": "min-height",
        opacity: "opacity",
      },
      colors: {
        primary: "#1D9ECD",
        secondary: "#1c1d1d",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
        pure_black: "#040537",
      },
    },
  },
  plugins: [],
};
export default config;
