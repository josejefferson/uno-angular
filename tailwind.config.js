/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['dark'],
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false
  },
  safelist: [
    {
      pattern:
        /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(700|800|900)/,
      variants: ['hover']
    },
    {
      pattern:
        /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(900)/
    },
    {
      pattern: /border-yellow-500/
    }
  ]
}
