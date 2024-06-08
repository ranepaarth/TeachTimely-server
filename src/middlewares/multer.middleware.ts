import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import multer, { MulterError } from "multer";

export const multerMiddleware = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
      dest: "uploads/images",
      limits: {
        fileSize: 500000,
      },
      preservePath: true,
    }).single("image");

    upload(req, res, (err: any) => {
      if (err instanceof MulterError) {
        console.log(err);
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      next();
    });
  }
);

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/images')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'_'+file.originalname)
  }
})

export let upload = multer({storage})
