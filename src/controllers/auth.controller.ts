import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Error } from "mongoose";
import { UserModel } from "../models/users.model";

/* User Login */
const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email does not exist!");
    }

    const matchedPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!matchedPassword) {
      throw new Error("Incorrect Password!");
    }

    const accessToken = await user.generateAccessToken();
    console.log({ accessToken });

    res.cookie(process.env.ACCESS_TOKEN_NAME!, accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, user, accessToken });
  }
);

/* Register */
const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    try {
      const existingInstructor = await UserModel.findOne({
        email,
      });

      if (existingInstructor) {
        res
          .status(400)
          .json({ success: false, message: "Email already exist!" });
        return;
      }

      const newInstructor = await UserModel.create({
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
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
);

/* Logout */
const logoutController = async (req: Request, res: Response) => {
  res.clearCookie(process.env.ACCESS_TOKEN_NAME!);
  res.status(200).json({ success: true, message: "Logged out successfully!!" });
};

export { loginController, logoutController, registerController };
