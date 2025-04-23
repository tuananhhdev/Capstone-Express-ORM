import { Request, Response, NextFunction } from "express";
import { responseSuccess } from "../common/helpers/response.helper";
import { userService } from "../services/user.service";

export const userController = {
  findAll: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.findAll(req);
      const response = responseSuccess({
        message: "Lấy tất cả người dùng thành công",
        data: result,
        apiPath: "user",
      });
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  // findOne: async function (req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await userService.findOne(req);
  //     const response = responseSuccess(
  //       result,
  //       `Get user #${req.params.id} successfully`
  //     );
  //     res.status(response.statusCode).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // update: async function (req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await userService.update(req);
  //     const response = responseSuccess(
  //       result,
  //       `Update user #${req.params.id} successfully`
  //     );
  //     res.status(response.statusCode).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // remove: async function (req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await userService.remove(req);
  //     const response = responseSuccess(
  //       result,
  //       `Remove user #${req.params.id} successfully`
  //     );
  //     res.status(response.statusCode).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};
