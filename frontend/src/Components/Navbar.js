import React, { useContext, useState } from "react";
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
import Badge from "@mui/material/Badge";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Store } from "../Store";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
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
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };
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
                  fontSize: "1rem",
                  paddingLeft: "3%",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <AddBusinessRoundedIcon
                  sx={{ fontSize: "1.1rem", transform: "scale(2)" }}
                />
              </Typography>
              <Search sx={{ ml: 2, mt: "1px" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <InputBase
                  sx={{ ml: "25%", color: "#fff" }}
                  placeholder="Search Courses…"
                  inputProps={{ "aria-label": "search" }}
                />{" "}
              </Search>
              <DrawerComp />
            </>
          ) : (
            <>
              <Typography
                component={Link}
                to={"/home"}
                label="Home"
                sx={{
                  fontSize: "1.8rem",
                  paddingLeft: "1%",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />{" "}
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
                <Search sx={{ ml: 0, mt: "8px" }}>
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
                {/* {cart.cartItems.length > 0 && (
                  <Badge
                    component={Link}
                    to={"/plan"}
                    badgeContent={cart.cartItems.reduce(
                      (a, c) => a + c.seats,
                      0
                    )}
                    color="primary"
                    style={{ color: "#fff" }}
                  >
                    <AutoStoriesIcon sx={{mt:3}} />
                  </Badge>
                )} */}
              </Tabs>
              {userInfo ? (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    title={userInfo.name}
                    style={{ color: "#fff" }}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem component={Link} to={"/plan"}>
                      Your plans
                    </MenuItem>
                    <MenuItem component={Link} to={"/profile"}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={signoutHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <div>
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
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Loader />
    </React.Fragment>
  );
};

export default Header;
