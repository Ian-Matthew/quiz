module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        correct:
          "0 0 20px rgba(0, 255, 0, .6), inset 0 0 10px rgba(0, 255, 0, .4), 0 2px 0 #000",
      },
      fontFamily: {
        question: ["Playfair Display", "serif"],
        display: ["Helvetica", "sans-serif"],
        fancy: ["Garamond", "serif"],
      },
      animation: {
        score: "score .6s ease-in-out",
        "score-perfect": "score .4s ease-in-out .1s",
        typo: "shake .7s cubic-bezier(.36,.07,.19,.97) both",
        reveal: "reveal .5s  ease-in-out both",
        glow: "glow .5s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        score: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0",
          },

          "50%": {
            transform: "scale(2)",
            opacity: "1",
          },
          "75%": {
            opacity: ".2",
          },
        },
        reveal: {
          "0%": {
            backgroundSize: "100% 100%",
          },
          "100%": {
            backgroundSize: "0% 100%",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
