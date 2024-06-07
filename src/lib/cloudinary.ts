import { v2 as cloudinary } from "cloudinary";

const cloudinaryUploadImage = async (fileToUpload: string) => {
  try {
    const data = cloudinary.uploader.upload(fileToUpload, {
      folder: "image-uploader",
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { cloudinaryUploadImage };
