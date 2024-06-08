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
const cloudinary_1 = require("cloudinary");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moment_1 = __importDefault(require("moment"));
const streamifier_1 = __importDefault(require("streamifier"));
const courses_model_1 = require("../models/courses.model");
const lectures_model_1 = require("../models/lectures.model");
const users_model_1 = require("../models/users.model");
/* Create a course */
const createCourseController = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, description } = req.body;
    if (!req.file) {
        res.status(403);
        throw new Error("Please upload an image");
    }
    const existingCourse = yield courses_model_1.CourseModel.findOne({
        name,
    });
    if (existingCourse) {
        res.status(403);
        throw new Error("Course already exists!");
    }
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (result)
                    resolve(result);
                else {
                    console.log(error);
                    reject(error);
                }
            });
            streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    function upload(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield streamUpload(req);
            return result;
        });
    }
    const data = yield upload(req);
    if (!data) {
        res.status(400);
        throw new Error("Something went wrong");
    }
    console.log("---------------CLOUDINARY DATA------------------", data);
    const course = yield courses_model_1.CourseModel.create({
        name,
        level,
        description,
        image: data.secure_url,
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
        res.status(404);
        throw new Error("Instructor does not exist!");
    }
    if (instructor.role === "ADMIN") {
        res.status(403);
        throw new Error("Lectures cannot be assigned to an admin");
    }
    const course = yield courses_model_1.CourseModel.findById(courseId);
    if (!course) {
        res.status(404);
        throw new Error("Course not found!!");
    }
    const lectureDate = new Date(date);
    const existingLecture = yield lectures_model_1.LectureModel.findOne({
        date: lectureDate,
        instructor: instructorId,
    });
    if (existingLecture) {
        res.status(403);
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
    return;
}));
exports.updateCourse = updateCourse;
/* Get courses such that they are referenced to the instructorId */
const getAllCourses = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courses_model_1.CourseModel.find({}).sort({ createdAt: -1 });
    if (!courses) {
        res.status(400).json({ message: "No Courses yet!" });
        return;
    }
    res.status(200).json(courses);
    return;
}));
exports.getAllCourses = getAllCourses;
//# sourceMappingURL=courses.controller.js.map