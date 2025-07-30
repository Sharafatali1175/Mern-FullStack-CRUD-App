// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js"  // ✅ for flowbite styles
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')         // ✅ Correct plugin
//   ],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",   // ✅ Add this
    "./node_modules/flowbite/**/*.js",         // ✅ And this
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),                // ✅ Required for Flowbite
  ],
};
