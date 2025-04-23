import express from "express";
import userRoute from "./user.route";

const rootRoute = express.Router();

rootRoute.use("/api/users", userRoute);

export default rootRoute;
