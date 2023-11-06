import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import DrawerComp from "./Drawer";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop: "8px",
  height: "90%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#2c2f31" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography
                component={Link}
                to={"/home"}
                label="Home"
                sx={{
                  fontSize: "2rem",
                  paddingLeft: "10%",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                PlanPaths
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <AddBusinessRoundedIcon
                onChange={(e, value) => setValue(value)}
                sx={{ transform: "scale(2)" }}
              />
              <Typography
                component={Link}
                to={"/home"}
                label="Home"
                sx={{
                  fontSize: "2rem",
                  paddingLeft: "1%",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                PlanPaths
              </Typography>
              <Tabs
                sx={{ marginLeft: "auto", fontWeight: "bold" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab component={Link} to={"/home"} label="Home" />
                <Tab component={Link} to={"/courses"} label="Courses" />
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <InputBase
                    sx={{ ml: "22%", color: "#fff" }}
                    placeholder="Search Courses…"
                    inputProps={{ "aria-label": "search" }}
                  />{" "}
                </Search>
                <Tab component={Link} to={"/plan"} label="Plan" />
                <Tab component={Link} to={"/whishlist"} label="Whishlist" />
              </Tabs>
              <Button
                component={Link}
                to={"/login"}
                sx={{ marginLeft: "auto" }}
                variant="contained"
              >
                Login
              </Button>
              <Button
                component={Link}
                to={"/signup"}
                sx={{ marginLeft: "10px" }}
                variant="contained"
              >
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Loader />
    </React.Fragment>
  );
};

export default Header;
