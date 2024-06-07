import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { cloudinaryUploadImage } from "../lib/cloudinary";
import { CourseModel } from "../models/courses.model";

/* Create a course */
const createCourseController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, level, description } = req.body;

    if (!req.file) {
      throw new Error("Please upload an image");
    }

    const existingCourse = await CourseModel.findOne({
      name,
    });
    if (existingCourse) {
      throw new Error("Course already exists!");
    }

    const uploadedImage = await cloudinaryUploadImage(req.file.path);
    if (!uploadedImage) {
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
const updateCourse = async () => {
  //TODO: After a course is created, update the course by assigning instructors and date of lectures to the course
};

/* Get courses such that they are referenced to the instructorId */
const getAllCourses = async (req: Request, res: Response) => {
  //TODO:
};

export { createCourseController, getAllCourses, updateCourse };