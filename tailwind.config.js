module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "carousel-after":
          "linear-gradient(to right bottom, rgba(23, 23, 23, 0.95), rgba(68, 68, 68, 0.25))",
      },
      container: {
        center: true,
      },
    },
  },

  daisyui: {
    themes: [
      "light",
      "dark",
      "corporate",
      "retro",
      "cyberpunk",
      "halloween",
      "forest",
      {
        primary: {
          primary: "#DA0037",
          secondary: "#DA0026",
          accent: "#FF6D0D",
          neutral: "#444444",
          "base-100": "#171717",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
