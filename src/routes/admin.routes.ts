import express from "express";
import { getAllInstructorsController } from "../controllers/users.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const adminRoutes = express.Router();

adminRoutes.route("/instructors").get(requireAuth,adminMiddleware, getAllInstructorsController);
export {adminRoutes}