import {extendTheme} from 'native-base';
import {DefaultTheme} from '@react-navigation/native';

export const theme = extendTheme({
  fontConfig: {
    DMSans: {
      100: {
        normal: 'ProximaNova-Regular',
        italic: 'ProximaNova-Italic',
      },
      200: {
        normal: 'ProximaNova-Regular',
        italic: 'ProximaNova-Italic',
      },
      300: {
        normal: 'ProximaNova-Regular',
        italic: 'ProximaNova-Italic',
      },
      400: {
        normal: 'ProximaNova-Regular',
        italic: 'ProximaNova-Italic',
      },
      500: {
        normal: 'ProximaNova-Semibold',
        italic: 'ProximaNova-MediumItalic',
      },
      600: {
        normal: 'ProximaNova-Semibold',
        italic: 'ProximaNova-MediumItalic',
      },
      700: {
        normal: 'ProximaNova-Bold',
        italic: 'ProximaNova-BoldItalic',
      },
      800: {
        normal: 'ProximaNova-Bold',
        italic: 'ProximaNova-BoldItalic',
      },
      900: {
        normal: 'ProximaNova-Bold',
        italic: 'ProximaNova-BoldItalic',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'DMSans',
    body: 'DMSans',
    mono: 'DMSans',
  },
  colors: {
    primary: {
      50: '#d9f7ff',
      100: '#ace1ff',
      200: '#7cccff',
      300: '#49b7ff',
      400: '#1aa2ff',
      500: '#0089e6',
      600: '#006ab4',
      700: '#004c82',
      800: '#002e51',
      900: '#001021',
      1000: '#DE5B57',
    },
    black: {
      50: '#E5E5E5',
      100: '#BABABA',
      150: '#222222',
      200: '#1B1B1B',
      300: '#A4A4A4',
      400: '#959699',
      500: '#818488',
      600: '#25262A',
      800: '#ccc',
      700: '#333',
      900: '#2C2C2C',
      1000: '#231F20',
      2000: '#000',
      3000: '#313133',
      4000: '#000000',
      5000: '#BDBDBD',
      6000: '#454547',
      7000: '#424746',
    },
    red: {
      900: '#EA452F',
    },
    gray: {
      50: 'rgba(0, 0, 0, 0.5)',
      150: 'rgba(0,0,0,0.4)',
      100: '#F7F7F9',
      200: '#E7E7EF',
      300: '#E7E7EF',
      400: '#8B8B8B',
      500: '#313133',
      600:'#D9D9D9',
      700:'#DADAE0',
      800:'#F7F7F9',
      900:'#E8E8EE'
    },
    appWhite: {
      200: 'rgba(255, 255, 255, 0.2)',
      700: '#f9f9f9',
      600: '#FFFFFF',
      800: 'rgba(249, 249, 249, 1)',
      900: 'rgba(249, 249, 249, 0.6)',
    },
    blue: {
      500: '#2396f3',
      600: '#49658c',
      700: '#90B9FE',
    },
    green:{
      500:'#00C92C'
    },
    purple: {
      500: '#A9ACBA',
    },
    transparentGray: {
      100: 'rgba(90, 90, 90,0.8)',
      200: 'rgba(52, 52, 52, 0.6)',
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#86b7fe',
  },
};

type CustomThemeType = typeof theme;

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
