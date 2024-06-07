"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
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
    lectures: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Lecture" }],
}, { timestamps: true });
exports.CourseModel = (0, mongoose_1.model)("Course", courseSchema);
