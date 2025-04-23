import express from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";

const rootRoute = express.Router();

rootRoute.use("/api/users", userRoute);
rootRoute.use("/api/auth", authRoute);

export default rootRoute;
