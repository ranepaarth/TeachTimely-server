"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const adminRoutes = express_1.default.Router();
exports.adminRoutes = adminRoutes;
adminRoutes.route("/instructors").get(auth_middleware_1.requireAuth, admin_middleware_1.adminMiddleware, users_controller_1.getAllInstructorsController);
