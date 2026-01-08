import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DB_URL) {
  throw new Error("No DB_URL found");
}

const pool = new Pool({ connectionString: ENV.DB_URL });

pool.on("connect", () => {
  console.log("DB connected succesfully");
});
pool.on("error", () => {
  console.error("DB connection error");
});

export const db = drizzle({client: pool,schema})
