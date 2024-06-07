import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/users.model";
import { CustomRequest } from "./auth.middleware";

export const adminMiddleware = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("--------------ADMIN MIDDLEWARE----------------")
    const requestingUser = (req as CustomRequest).user as User;

    const user = await UserModel.findById(requestingUser._id);

    if (user?.role !== "ADMIN") {
      throw new Error("Unauthorized access denied!");
    }

    next();
  }
);
