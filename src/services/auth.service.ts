import { Request } from "express";
import prisma from "../common/prisma/init.prisma";
import { BadRequestException } from "../common/helpers/exception.hepler";
import bcrypt from "bcrypt";

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
};
