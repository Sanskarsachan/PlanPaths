import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Rating from "@mui/material/Rating";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import { AppBar, CssBaseline, IconButton, Toolbar } from "@mui/material";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import logger from "use-reducer-logger";
import Loader from "../Components/Loader";
import MessageAlerts from "../Components/Message";
import { getError } from "../utils";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 320;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [openFilter1, setOpenFilter1] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [checked, setChecked] = React.useState([0]);

  const handleClick = () => {
    setOpenFilter1(!openFilter1);
  };

  const handleToggle = (category) => () => {
    const currentIndex = checked.indexOf(category);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(category);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, courses: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [{ loading, error, courses }, dispatch] = useReducer(logger(reducer), {
    courses: [],
    loading: true,
    error: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/courses");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/courses/categories");
        setCategories(data);
        console.log(data);
      } catch (err) {
        toast.error(getError(err));
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const drawer = (
    <div>
      <Toolbar sx={{ background: "#2c2f31" }} />
      <Divider />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflowy: "hidden",
        }}
        component="nav"
      >
        <ListItemText
          primary="Filters"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
            align: "center",
          }}
        />
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Category" />
          {openFilter1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : error ? (
          <MessageAlerts severity="error">{error}</MessageAlerts>
        ) : (
          categories?.map((category) => {
            // console.log('yes it is')
            const labelId = `checkbox-list-label-${category}`;
            return (
              <div sx={{ overflowy: "hidden" }}>
                <Collapse in={openFilter1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding key={category}>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      role={undefined}
                      onClick={handleToggle(category)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          // checked={checked.indexOf(category) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText component="link" primary={category} />
                      <Link
                        to={`/search?category=${category}`}
                        onClick={() => setOpenFilter1(false)}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              </div>
            );
          })
        )}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            mt: 7,
            maxHeight: "60px",
            display: { xs: "block", lg: "none" },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, mt: 1 }}
            >
              <TuneIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, mt: 7 }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                overflowy: "hidden",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                overflowy: "hidden",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Grid mt={8}>
            <Item>
              <Grid container spacing={2}>
                {loading ? (
                  <div>
                    <Loader />
                  </div>
                ) : error ? (
                  <MessageAlerts severity="error">{error}</MessageAlerts>
                ) : (
                  courses?.map((course) => (
                    <Grid
                      {...{ xs: 12, sm: 12, md: 12, lg: 12 }}
                      minHeight={400}
                    >
                      <Link
                        to={`/courses/${course.code}`}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        <React.Fragment key={course}>
                          <Card
                            size="lg"
                            color="#000"
                            invertedColors
                            sx={{
                              bgcolor: "#fff",
                              "--Grid-borderWidth": "1px",
                              borderTop: "var(--Grid-borderWidth)",
                              borderLeft: "var(--Grid-borderWidth)",
                              "& > div": {
                                borderRight: "var(--Grid-borderWidth)",
                                borderBottom: "var(--Grid-borderWidth)",
                              },
                            }}
                          >
                            <Chip
                              size="m"
                              sx={{ pl: 2, pr: 2 }}
                              variant="outlined"
                            >
                              {course.tag}
                            </Chip>
                            <Typography size="m" align="left">
                              {course.name}
                            </Typography>
                            <List
                              size="sm"
                              sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                mx: "calc(-1 * var(--ListItem-paddingX))",
                              }}
                            >
                              <ListItem>
                                <Rating
                                  name="read-only"
                                  value={course.rating}
                                  readOnly
                                />
                              </ListItem>
                              <ListItem>{"Reviews" + course.review}</ListItem>
                            </List>
                            <Divider inset="none" />
                            <List
                              size="sm"
                              sx={{
                                gridTemplateColumns: "0.5fr 0.5fr",
                                mx: "calc(-1 * var(--ListItem-paddingX))",
                                display: { lg: "grid", sm: "block" },
                              }}
                            >
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Available Credits: " + course.credits}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Course Level: " + course.level}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Course Code: " + course.code}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Max GPA Weight: " + course.weight}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Course Length: " + course.length}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Category Type: " + course.type}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Course Category: " + course.category}
                              </ListItem>
                              <ListItem>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                {"Course Sub-category: " + course.subcategory}
                              </ListItem>
                            </List>
                            <Divider inset="none" />
                            <CardActions>
                              <Typography level="title-lg" sx={{ mr: "auto" }}>
                                {course.cost}${"/ year"}
                              </Typography>
                              <Button endDecorator={<KeyboardArrowRight />}>
                                Add To Cart
                              </Button>
                            </CardActions>
                          </Card>
                        </React.Fragment>
                      </Link>
                      <Divider />
                    </Grid>
                  ))
                )}
              </Grid>
            </Item>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
