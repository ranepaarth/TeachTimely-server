/* Get all instructors whose role equals INSTRUCTOR */

import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "../middlewares/auth.middleware";
import { User, UserModel } from "../models/users.model";

const getAllInstructorsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = (req as CustomRequest).user as User;

    if (!user) {
      throw new Error("Unauthorized access denied!!");
    }
    if (user.role === "INSTRUCTORS") {
      throw new Error("Unauthorized access denied!!");
    }

    const instructors = await UserModel.find({
      role: { $ne: "ADMIN" },
    });

    if (!instructors) {
      res.status(200).json({ message: "No Instructors are yet registered!!" });
    }

    res.status(200).json(instructors);
  }
);

export { getAllInstructorsController };
