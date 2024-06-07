"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureModel = void 0;
const mongoose_1 = require("mongoose");
const lectureSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
    },
    instructor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.LectureModel = (0, mongoose_1.model)("Lecture", lectureSchema);
