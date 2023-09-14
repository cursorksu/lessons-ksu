import { createTheme } from "@mui/material/styles";
import { PRIMARY_MAIN } from "./constants/colors";

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
    fontFamily: "Montserrat, sans-serif",
    button: {
      fontFamily: "Montserrat, sans-serif",
      textTransform: "none",
      letterSpacing: 0,
      fontSize: 14,
      lineHeight: "16px",
      fontWeight: 100,
    },

    body: {
      component: "p",
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 300,
    },
  },
  palette: {
    primary: {
      main: PRIMARY_MAIN,
    },
  },
});
