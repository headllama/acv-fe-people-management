import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  shadows: {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    md: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    'dark-lg': 'rgba(0, 0, 20, 0.2) 0px 5px 30px;',
  },
  radii: {
    sm: '5px',
    md: '8px',
  },
  colors: {
    gray: {
      '900': '#181818',
      '800': '#232D42',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797F9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC', //#E9ECEF
      '50': '#E5E5E5',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
      },
    },
  },
  components: {
    Progress: {
      baseStyle: {
        backgroundColor: 'red',
      },
    },
  },
})
