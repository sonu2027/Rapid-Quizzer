import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,POST,PUT,DELETE", // Allow necessary methods
    allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));

import userRouter from "./routes/user.routes.js";
import questionRouter from "./routes/question.routes.js";
app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);

export default app;
