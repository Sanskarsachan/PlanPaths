import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    planItems: [
      {
        code: { type: String, required: true },
        name: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("plan", planSchema);
export default Plan;
