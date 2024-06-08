/* Get all instructors whose role equals INSTRUCTOR */

import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "../middlewares/auth.middleware";
import { CourseModel } from "../models/courses.model";
import { User, UserModel } from "../models/users.model";

const getAllInstructorsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = (req as CustomRequest).user as User;

    if (!user) {
      res.status(401)
      throw new Error("Unauthorized access denied!!");
    }
    if (user.role === "INSTRUCTORS") {
      res.status(401)
      throw new Error("Unauthorized access denied!!");
    }

    const instructors = await UserModel.find({
      role: { $ne: "ADMIN" },
    }).populate([
      {
        path: "lectures",
      },
    ]);

    if (!instructors) {
      res.status(200).json({ message: "No Instructors are yet registered!!" });
      return
    }

    res.status(200).json(instructors);
    return
  }
);

const getLoggedInInstructor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = (req as CustomRequest).user as User;

    const loggedInUser = await UserModel.findById(user._id).populate([
      {
        path: "lectures",
      },
    ]);

    if (!loggedInUser) {
      res.status(404)
      throw new Error("Instructor not found!");
    }

    if (loggedInUser.role === "ADMIN") {
      res.status(401)
      throw new Error("Unauthorized access to admin denied");
    }

    const courses = await CourseModel.find({})
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "lectures",
        },
      ]);


    const instructorLectures = courses.map((course) => ({
      _id:course._id,
      name: course.name,
      image: course.image,
      level:course.level,
      description:course.description,
      lectures: course.lectures.filter(lecture => lecture.instructor._id.toString() === loggedInUser._id.toString())
    })).filter(courses => courses.lectures.length !== 0);

    res.status(200).json(instructorLectures);
    return
  }
);

export { getAllInstructorsController, getLoggedInInstructor };
