import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";

const AppBarComponent = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      <Toolbar>
        <IconButton onClick={handleLogoClick}>
          <Avatar src={logo} sx={{ height: "80px", width: "80px" }} />
        </IconButton>
        <Typography variant="h4" fontSize="3.5rem">
          Class Compass
        </Typography>
        <Box sx={{ flex: 1 }}></Box>
        <Typography sx={{ pr: 5, fontWeight: 600, fontSize: "1.5rem" }}>
          Find Classes
        </Typography>
        <Typography sx={{ pr: 5, fontWeight: 600, fontSize: "1.5rem" }}>
          Your Classes
        </Typography>
        <Link to={"/login"}>
          <IconButton>
            <AccountCircleTwoToneIcon
              sx={{ fontSize: "3rem", color: "secondary.main" }}
            />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
