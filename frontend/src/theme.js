import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#00325C",
    },
    secondary: {
      main: "#00325C",
      light: "#ffffff",
      dark: "#00325C",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#ffffff",
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
