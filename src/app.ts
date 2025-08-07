import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { auth } from "./lib/auth";

const app = express();

app.use(
  cors({
    origin: [String(process.env.FRONTEND_URL)],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

export default app;
