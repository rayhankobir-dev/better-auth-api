import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

dotenv.config();

const dbCa = String(process.env.DB_SSL_CA);

export const db = drizzle({
  connection: {
    user: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASSWORD),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE_NAME),
    ssl: {
      ca: dbCa,
      rejectUnauthorized: false,
    },
  },
});
