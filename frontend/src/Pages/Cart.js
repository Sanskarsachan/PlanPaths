import * as React from "react";
import axios from 'axios';
import { useContext } from "react";
import { Store } from "../Store";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";
import MessageAlerts from "../Components/Message";
import { Link, Navigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Cart() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
//   const updateCartHandler = async (course, seats) => {
//     const { data } = await axios.get(`/api/courses/${course.code}`);
//     if (data.countInStock < seats) {
//       window.alert('Sorry. Product is out of stock');
//       return;
//     }
//     ctxDispatch({
//       type: 'CART_ADD_ITEM',
//       payload: { ...course, seats },
//     });
//   };
  const removeItemHandler = (course) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: course });
  };

  const checkoutHandler = () => {
    Navigate('/signin?redirect=/shipping');
  };
  return (
    <Paper
      sx={{
        p: 1,
        ml: "auto",
        mr: "auto",
        mt: 2,
        mb: 2,
        maxWidth: 800,
        minHeight: "80vh",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Typography variant="h4" p={3} gutterBottom>
        My Plan
      </Typography>
      {cartItems.length === 0 ? (
        <MessageAlerts>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </MessageAlerts>
      ) : (
        <div>
          {cartItems.map((course) => (
            <Link
              to={`/courses/${course.code}`}
              style={{ textDecoration: "none" }}
            >
              <Grid
                key={course.code}
                container
                sx={{
                  border: "3px solid #D6D6D6",
                  p: 2,
                  mt: 2,
                  borderRadius: "8px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid item>
                  <ButtonBase sx={{ width: 150, height: 100 }}>
                    <Img
                      alt="complex"
                      src="https://source.unsplash.com/random?wallpapers"
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {course.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      align="right"
                      component="div"
                    >
                      {course.cost}
                    </Typography>
                    <Button
                      onClick={() => removeItemHandler(course)}
                      variant="outlined"
                      sx={{ cursor: "pointer" }}
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          ))}
        </div>
      )}
    </Paper>
  );
}
