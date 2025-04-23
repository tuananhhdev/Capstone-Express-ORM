import express from "express";
import { authController } from "../controllers/auth.controller";

const authRoute = express.Router();

authRoute.post("", authController.register);

export default authRoute;
