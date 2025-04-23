import { Request } from "express";
import prisma from "../common/prisma/init.prisma";
import { BadRequestException } from "../common/helpers/exception.hepler";
import bcrypt from "bcrypt";
import logger from "../common/logging/logger.helper";
import tokenService from "./token.service";

export const authService = {
  register: async (req: Request) => {
    const { full_name, email, password } = req.body;

    const userExist = await prisma.users.findUnique({
      where: { email: email },
    });
    if (userExist)
      throw new BadRequestException(
        "Tài khoản đã tồn tại, vui lòng nhập tài khoản khác!"
      );

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.users.create({
      data: {
        full_name: full_name,
        email: email,
        password: hashPassword,
      },
    });

    const { password: _pw, ...safeUser } = newUser;

    return safeUser;
  },

  login: async (req: Request) => {
    const { email, password } = req.body;

    const userExist = await prisma.users.findUnique({
      where: { email: email },
    });
    if (!userExist) throw new BadRequestException("Tài khoản không tồn tại!");
    if (!userExist?.password)
      throw new BadRequestException(
        "Vui lòng đăng nhập bằng google hoặc facebook, để cập nhật mật khẩu mới!"
      );

    const isPassword = bcrypt.compareSync(password, userExist.password);
    if (!isPassword) {
      logger.error(`${userExist.user_id}`)
      throw new BadRequestException("Mật khẩu không chính xác!")
    }

    const tokens = tokenService.createTokens(userExist.user_id);
    
    return tokens;
  },
};
