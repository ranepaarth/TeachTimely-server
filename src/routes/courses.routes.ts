import express from "express";
import {
  createCourseController,
  getAllCourses,
  updateCourse,
} from "../controllers/courses.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { requireAuth } from "../middlewares/auth.middleware";
import { multerMiddleware } from "../middlewares/multer.middleware";

const courseRoutes = express.Router();

courseRoutes.use(requireAuth, adminMiddleware);
courseRoutes.route("/create").post(multerMiddleware, createCourseController);
courseRoutes.route("/update/:courseId/lectures").patch(updateCourse);
courseRoutes.route("/").get(getAllCourses);

export { courseRoutes };
