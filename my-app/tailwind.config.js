export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // define your own screens
    screens: {
      sm: "515px",
      md: "745px", 
      lg: "976px",
      xl: "1640px",
    },
    
    container: {
      center: true,
      'xl': '999px',
      'lg': '745px',
      'md': '515px'
    },

    extend: {},
  },
  plugins: [],
}
