import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "title must be at least 3 characters"],
      maxlength: [100, "title must be at most 100 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price cannot be negative"],
    },
  },
  { timestamps: true, versionKey: false },
);

const Course = mongoose.model("Course", courseSchema);

export { Course };
