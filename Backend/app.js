import express from "express";
import connectDB from "./database/db.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";

import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";

const app = express();

config({ path: "./config/config.env" });

connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL_ONE,
  process.env.FRONTEND_URL_TWO,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.set("trust proxy", 1);


// MIDDLEWARES
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  })
);

// ROUTES
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HMS Backend is running",
  });
});

// ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;