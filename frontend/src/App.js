import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";
import AppBarComponent from "./components/AppBar";

function App() {
  return (
    <Container maxWidth="xl" className="App">
      <AppBarComponent />
      <Outlet />
    </Container>
  );
}

export default App;
