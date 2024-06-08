"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const instructorRoutes = express_1.default.Router();
exports.instructorRoutes = instructorRoutes;
instructorRoutes.route("/me").get(auth_middleware_1.requireAuth, users_controller_1.getLoggedInInstructor);
//# sourceMappingURL=instructor.routes.js.map