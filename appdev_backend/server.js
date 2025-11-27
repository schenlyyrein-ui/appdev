// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // React dev URL
    credentials: true,
  })
);

app.use(express.json());

// Simple healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is healthy" });
});

// Auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
