import morgan from "morgan";
import { Request, Response } from "express";
import logger from "./logger.helper";

morgan.token("method", (req: Request) => req.method);
morgan.token("url", (req: Request) => req.url);
morgan.token("status", (_req: Request, res: Response) => res.statusCode.toString());
morgan.token("content-length", (_req: Request, res: Response) => res.get("content-length") || "0");
morgan.token("res-time", (_req: Request, res: Response) => res.get("X-Response-Time") || "0");

const logFormat = ":method :url :status :content-length :res-time ms";

const stream = {
  write: (message: string) => {
    logger.info(message.trim(), { tag: "API" });
  },
};

const logApi = morgan(logFormat, { stream });

export default logApi;
