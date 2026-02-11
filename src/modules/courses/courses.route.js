import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
} from "./courses.controller.js";
import { courseValidation } from "./validation.js";
import { checkRole } from "../../middleware/check-role.js";
import { verifyToken } from "../../middleware/verify-token.js";

const coursesRouter = Router();

coursesRouter
  .route("/")
  .get(getAllCourses)
  .post(verifyToken, checkRole("admin"), courseValidation, createCourse);

coursesRouter
  .route("/:id")
  .get(getCourseById)
  .delete(verifyToken, checkRole("admin"), deleteCourse)
  .patch(verifyToken, checkRole("admin"), updateCourse);

export { coursesRouter };
