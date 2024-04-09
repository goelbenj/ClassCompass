import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import api from "../helpers/API";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha(theme.palette.secondary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(10),
    // vertical padding + font size from searchIcon
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchBarBox() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      api.filterCourses({ stringQuery: searchTerm }).then((result) => {
        if (result.result === "SUCCESSFUL") {
          console.log(result.data);
        } else {
          alert("SEARCH FAILED FOR SOME REASON");
        }
      });
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <AppBar position="sticky" sx={{ top: "114px" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Remove the MUI text */}
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
