import z from "zod";
import dotenv from "dotenv";
import logger from "@/utils/logger.util";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce
    .number({ message: "Port is required" })
    .min(1, { message: "Port must be positive integer" }),
  NODE_ENV: z.enum(["development", "production", "test"], {
    message: "Environment must be development, production, or test",
  }),
  ALLOWED_ORIGINS: z
    .string({ message: "Allowed origins must be a string" })
    .transform((val) => val.split(", ").map((str) => str.trim())),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errorMessage = parsedEnv.error.issues
    .map((issue) => {
      return issue.path.join(",") + ": " + issue.message;
    })
    .join("\n");

  logger.error("Failed to load environment variables");
  logger.error(errorMessage);

  process.exit(1);
}

const env = parsedEnv.data;
logger.info("Environment Variables is loaded successfully");

export default env;
