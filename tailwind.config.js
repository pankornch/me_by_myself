module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          "blue-green": "#20A2A0",
          "green-light": "#A2E1DB",
          "red": "#EC4C38",
          "red-light": "#EB8E8E",
          "grey": "#E5E5E5",
          "orange": "#F86513"
        }
      }
    },
  },
  plugins: [],
  mode: "jit"
}
