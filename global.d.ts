interface Env {}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      NODE_ENV: "development" | "production"
    }
  }
}

export {};
export type IEnv = Env;
