declare global {
  namespace Express {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test"; 
    }
  }
}

export {};