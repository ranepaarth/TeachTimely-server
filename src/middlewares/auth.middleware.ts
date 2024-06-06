import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId: string | JwtPayload;
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    "-----------------------------------------------------------REQUIRE AUTH START---------------------------------------"
  );

  try {
    const authToken = req
      .header("Authorization" || "authorization")
      ?.replace("Bearer ", "");

      console.log({ authToken });
      
    if (!authToken) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access denied" });
    }

    const decoded = await jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET!);

    console.log({ decoded });

    if (!decoded) {
      return res.json(403).json({ message: "Forbidden" });
    }

    (req as CustomRequest).userId = decoded;

    next();
  } catch (error: any) {
    console.log("inside requireAuth catch");

    console.log(error);
    const expParams = {
      error: "expired_access_token",
      error_description: "access token expired",
    };

    if (error.name === "TokenExpiredError") {
      res.status(403).json(expParams);
      throw new Error("Authentication error, token lifetime exceeded");
    }
  }
};
