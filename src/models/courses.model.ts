import { InferSchemaType, model, Schema } from "mongoose";

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

type Course = InferSchemaType<typeof courseSchema>;

export const CourseModel = model<Course>("Course", courseSchema);
