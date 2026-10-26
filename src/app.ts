import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import corsMiddleware from "./middleware/cors.middleware";
import pinoHttpMiddleware from "./middleware/pinoHttp.middleware";
import status from "http-status";
import helmet from "helmet";

const app: Application = express();

app.use(pinoHttpMiddleware);
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: "OK",
  });
});

app.use((_req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: `${_req.method} ${_req.url} not found`,
  });
});

export default app;
