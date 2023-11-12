import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    tag: { type: String, required: true },
    credits: { type: Number, required: true },
    length: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    weight: { type: Number, required: true },
    subcategory: { type: String, required: true },
    review: { type: Number, required: true },
    rating: { type: Number, required: true },
    cost: { type: Number, required: true },
    seats: { type: Number, required: true },
    description: { type: String, required: true },
    career: { type: String, required: true },
    prequisites: { type: String, required: true },
    requirement: { type: String, required: true },
    endOfCourse: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const course = mongoose.model("course", courseSchema);
export default course;
