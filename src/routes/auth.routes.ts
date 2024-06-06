import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.route("/login").post(loginController);
authRoutes.route("/register").post(registerController);
authRoutes.route("/logout").post(logoutController);

export { authRoutes };
