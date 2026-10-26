import cors, { type CorsOptions } from "cors";
import env from "@/config/env.config";

const corsOptions: CorsOptions = {
  origin: env.ALLOWED_ORIGINS,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);
export default corsMiddleware;
