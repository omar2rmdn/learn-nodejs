import { validationResult } from "express-validator";
import { Course } from "./courses.model.js";

// get all
export const getAllCourses = async (req, res) => {
  const limit = req.params.limit || 10;
  const page = req.params.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find().limit(limit).skip(skip);

  res.status(200).json({
    status: "success",
    message: "courses fetched successfully",
    data: courses,
  });
};

// get one
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({ status: "error", message: "course not found" });
  }

  res.status(200).json({
    status: "success",
    message: "course fetched successfully",
    data: course,
  });
};

// add one
export const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "validation failed",
      errors: errors.array(),
    });
  }

  const course = new Course({ ...req.body });
  await course.save();

  res.status(201).json({
    status: "success",
    message: "course created successfully",
    data: course,
  });
};

// delete one
export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({ status: "error", message: "course not found" });
  }

  res
    .status(200)
    .json({ status: "success", message: "course deleted successfully" });
};

// update one
export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!course) {
    return res
      .status(404)
      .json({ status: "error", message: "course not found" });
  }

  res.status(200).json({
    status: "success",
    message: "course updated successfully",
    data: course,
  });
};
