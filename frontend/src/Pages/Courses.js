import * as React from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/courses");
      setCourses(result.data);
    };
    fetchData();
  }, []);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {courses?.map((course) => {
          const labelId = `checkbox-list-label-${course}`;
          return (
            <ListItem key={course} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(course)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(course) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Filter ${course.value}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div sx={{ mt: 30 }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            mt: 8,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, mt: 8 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, mt: 8 }}
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
          <Grid xs={3}>
            <Item>
              <Grid
                container
                spacing={2}
                sx={{
                  "--Grid-borderWidth": "1px",
                  borderTop: "var(--Grid-borderWidth)",
                  borderLeft: "var(--Grid-borderWidth)",
                  "& > div": {
                    borderRight: "var(--Grid-borderWidth)",
                    borderBottom: "var(--Grid-borderWidth)",
                  },
                }}
              >
                {courses?.map((course) => (
                  <Grid {...{ xs: 12, sm: 12, md: 12, lg: 12 }} minHeight={160}>
                    <Link
                      to={`/courses/${course.code}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        key={course}
                        size="lg"
                        variant="solid #000"
                        color="#000"
                        border="1px"
                        invertedColors
                        sx={{ bgcolor: "#fff" }}
                      >
                        <Chip size="sm" variant="outlined">
                          {course.tag}
                        </Chip>
                        <Typography level="h2" align="left">
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
                            <Rating name="read-only" value={4} readOnly />
                          </ListItem>
                          <ListItem>Reviews {course.review}</ListItem>
                        </List>
                        <Divider inset="none" />
                        <List
                          size="sm"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "0.5fr 0.5fr",
                            mx: "calc(-1 * var(--ListItem-paddingX))",
                          }}
                        >
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Available Credits: {course.credits}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Course Level: {course.level}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Course Code: {course.code}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Max GPA Weight: {course.weight}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Course Length: {course.length}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Category Type: {course.type}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Course Category: {course.category}
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Course Sub-category: {course.subcategory}
                          </ListItem>
                        </List>
                        <Divider inset="none" />
                        <CardActions>
                          <Typography level="title-lg" sx={{ mr: "auto" }}>
                            {course.cost}${" "}
                            <Typography fontSize="sm" textColor="text.tertiary">
                              / year
                            </Typography>
                          </Typography>
                          <Button endDecorator={<KeyboardArrowRight />}>
                            Add To Cart
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                    <Divider />
                  </Grid>
                ))}
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
