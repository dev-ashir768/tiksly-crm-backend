import { configDotenv } from "dotenv";
import pino, { type LoggerOptions } from "pino";

configDotenv();

const isDevelopment = process.env.NODE_ENV !== "production";

const pinoOptions: LoggerOptions = {
  level: isDevelopment ? "debug" : "info",
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  redact: ["req", "res"],
  transport: {
    targets: [
      isDevelopment
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
              ignore: "pid,hostname,req,res,reqId,responseTime",
            },
          }
        : {
            target: "pino/file",
            options: {
              destination: "./logs/production.log",
              mkdir: true,
            },
          },
    ],
  },
};

const logger = pino(pinoOptions);
export default logger;
