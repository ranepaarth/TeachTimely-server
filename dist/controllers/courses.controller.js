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
exports.updateCourse = exports.getAllCourses = exports.createCourseController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moment_1 = __importDefault(require("moment"));
const cloudinary_1 = require("../lib/cloudinary");
const courses_model_1 = require("../models/courses.model");
const lectures_model_1 = require("../models/lectures.model");
const users_model_1 = require("../models/users.model");
/* Create a course */
const createCourseController = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, description } = req.body;
    if (!req.file) {
        throw new Error("Please upload an image");
    }
    const existingCourse = yield courses_model_1.CourseModel.findOne({
        name,
    });
    if (existingCourse) {
        throw new Error("Course already exists!");
    }
    const uploadedImage = yield (0, cloudinary_1.cloudinaryUploadImage)(req.file.path);
    if (!uploadedImage) {
        throw new Error("Something went wrong!");
    }
    const course = yield courses_model_1.CourseModel.create({
        name,
        level,
        description,
        image: uploadedImage.secure_url,
    });
    course.save();
    res.status(200).json({
        success: true,
        message: "Course created successfully!",
    });
    return;
}));
exports.createCourseController = createCourseController;
/* Update course with instructor and lecture date by sending the instructorId as a param or through the request body */
const updateCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { date, instructorId } = req.body;
    const instructor = yield users_model_1.UserModel.findById(instructorId);
    if (!instructor) {
        throw new Error("Instructor does not exist!");
    }
    if (instructor.role === "ADMIN") {
        throw new Error("Lectures cannot be assigned to an admin");
    }
    const course = yield courses_model_1.CourseModel.findById(courseId);
    if (!course) {
        throw new Error("Course not found!!");
    }
    const lectureDate = new Date(date);
    const existingLecture = yield lectures_model_1.LectureModel.findOne({
        date: lectureDate,
        instructor: instructorId,
    });
    if (existingLecture) {
        throw new Error(`Instructor already has a lecture on ${(0, moment_1.default)(date).format("MMMM Do, YYYY")}`);
    }
    const newLecture = yield lectures_model_1.LectureModel.create({
        date: lectureDate,
        instructor: instructorId,
    });
    newLecture.save();
    course.lectures.push(newLecture);
    instructor.lectures.push(newLecture);
    yield instructor.save();
    yield course.save();
    res.status(200).json({
        success: true,
        message: "Lecture has been scheduled successfully!",
    });
}));
exports.updateCourse = updateCourse;
/* Get courses such that they are referenced to the instructorId */
const getAllCourses = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courses_model_1.CourseModel.find({})
        .sort({ createdAt: -1 });
    if (!courses) {
        res.status(400).json({ message: "No Courses yet!" });
        return;
    }
    res.status(200).json(courses);
}));
exports.getAllCourses = getAllCourses;
//# sourceMappingURL=courses.controller.js.map