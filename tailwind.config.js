/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.800"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-links": theme("colors.blue.600"),
            "--tw-prose-links-hover": theme("colors.blue.700"),
            "--tw-prose-invert-body": theme("colors.gray.200"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-links": theme("colors.blue.400"),
          },
        },
      }),
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
}
