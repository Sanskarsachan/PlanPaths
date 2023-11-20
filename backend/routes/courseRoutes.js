import express from "express";
import expressAsyncHandler from "express-async-handler";
import coursemodel from "../models/CourseModel.js";

const courseRouter = express.Router();

courseRouter.get("/", async (req, res) => {
  const courses = await coursemodel.find();
  res.send(courses);
});

courseRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await coursemodel.find().distinct("category");
    if (categories) {
      res.send(categories);
    } else {
      res.status(404).send({ message: "Categories not found" });
    }
  })
);

courseRouter.get("/code/:code", async (req, res) => {
  const course = await coursemodel.findOne({ code: { $eq: req.params.code } });
  if (course) {
    res.send(course);
  } else {
    res.status(404).send({ message: "Course not found" });
  }
});

courseRouter.get("/:id", async (req, res) => {
  const course = await coursemodel.findById(req.params.id);
  if (course) {
    res.send(course);
  } else {
    res.status(404).send({ message: "Course Id Not Found" });
  }
});

export default courseRouter;
