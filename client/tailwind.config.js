const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f7f2',
          100: '#ede8d9',
          200: '#e1d9c0',
          300: '#d4c9a6',
          400: '#c2b280',
          500: '#9b8e66',
          600: '#746b4d',
          700: '#4e4733',
          800: '#27241a',
        },
        main: '#111111',
        secondary: '#92938C'
      },
      fontFamily: {
        'body': ["IBM+Plex+Sans+Condensed"]
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

      },
      animation: {
        'wiggle': 'wiggle 300ms ease-in-out ',
        'spin-slow': 'spin 7s linear infinite',
      },
    },
  },
  plugins: [Myclass],
}
