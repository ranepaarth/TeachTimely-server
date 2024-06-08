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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryUploadImage = (fileToUpload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = cloudinary_1.v2.uploader.upload(fileToUpload, {
            folder: "image-uploader",
        });
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.cloudinaryUploadImage = cloudinaryUploadImage;
//# sourceMappingURL=cloudinary.js.map