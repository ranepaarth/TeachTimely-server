import express from "express";
import { getAllInstructorsController } from "../controllers/users.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const adminRoutes = express.Router();

adminRoutes.route("/instructors").get(requireAuth, getAllInstructorsController);
export {adminRoutes}