/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  //  theme: {
  //   extend: {
  //     animation: {
  //       'fade-in': 'fadeIn 0.5s ease-in-out forwards',
  //     },
  //     keyframes: {
  //       fadeIn: {
  //         '0%': { opacity: '0' },
  //         '100%': { opacity: '1' },
  //       },
  //     },
  //   },
  // },
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        pulseSlow: 'pulseSlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
