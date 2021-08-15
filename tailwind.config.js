module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "1xs": "0.625rem",
      },
    },
  },
  variants: { extend: {} },
  plugins: [],
};
