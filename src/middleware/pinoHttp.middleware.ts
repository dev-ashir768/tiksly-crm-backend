import logger from "@/utils/logger.util";
import { pinoHttp, type Options } from "pino-http";

const pinoHttpOptions: Options = {
  logger,
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    if (res.statusCode >= 200) return "info";
    return "debug";
  },
  customSuccessMessage: (req, res, responseTime) => {
    return `${req.method} ${req.url} completed with status ${res.statusCode} in ${responseTime}ms`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} failed with status ${res.statusCode} - Error: ${err.message}`;
  },
  quietReqLogger: true,
};

const pinoHttpMiddleware = pinoHttp(pinoHttpOptions);
export default pinoHttpMiddleware;
