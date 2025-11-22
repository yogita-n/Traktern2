import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import mentorRoutes from "./routes/mentor.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/task", taskRoutes);

// Test route
app.get("/", (req, res) => res.send("API running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import submissionRoutes from "./routes/submission.routes.js";
app.use("/api/submission", submissionRoutes);