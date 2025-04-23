import { NextFunction, Request, Response } from "express";
import {
  BadRequestException,
  ForbiddenException,
  UnAuthorizedException,
} from "./exception.hepler";
import { responseError } from "./response.helper";
import jwt from "jsonwebtoken";
import { MulterError } from "multer";
import { NODE_ENV } from "../constant/settings.constant";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  let statusCode = err.statusCode || 500;

  if (err instanceof jwt.JsonWebTokenError) {
    statusCode = new UnAuthorizedException().statusCode;
  }
  if (err instanceof jwt.TokenExpiredError) {
    statusCode = new ForbiddenException().statusCode;
  }
  if (err instanceof MulterError) {
    statusCode = new BadRequestException().statusCode;
  }

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  const response = responseError({
    statusCode,
    message: err.message || "Internal Server Error",
    stack: NODE_ENV === "development" ? err.stack : null,
    apiPath: req.originalUrl.split("/")[1] || "error", 
  });
  res.status(response.statusCode).json(response);
};
