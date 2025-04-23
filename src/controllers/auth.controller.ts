import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { responseSuccess } from "../common/helpers/response.helper";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.register(req);
      const response = responseSuccess({
        statusCode: 201,
        message: "Đăng ký tài khoản thành công",
        data: result,
        apiPath: "auth",
      });
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req);
      const response = responseSuccess({
        statusCode: 201,
        message: "Đăng nhập tài khoản thành công",
        data: result,
        apiPath: "auth",
      });
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
