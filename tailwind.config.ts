// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // si usas src
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // si usas pages
    ],
    theme: {
        extend: {
            colors: {
                secondary: "#f5741c", // cámbialo por el color que quieras
                darkBg: "#131424",
            },
            backgroundImage: {
                "gradient-cover":
                    "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) 5.91%, rgba(74, 47, 189, 0.5) 111.58%)",
            },
        },
    },
    plugins: [],
};

export default config;
