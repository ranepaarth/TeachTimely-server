import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import moment from "moment";
import { cloudinaryUploadImage } from "../lib/cloudinary";
import { CourseModel } from "../models/courses.model";
import { LectureModel } from "../models/lectures.model";
import { UserModel } from "../models/users.model";

/* Create a course */
const createCourseController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, level, description } = req.body;

    if (!req.file) {
      res.status(403)
      throw new Error("Please upload an image");
    }

    const existingCourse = await CourseModel.findOne({
      name,
    });
    if (existingCourse) {
      res.status(403)
      throw new Error("Course already exists!");
    }

    const uploadedImage = await cloudinaryUploadImage(req.file.path);
    if (!uploadedImage) {
      res.status(400)
      throw new Error("Something went wrong!");
    }

    const course = await CourseModel.create({
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
  }
);

/* Update course with instructor and lecture date by sending the instructorId as a param or through the request body */
const updateCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { courseId } = req.params;
    const { date, instructorId } = req.body;

    const instructor = await UserModel.findById(instructorId);
    if (!instructor) {
      res.status(404)
      throw new Error("Instructor does not exist!");
    }

    if (instructor.role === "ADMIN") {
      res.status(403)
      throw new Error("Lectures cannot be assigned to an admin");
    }

    const course = await CourseModel.findById(courseId);

    if (!course) {
      res.status(404)
      throw new Error("Course not found!!");
    }

    const lectureDate = new Date(date);
    const existingLecture = await LectureModel.findOne({
      date: lectureDate,
      instructor: instructorId,
    });

    if (existingLecture) {
      res.status(403)
      throw new Error(
        `Instructor already has a lecture on ${moment(date).format(
          "MMMM Do, YYYY"
        )}`
      );
    }

    const newLecture = await LectureModel.create({
      date: lectureDate,
      instructor: instructorId,
    });

    newLecture.save();

    course.lectures.push(newLecture);
    instructor.lectures.push(newLecture);
    await instructor.save();
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture has been scheduled successfully!",
    });
    return 
  }
);

/* Get courses such that they are referenced to the instructorId */
const getAllCourses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courses = await CourseModel.find({})
      .sort({ createdAt: -1 })

    if (!courses) {
      res.status(400).json({ message: "No Courses yet!" });
      return;
    }

    res.status(200).json(courses);
    return
  }
);

export { createCourseController, getAllCourses, updateCourse };
