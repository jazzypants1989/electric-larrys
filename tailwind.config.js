module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: "768px",
      nb: "1024px",
      lg: "1180px",
      xl: "1440px",
    },
    colors: {
      "blue": "#0050C0",
      "orange": "#F77605",
      "Red": "#Cb2f03",
      "Black": "#000000",
      "Yellow": "#FEFBA8",
      "Green": "#34FAC5",
      "Gray": "#8b8680",
    },
    fontSize: {
      xs: "1.05rem",
      sm: "1.25rem",
      base: "1.34rem",
      lg: "1.75rem",
      xl: "2rem",
      "2xl": "2.25rem",
      "3xl": "2.75rem",
      "4xl": "3rem",
      "5xl": "4rem",
    },
    fontFamily: {
      sans: ["Bangers"],
      serif: ["Bangers"],
    },
    extend: {
      backgroundImage: {
        "auth": "url('/images/bg1.jpg')",
      },
      boxShadow: {
        "3xl-left": "3px 3px 3px 3px rgba(247, 118, 5, 0.5)",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      right: {
        "big": "50%",
        "third": "33.333333%",
        "twoThird": "66.666667%",
      },
      left: {
        "big": "50%",
        "third": "33.333333%",
        "twoThird": "66.666667%",
      },
      borderRadius: {
        "4xl": "2rem",
        "cart": "10rem",
      },
      width: {
        "big": "48rem",
        "special": "40rem",
        "84": "22rem",
        "88": "23rem",
        "92": "24rem",
        "100": "26rem",
        "110": "28rem",
        "120": "30rem",
      },
      minWidth: {
        "100": "26rem",
      },
      animation: {
        "swoosh": "swoosh 0.75s ease-in-out 1",
        "woosh": "woosh 0.75s ease-in-out 1",
        "searchSlide": "searchSlide 0.75s ease-in-out 1",
        "dropDown": "dropDown 1.5s ease-in-out 1",
        "fasterDropDown": "fasterDropDown 0.75s ease-in-out 1",
        "flyUp": "flyUp 0.75s ease-in-out 1",
      },
      keyframes: {
        swoosh: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0%)", opacity: "1" },
        },
        woosh: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0%)", opacity: "1" },
        },
        searchSlide: {
          "0%": { transform: "translateY(-5%)", opacity: "0.1" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        dropDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        fasterDropDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        flyUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}

// Language: javascript
