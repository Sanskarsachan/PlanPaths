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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  padding: theme.spacing(0, 2),
  height: "80%",
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
      <AppBar sx={{ background: "#2c2f31"}}>
        <Toolbar sx={{ zIndex:999}}>
          {isMatch ? (
            <>
              <Typography
                component={Link}
                to={"/Home"}
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
                onChange={(e, value) => setValue(value)}
                component={Link}
                to={"/Home"}
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
                <Tab component={Link} to={"/Home"} label="Home" />
                <Tab component={Link} to={"/Courses"} label="Courses" />
                {/* <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <InputBase
                    placeholder="Search Courses…"
                    inputProps={{ "aria-label": "search" }}
                  />{" "}
                </Search> */}
                <Tab component={Link} to={"/Plan"} label="Plan" />
                <Tab component={Link} to={"/Whishlist"} label="Whishlist" />
              </Tabs>
              <Button
                component={Link}
                to={"/Login"}
                sx={{ marginLeft: "auto" }}
                variant="contained"
              >
                Login
              </Button>
              <Button
                component={Link}
                to={"/Signup"}
                sx={{ marginLeft: "10px" }}
                variant="contained"
              >
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
