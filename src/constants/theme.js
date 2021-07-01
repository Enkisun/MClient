import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#90caf9",
      main: "#1a202c",
      dark: "#000",
    },
    secondary: {
      light: "#ffeb67",
      main: "#f9b934",
      dark: "#c28900",
    },
    action: {
      disabledBackground: "#000",
    },
  },
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
  // overrides: {
  //   MuiButton: {
  //     root: {

  //     },
  //   },
  // },
  breakpoints: {
    values: {
      desktop: 1024,
    },
  },
});

export default theme;
