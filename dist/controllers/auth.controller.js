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
exports.registerController = exports.logoutController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = require("mongoose");
const users_model_1 = require("../models/users.model");
/* User Login */
const loginController = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield users_model_1.UserModel.findOne({
        email,
    });
    if (!user) {
        throw new mongoose_1.Error("Email does not exist!");
    }
    const matchedPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!matchedPassword) {
        throw new mongoose_1.Error("Incorrect Password!");
    }
    const accessToken = yield user.generateAccessToken();
    console.log({ accessToken });
    res.cookie(process.env.ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, user, accessToken });
}));
exports.loginController = loginController;
/* Register */
const registerController = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingInstructor = yield users_model_1.UserModel.findOne({
            email,
        });
        if (existingInstructor) {
            res
                .status(400)
                .json({ success: false, message: "Email already exist!" });
            return;
        }
        const newInstructor = yield users_model_1.UserModel.create({
            name,
            email,
            password,
            role: "INSTRUCTOR",
        });
        newInstructor.save();
        res.status(200).json({
            success: true,
            message: "Registration Successful!!",
        });
        return;
    }
    catch (error) {
        console.log(error);
        if (error instanceof mongoose_1.Error) {
            console.log(error);
        }
    }
}));
exports.registerController = registerController;
/* Logout */
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie(process.env.ACCESS_TOKEN_NAME, "", { expires: new Date(0) });
    res.status(200).json({ success: true, message: "Logged out successfully!!" });
});
exports.logoutController = logoutController;
//# sourceMappingURL=auth.controller.js.map