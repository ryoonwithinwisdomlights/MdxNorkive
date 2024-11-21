const BLOGG = require('./blogG.config')
const { fontFamilies } = require('./lib/font')

module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './themes/**/*.js'
  ],
  darkMode: BLOGG.APPEARANCE === 'class' ? 'media' : 'class', // or 'media' or 'class'
  theme: {
    fontFamily: fontFamilies,
    extend: {
      colors: {
        day: {
          DEFAULT: BLOGG.BACKGROUND_LIGHT || '#ffffff'
        },
        night: {
          DEFAULT: BLOGG.BACKGROUND_DARK || '#111827'
        }
        // rwwt: {
        //   'background-gray': '#f5f5f5',
        //   'black-gray': '#101414',
        //   'light-gray': '#e5e5e5'
        // }
      },
      maxWidth: {
        side: '14rem',
        '9/10': '90%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
