import express, { Express } from "express";
import cors from "cors";
import { PORT } from "./common/constant/settings.constant";
import rootRoute from "./routes/root.route";
import { handleError } from "./common/helpers/error.helper";
import logApi from "./common/logging/morgan.helper";
import logger from "./common/logging/logger.helper";

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://google.com"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(logApi);

app.use(rootRoute);
app.use(handleError)

app.listen(PORT, () =>
  logger.info(`Server is running at http://localhost:${PORT}`, {
    tag: "SERVER",
  })
);
