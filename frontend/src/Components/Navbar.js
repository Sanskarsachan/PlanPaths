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
import DrawerComp from "./Drawer";
import { Link } from "react-router-dom";
import Loader from "./Loader";
// import Badge from "@mui/material/Badge";
// import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Store } from "../Store";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CourseSearch from "./CourseSearch";



const Header = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);
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
              <CourseSearch />
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
                <CourseSearch />
                <Tab component={Link} to={"/plan"} label="Plan" />
                <Tab component={Link} to={"/whishlist"} label="Whishlist" />
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
                      {userInfo.name}A
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
                    </Button>
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
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Loader />
    </React.Fragment>
  );
};

export default Header;
