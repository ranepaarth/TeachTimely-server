import { InferSchemaType, model, Schema } from "mongoose";

const lectureSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export type Lecture = InferSchemaType<typeof lectureSchema>;

export const LectureModel = model<Lecture>("Lecture", lectureSchema);
