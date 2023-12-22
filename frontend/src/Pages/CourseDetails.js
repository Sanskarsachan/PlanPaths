import * as React from "react";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import Loader from "../Components/Loader";
import MessageAlerts from "../Components/Message";
import { getError } from "../utils";
import { Store } from "../Store";
// import { Helmet } from "react-helmet-async";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: "50%",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(specs, details) {
  return { specs, details };
}

const rows = [
  createData("Category Type", 159),
  createData("Course Category", 237),
  createData("Course Sub-Category", 262),
  createData("Course Level", 305),
  createData("Available Credits", 356),
  createData("Max GPA Weight", 356),
  createData("Course Length", 356),
  createData("Course Code", 356),
  createData("Career Tech Elective", 356),
  createData("Has Prerequisites", 356),
  createData("Prerequisites", 356),
  createData("Required (Generally)", 356),
  createData("End of Course (Generally)", 356),
];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, course: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CourseDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { code } = params;

  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    course: [],
    loading: true,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { plan } = state;
  const AddToCartHandler = async () => {
    const existItem = plan.planItems.find((x) => x.code === course.code);
    const seats = existItem ? existItem.seats + 1 : 1;
    const { data } = await axios.get(`/api/courses/code/${code}`);
    if (data.countInStock < seats) {
      window.alert("Sorry. course is out of stock");
      return;
    }
    ctxDispatch({
      type: "PLAN_ADD_ITEM",
      payload: { ...course, seats },
    });
    navigate("/plan");
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/courses/code/${code}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [code]);

  return (
    <React.Fragment key={course}>
      {/* <Helmet>{course.name}</Helmet> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageAlerts severity="error">{error}</MessageAlerts>
      ) : (
        <Paper
          sx={{
            margin: "auto",
            p: 3,
            maxWidth: 1000,
            flexGrow: 1,
            boxShadow: "none",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              pb: 2,
              border: "3px solid #D6D6D6",
              borderRadius: "8px",
            }}
          >
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <CardMedia
                  component="div"
                  image="https://source.unsplash.com/random?wallpapers"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    [{course.code}] [FL]
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating name="read-only" value={course.rating} readOnly />{" "}
                    {course.rating +
                      " Reviews / Write A Review / 14 answered questions"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"Available Credits : " + course.credits}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"Course Level : " + course.level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"Course Length : " + course.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={AddToCartHandler}
                    variant="contained"
                    sx={{ backgroundColor: "#1A2027" }}
                    endIcon={<ShoppingCartIcon />}
                  >
                    Enroll
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              pb: 1,
              mt: 2,
              border: "3px solid #D6D6D6",
              borderRadius: "8px",
            }}
          >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    Course Specification
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {course.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, border: "3px solid #D6D6D6", borderRadius: "8px" }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <Typography
                  sx={{ p: 1 }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {course.desription}
                </Typography>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.specs}>
                      <StyledTableCell component="th" scope="row">
                        {row.specs}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.details}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              pb: 1,
              mt: 2,
              border: "3px solid #D6D6D6",
              borderRadius: "8px",
            }}
          >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    {"Course Reviews (" + course.review + ") "}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"We don't have an reviews currently."}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              pb: 1,
              mt: 2,
              border: "3px solid #D6D6D6",
              borderRadius: "8px",
            }}
          >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    {"Write a review"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Your review"}
                  </Typography>
                </Grid>
                <Button
                  onClick={AddToCartHandler}
                  variant="contained"
                  sx={{ backgroundColor: "#1A2027", maxWidth: 300, ml: 2 }}
                  endIcon={<ShoppingCartIcon />}
                >
                  Post your review
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              pb: 1,
              mt: 2,
              border: "3px solid #D6D6D6",
              borderRadius: "8px",
            }}
          >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    {"Questions and answers (0)"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"We don't have an questions and anwsers currently."}
                  </Typography>
                </Grid>
                <Button
                  onClick={AddToCartHandler}
                  variant="contained"
                  sx={{ backgroundColor: "#1A2027", maxWidth: 300, ml: 2 }}
                  endIcon={<ShoppingCartIcon />}
                >
                  Ask your questions
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
      {/* ))} */}
    </React.Fragment>
  );
}
