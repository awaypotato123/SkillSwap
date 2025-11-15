import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import skillRoutes from "./routes/skill.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

// CRITICAL: Load environment variables FIRST, before anything else
dotenv.config();

// Verify environment variables are loaded
console.log("=== Environment Variables Check ===");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✓ Loaded" : "✗ MISSING");
console.log("MONGO_URL:", process.env.MONGO_URL ? "✓ Loaded" : "✗ MISSING");
console.log("PORT:", process.env.PORT || "3000 (default)");
console.log("===================================");

// Connect to database
connectDB();

const app = express();
app.use(express.json()); 

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});