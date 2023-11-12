import express from "express";
import coursemodel from "../models/CourseModel.js";

const courseRouter = express.Router();

courseRouter.get("/", async (req, res) => {
  const courses = await coursemodel.find();
  res.send(courses);
});

courseRouter.get("/code/:code", async (req, res) => {
  const course = await coursemodel.findOne({ code: { $eq: req.params.code } });
  if (course) {
    res.send(course);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
courseRouter.get("/:id", async (req, res) => {
  const course = await coursemodel.findById(req.params.id);
  if (course) {
    res.send(course);
  } else {
    res.status(404).send({ message: "course Not Found" });
  }
});

export default courseRouter;
