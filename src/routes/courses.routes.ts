import express from "express";
import {
  createCourseController,
  getAllCourses,
  updateCourse,
} from "../controllers/courses.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { requireAuth } from "../middlewares/auth.middleware";
import multer from "multer";

const courseRoutes = express.Router();

const fileUpload = multer()

courseRoutes.use(requireAuth, adminMiddleware);
courseRoutes.route("/create").post(fileUpload.single("image"), createCourseController);
courseRoutes.route("/update/:courseId/lectures").patch(updateCourse);
courseRoutes.route("/").get(getAllCourses);

export { courseRoutes };
