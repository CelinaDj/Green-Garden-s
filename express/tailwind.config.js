// tailwind.config.js
module.exports = {
  content: [
    "./views/**/*.ejs", // Adjust based on the structure, for EJS templates
    "./*.html", // If you also use HTML files in the root
    "./src/**/*.js", // If Tailwind classes are used in JavaScript files
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://utfs.io/f/GGYNM8xudcj64sHKZePZoLHQEbRsOlAXu26YUPdytek9xJh3')",
      },
      backgroundPosition: {
        "top-25-right-0": "top 25% right 0",
      },
      height: {
        "90vh": "90vh",
      },
      padding: {
        20: "80px",
      },
    },
  },
  plugins: [],
};
