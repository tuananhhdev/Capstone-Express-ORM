import { Request, Response, NextFunction } from "express";
import {
  BadRequestException,
  UnAuthorizedException,
} from "../helpers/exception.hepler";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/settings.constant";
import prisma from "../prisma/init.prisma";
import { JwtPayload } from "../types/jwt-payload.type";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (!token) throw new UnAuthorizedException("Không có token");
    if (type !== "Bearer")
      throw new UnAuthorizedException("Loại token không hợp lệ");

    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    const user = await prisma.users.findUnique({
      where: {
        user_id: decoded.user_id,
      },
    });

    if (!user) throw new BadRequestException("Không tìm thấy người dùng");

    req.user = user;
    console.log("Assigned req.user, calling next()");
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error);
    next(error);
  }
};

export default protect;
