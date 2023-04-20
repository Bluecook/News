/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        xxl: '1536px',
      },
      backgroundColor: {
        light: {
          bg: 'rgb(var(--color-bg-base))',
          menu: 'rgb(var(--color-bg-menu))',
          hoverMenu: 'rgb(var(--color-menu-hover))',
          main: 'rgb(var(--color-bg-main))'
        }
      },
      textColor: {
        'primary': 'rgb(var(--color-text-base))',
        'active': 'rgb(var(--text-active))'
      }
    },
  },
  plugins: [],
}