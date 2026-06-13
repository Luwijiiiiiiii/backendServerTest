// src/app.ts
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import router from "./routes";
import { isDev } from "./config";
import setup from "./setup";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { prisma } from "./utils/prisma";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

if (!isDev) app.use(limiter);

// Security
app.use(helmet());
app.disable("x-powered-by");

// Routes
app.use("/api", router);

// HTTP + Socket.io
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

import events from "./events";
events(io);

// ✅ Prisma connection (replaces Mongo)
async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected (Prisma)");

    // Run setup logic
    setup();

  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
}

start();

export default server;