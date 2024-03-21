import logo from "./logo.svg";
import { Button, Container, Paper, Typography } from "@mui/material";
import "./App.css";
import AppBarComponent from "./components/AppBar";

function App() {
  return (
    <Container maxWidth="xl" className="App">
      <AppBarComponent />
      <Paper>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App + Material-UI
        </Typography>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
