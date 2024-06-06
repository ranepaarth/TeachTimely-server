import express from "express";
import {
  createCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/courses.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const courseRoutes = express.Router();

courseRoutes.use(requireAuth)
courseRoutes.route("/create").post(createCourse);
courseRoutes.route("/update/:courseId").patch(updateCourse);
courseRoutes.route("/").get(getAllCourses);

export { courseRoutes };
