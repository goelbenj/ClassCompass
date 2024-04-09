import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";
import AppBarComponent from "./components/AppBar";
import SearchBarBox from "./components/Search";

function App() {
  return (
    <Container maxWidth="xl" className="App">
      <AppBarComponent />
      <SearchBarBox />
      <Outlet />
    </Container>
  );
}

export default App;
