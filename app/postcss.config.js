const atImport = require("postcss-import")
const tailwindcss = require("tailwindcss")
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.svelte", "./src/**/*.css"],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})
const autoprefixer = require("autoprefixer")

module.exports = {
  plugins: [
    atImport,
    tailwindcss,
    autoprefixer,
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
}
