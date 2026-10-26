import app from "@/app";
import env from "./config/env.config";
import logger from "./utils/logger.util";

app.listen(env.PORT, () => {
  logger.info(`Server is running on http://localhost:${env.PORT}`);
});
