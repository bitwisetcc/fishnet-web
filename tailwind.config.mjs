/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        accent: "#11223A",
        "accent-middle": "#29446A",
        "accent-light": "#A1B2C9",
        "golden-fish": "#CBAD51",
        coral: "#C2745F",
        alt: "#ff9f1c",
        "alt-dimm": "#ffbf69",
        neutral: "#ffffff",
        highlight: "#cbf3f0",
        "highlighy-dimm": "#5bbfb5",
        "blue-dark": "#11223A", //cor 60% -- essa é a mesma cor azul escuro da NavBar da loja FishNet -Bianca
        "gray-light": "#CBD5E1", //cor 30% -- cinza
        "yellow-light": "#CBAD51", //cor 10% -- amarelo
        "branco-perolado": "#F0F0F0", //plano de fundo com detalhes
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        fishnet: {
          primary: "#EECF72", // golden yellow
          secondary: "#59AED9", // light blue
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ced9e5",
          "base-200": "#f1f5f9",

          // "--tglgb": "#deeaf7"
        },
      },
    ],
  },
};
