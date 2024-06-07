"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const roles = ["ADMIN", "INSTRUCTOR"];
const userSchema = new mongoose_1.Schema({
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
    lectures: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Lecture" }],
}, { timestamps: true });
userSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.tokens;
        return ret;
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified("password"))
                return next();
            this.password = yield bcryptjs_1.default.hash(this.password, 10);
        }
        catch (error) {
            console.log({ file: "user model", error });
        }
    });
});
userSchema.method("generateAccessToken", function generateAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const accessToken = jsonwebtoken_1.default.sign({
            _id: user._id.toString(),
            role: user.role,
            email: user.email,
            name: user.name,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3 days",
        });
        return accessToken;
    });
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
