import winston from "winston";
import chalk from "chalk";

type TLogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR";

const colorLevel = (level: TLogLevel): string => {
  if (level === `INFO`) return chalk.greenBright(level);
  if (level === `DEBUG`) return chalk.blueBright(level);
  if (level === `WARN`) return chalk.yellowBright(level);
  if (level === `ERROR`) return chalk.redBright(level);
  return level;
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, tag }) => {
   const levelUppercase = level.toUpperCase();
    const coloredLevel = colorLevel(levelUppercase as TLogLevel);
    const tagLabel = tag ? chalk.cyanBright(`[${tag}]`) : "";
    return `${chalk.magenta(
      timestamp
    )}\t[${coloredLevel}]\t${tagLabel}\t${message}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { tag: "SYSTEM" },
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
