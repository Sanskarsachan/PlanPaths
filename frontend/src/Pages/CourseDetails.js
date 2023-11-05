import * as React from "react";
import axios from "axios";
import { useEffect, useReducer} from "react";
import { useParams } from "react-router";
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
import { Helmet } from "react-helmet-async";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

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

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
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
  const params = useParams();
  const { code } = params;

  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    course: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/courses/code/${code}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [code]);

  return (
    <>
      {" "}
      {/* <Helmet>{course.name}</Helmet> */}
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
              <Img
                alt="complex"
                src="https://image.pi7.org/static/img/ic_100kb.png"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {course.code}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  [{course.code}] [FL]
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Rating name="read-only" value={course.rating} readOnly />{" "}
                  {course.rating}
                  Reviews/Write A Review/14 answered questions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available Credits : {course.credits}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Course Level : {course.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Course Length : {course.length}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1A2027" }}
                  endIcon={<ShoppingCartIcon />}
                >
                  Add To Cart
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
                <Typography gutterBottom variant="subtitle1" component="div">
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
                variant="subtitle1"
                component="div"
              >
                {course.desription}
              </Typography>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.calories}
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
                <Typography gutterBottom variant="subtitle1" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  [{course.code}] [FL]
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {/* ))} */}
    </>
  );
}
