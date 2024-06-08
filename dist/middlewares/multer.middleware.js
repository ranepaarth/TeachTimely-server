"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const multer_1 = __importStar(require("multer"));
exports.multerMiddleware = (0, express_async_handler_1.default)((req, res, next) => {
    const upload = (0, multer_1.default)({
        dest: "uploads/images",
        limits: {
            fileSize: 500000,
        },
        preservePath: true,
    }).single("image");
    upload(req, res, (err) => {
        if (err instanceof multer_1.MulterError) {
            console.log(err);
            res.status(400).json({ success: false, message: err.message });
            return;
        }
        next();
    });
});
//# sourceMappingURL=multer.middleware.js.map