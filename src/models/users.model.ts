import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { model, Model, Schema } from "mongoose";
import { Lecture } from "./lectures.model";

const roles = ["ADMIN", "INSTRUCTOR"];

interface UserMethods {
  generateAccessToken(): string;
}

export type User = {
  _id?:string
  name: string;
  email: string;
  password: string;
  role: string;
  lectures:Lecture[]
};

type UserModel = Model<User, {}, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "INSTRUCTOR",
    },
    lectures:[{type:Schema.Types.ObjectId,ref:"Lecture"}],
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.tokens;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log({ file: "user model", error });
  }
});

userSchema.method("generateAccessToken", async function generateAccessToken() {
  const user = this;

  const accessToken = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "3 days",
    }
  );

  return accessToken;
});

export const UserModel = model<User,UserModel>("User", userSchema);
