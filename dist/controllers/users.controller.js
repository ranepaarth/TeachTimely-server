"use strict";
/* Get all instructors whose role equals INSTRUCTOR */
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
exports.getLoggedInInstructor = exports.getAllInstructorsController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const courses_model_1 = require("../models/courses.model");
const users_model_1 = require("../models/users.model");
const getAllInstructorsController = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("Unauthorized access denied!!");
    }
    if (user.role === "INSTRUCTORS") {
        throw new Error("Unauthorized access denied!!");
    }
    const instructors = yield users_model_1.UserModel.find({
        role: { $ne: "ADMIN" },
    }).populate([
        {
            path: "lectures",
        },
    ]);
    if (!instructors) {
        res.status(200).json({ message: "No Instructors are yet registered!!" });
    }
    res.status(200).json(instructors);
}));
exports.getAllInstructorsController = getAllInstructorsController;
const getLoggedInInstructor = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const loggedInUser = yield users_model_1.UserModel.findById(user._id).populate([
        {
            path: "lectures",
        },
    ]);
    if (!loggedInUser) {
        throw new Error("Instructor not found!");
    }
    if (loggedInUser.role === "ADMIN") {
        throw new Error("Unauthorized access to admin denied");
    }
    const courses = yield courses_model_1.CourseModel.find({})
        .sort({ createdAt: -1 })
        .populate([
        {
            path: "lectures",
        },
    ]);
    const instructorLectures = courses.map((course) => ({
        _id: course._id,
        name: course.name,
        image: course.image,
        level: course.level,
        description: course.description,
        lectures: course.lectures.filter(lecture => lecture.instructor._id.toString() === loggedInUser._id.toString())
    })).filter(courses => courses.lectures.length !== 0);
    res.status(200).json(instructorLectures);
}));
exports.getLoggedInInstructor = getLoggedInInstructor;
