import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { responseSuccess } from "../common/helpers/response.helper";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.register(req);
      const response = responseSuccess({
        statusCode: 201,
        message: "Tạo tài khoản thành công",
        data: result,
        apiPath: "auth",
      });
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
