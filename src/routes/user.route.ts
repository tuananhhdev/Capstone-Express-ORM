import express from "express";
import { userController } from "../controllers/user.controller";
import protect from "../common/middlewares/protect.middleware";

const userRoute = express.Router();

userRoute.get("/", protect ,userController.findAll);

export default userRoute;
