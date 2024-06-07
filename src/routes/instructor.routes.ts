import express from "express";
import { getLoggedInInstructor } from "../controllers/users.controller";
import { requireAuth } from "../middlewares/auth.middleware";
const instructorRoutes = express.Router();

instructorRoutes.route("/me").get(requireAuth,getLoggedInInstructor);

export {instructorRoutes}