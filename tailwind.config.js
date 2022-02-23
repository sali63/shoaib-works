const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        'portfolio-layout': '490px',
      },
      fontFamily: {
        'titillium-web': "'Titillium Web', sans-serif",
        poppins: "Poppins , 'Open Sans'",
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
      colors: {
        'primary-yellow': {
          DEFAULT: 'rgb(125, 127, 46)',
        },
        'primary-red': {
          DEFAULT: 'rgb(127, 49, 46)',
        },
        'primary-green': {
          DEFAULT: 'rgb(46, 127, 49)',
        },
        'primary-purple': {
          DEFAULT: '#C2A0E4',
          dark: '#6247aa',
          light: '#F6F1F9',
        },
        'primary-blue': {
          DEFAULT: '#102B3F',
        },
      },

      borderRadius: {
        '1/2': '50%',
      },

      screens: {
        xs: { max: '320px' },
        'mobile-sm': '375px',
        'mobile-lg': '426px',
        'tablet-sm': '520px',
        'tablet-md': '620px',
        'tablet-lg': '768px',
        'laptop-sm': '846px',
        'laptop-md': '1024',
        'laptop-lg': '1440px',
        // '2xl': '1440px',
        ...defaultTheme.screens,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.600'),
        },

        '.btn-indigo': {
          backgroundColor: theme('colors.indigo.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.indigo.600'),
          },
        },

        '.curved-corner-topright': {
          // width: '10px',
          // height: '10px',
          overflow: 'hidden',
          position: 'relative',

          '&:before': {
            content: "''",
            display: 'block',
            width: '200%',
            height: '200%',
            position: 'absolute',
            'border-radius': '40%',
            top: 0,
            right: 0,
            'box-shadow': '10px -10px 0 0 black',
          },
        },

        '.curved-corner-topleft': {
          // width: '10px',
          // height: '10px',
          overflow: 'hidden',
          position: 'relative',

          '&:before': {
            content: "''",
            display: 'block',
            width: '200%',
            height: '200%',
            position: 'absolute',
            'border-radius': '40%',
            top: 0,
            right: 0,
            'box-shadow': '-10px 10px 0 0 black',
          },
        },

        /* Width */
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '3px',
        },

        /* Track */
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: 'transparent',
          // height: '90%',
        },

        /* Handle */
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: '#888888',
          borderRadius: '5px',
          height: '10px',
        },

        /* Handle on hover */
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },

        // Mobile/desktop scroll tab shadow
        '.scroll-tab-selected': {
          'box-shadow':
            'inset 0 0 0 1px #102B3F, inset 0 3px 7px 0 rgb(0 0 0 / 8%)',
          'background-color': 'rgb(16 43 63 / 4%)',
        },
        // }
        '.round-bicolor-btn': {
          background: theme('colors.primary-purple'),

          background:
            'linear-gradient(180deg, rgba(194, 160, 228, 0.3) 0%, rgba(194, 160, 228, 0.3) 70%, theme(colors.primary-purple.light) 70%, theme(colors.primary-purple.light) 100%)',
          //
          '&:hover': {
            background:
              'linear-gradient(180deg, theme(colors.primary-purple.DEFAULT) 0%, theme(colors.primary-purple.DEFAULT) 100% )',
          },
        },
      });

      // addComponents(buttons);
    }),
  ],
};
