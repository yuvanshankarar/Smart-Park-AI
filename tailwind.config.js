export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        primary: '#5b7fff',
        accent: '#8b5cf6'
      },
      boxShadow: {
        glow: '0 0 30px rgba(91, 127, 255, 0.2)'
      }
    }
  },
  plugins: []
};
