import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
} from "../common/constant/settings.constant";
import { Users } from "@prisma/client";

const tokenService = {
  createTokens: (user_id: number) => {
    const payload = { user_id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  },
};

export default tokenService;
