import { NextFunction, Request, Response } from "express";

const notFoundError = (req:Request, res:Response, next:NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  next(error);
  res.status(404);
};

const errorHandler = (error:any, req:Request, res:Response, next:NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

 return res.status(statusCode).json({
    message,
    status: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { errorHandler, notFoundError };