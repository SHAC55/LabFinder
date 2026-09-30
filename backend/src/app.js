import express from "express";
import cors from "cors";

import env from "./config/env.js";
import searchRoutes from "./routes/search.routes.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: env.clientUrl
  })
);

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lab Aggregator API is running"
  });
});

// API routes
app.use("/api", searchRoutes);

// 404
app.use(notFoundMiddleware);

// Error handler
app.use(errorMiddleware);

export default app;