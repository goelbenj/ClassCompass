import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#21a1c4",
    },
    secondary: {
      main: "#b5ecfb",
      light: "#ffffff",
      dark: "#21a1c4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#282c34",
    },
  },
  components: {
    MuiPaper: {
      root: {
        padding: "20px 10px",
        margin: "10px",
        backgroundColor: "#fff", // 5d737e
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          margin: "5px",
        },
      },
    },
  },
});

export default theme;
