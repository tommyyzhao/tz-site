/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fh-purple": "#6349FF",
        "twitter-blue": "#1DA1F2",
        "twitter-x-black": "#14171A",
        "linkedin-blue": "#0077B5",
        "github-black": "#24292E",
        "body-gray300": "rgba(194, 194, 194, 1)",
        "body-gray400": "rgba(143, 143, 143, 1)",
        "body-gray500": "rgba(101, 101, 101, 1)",
        "body-gray600": "rgba(78, 78, 78, 1)",
        "body-gray700": "rgba(51, 51, 51, 1)",
        "body-gray800": "rgba(40, 39, 41, 1)",
        "body-gray900": "rgba(25, 24, 26, 1)",
      },
      dropShadow: {
        "sm-strong": "0 1px 1px rgba(0, 0, 0, 0.33)",
        "md-strong": "0 4px 3px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
