/* CommonJS fallback for environments or tools that expect module.exports
   Keeps the ESM `postcss.config.js` for projects using `type: "module"`.
*/
module.exports = {
    plugins: {
        tailwindcss: require('tailwindcss'),
        autoprefixer: require('autoprefixer'),
    },
};
