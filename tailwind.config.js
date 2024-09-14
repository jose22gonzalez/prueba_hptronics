/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title:["Black Ops One", "system-ui"],
      
    },
    fontSize:{
      price:["Press Start 2P", "system-ui"]
    },
    
  },
  plugins: [],
}
}