import express from "express";
import { createRequire } from 'module';
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import planRouter from "./routes/planRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  })
  .catch((err) => {
    console.error('COULD NOT CONNECT TO DATABASE:', err.message);
  });

const app = express();
const require = createRequire(import.meta.url);
var cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/seed", seedRouter);
app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);
app.use('/api/plans', planRouter);
// app.use('/api/singup',)

app.get('/', (req, res) => {
  res.send("<h3>Planpths Backend</h3>");
});

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
