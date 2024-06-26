"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_model_1 = require("../models/users.model");
exports.adminMiddleware = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("--------------ADMIN MIDDLEWARE----------------");
    const requestingUser = req.user;
    const user = yield users_model_1.UserModel.findById(requestingUser._id);
    if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
        res.status(403);
        throw new Error("Unauthorized access denied!");
    }
    next();
}));
//# sourceMappingURL=admin.middleware.js.map