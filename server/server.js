import "dotenv/config";
import express from "express";
import cors from "cors";

import authroutes from "./routes/auth.route.js";
import uploadroute from "./routes/upload.route.js";
import getImageroute from "./routes/image.route.js";
import connectDB from "./utils/db.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running 🚀",
  });
});

const ensureDb = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed ❌:", error?.message || error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

app.use("/auth", ensureDb, authroutes);
app.use("/upload", ensureDb, uploadroute);
app.use("/getImage", ensureDb, getImageroute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

const port = process.env.PORT || 3000;

export default app;

const isRunDirectly =
  import.meta.url === new URL(process.argv[1], "file:").href;

if (isRunDirectly) {
  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  });
}

