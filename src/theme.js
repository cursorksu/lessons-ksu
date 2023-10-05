import { createTheme } from '@mui/material/styles';
import { PRIMARY_MAIN } from './constants/colors';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "'Coco Gothic Alternate', sans-serif",
    fontWeight: 100,
    fontSize: 14,
    lineHeight: 1.3,
    button: {
      fontFamily: "'Coco Gothic Small Caps', sans-serif",
      fontWeight: 100,
      fontSize: 14,
      lineHeight: 1.3,
      textTransform: 'none',
      letterSpacing: 0,
    },

    body: {
      component: 'p',
      fontFamily: "'Coco Gothic Alternate', sans-serif",
      fontWeight: 100,
      fontSize: 14,
      lineHeight: 1.3,
    },
  },
  palette: {
    primary: {
      main: PRIMARY_MAIN,
    },
  },
});
