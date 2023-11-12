import express from "express";
import coursemodel from "../models/CourseModel.js";
import data from "../data.js";
import usermodel from "../models/UserModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await coursemodel.deleteOne({});
  const createdCourses = await coursemodel.insertMany(data.courses);
  await usermodel.deleteOne({});
  const createdUsers = await usermodel.insertMany(data.users);
  res.send({ createdCourses, createdUsers });
});
export default seedRouter;
