import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Link as MaterialLink,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const AppBarComponent = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [underlineFindClasses, setUnderlineFindClasses] = useState("always");
  const [underlineYourClasses, setUnderlineYourClasses] = useState("none");

  const handleLogoClick = () => {
    setUnderlineFindClasses("always");
    setUnderlineYourClasses("none");
    navigate("/");
  };

  const handleYourClick = () => {
    setUnderlineFindClasses("none");
    setUnderlineYourClasses("always");
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      navigate("/your-classes");
    }
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
        <Typography
          sx={{
            pr: 5,
            fontWeight: 600,
            fontSize: "1.5rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleLogoClick}
        >
          <MaterialLink color="inherit" underline={underlineFindClasses}>
            Find Classes
          </MaterialLink>
        </Typography>
        <Typography
          sx={{
            pr: 5,
            fontWeight: 600,
            fontSize: "1.5rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleYourClick}
        >
          <MaterialLink color="inherit" underline={underlineYourClasses}>
            Your Classes
          </MaterialLink>
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
