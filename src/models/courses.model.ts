import { model, Schema } from "mongoose";
import { Lecture } from "./lectures.model";

export interface Course {
  name:string,
  level:string,
  description:string,
  image:string,
  lectures:Lecture[]
} 


const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  },
  { timestamps: true }
);

export const CourseModel = model<Course>("Course", courseSchema);
