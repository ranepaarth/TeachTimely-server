"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const courses_controller_1 = require("../controllers/courses.controller");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const courseRoutes = express_1.default.Router();
exports.courseRoutes = courseRoutes;
courseRoutes.use(auth_middleware_1.requireAuth, admin_middleware_1.adminMiddleware);
courseRoutes.route("/create").post(multer_middleware_1.upload.single("image"), courses_controller_1.createCourseController);
courseRoutes.route("/update/:courseId/lectures").patch(courses_controller_1.updateCourse);
courseRoutes.route("/").get(courses_controller_1.getAllCourses);
//# sourceMappingURL=courses.routes.js.map