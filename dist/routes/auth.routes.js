"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = express_1.default.Router();
exports.authRoutes = authRoutes;
authRoutes.route("/login").post(auth_controller_1.loginController);
authRoutes.route("/register").post(auth_controller_1.registerController);
authRoutes.route("/logout").post(auth_controller_1.logoutController);
