/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        emerge: 'emerge 1s ease-in-out',
        display: 'display 1s linear',
        scale: 'scale 0.5s ease-in-out',
      },
      backgroundPosition: {
          "y-center": '-40px 0px'
      }
    },
  },
  plugins: [],
}

/* 

npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
-i: input
-o: output

*/

