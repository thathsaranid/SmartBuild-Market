/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#f5bf23",
          light: "#ffcf4d",
          dark: "#e6ad0e",
        },
        secondary: {
          DEFAULT: "#264653",
          light: "#3A6A7E",
          dark: "#1A3038",
        },
        accent: {
          DEFAULT: "#E76F51",
          light: "#EC8D75",
          dark: "#D54F2D",
        },
        neutral: {
          DEFAULT: "#264653",
          light: "#3A6A7E",
          dark: "#1A3038",
        },
        background: "#FAFAFA",
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
} 