module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./public/**/*.html", "./src/**/*.vue"],
  },
  theme: {
    extend: {
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [],
}
