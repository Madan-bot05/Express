// This is the main Express application file.
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.js"; // <-- your CORS config
import sequelize from "./util/database.js"; // Import the database connection.
import Product from "./model/Product.js"; // Import the Product model.

// New imports for authentication
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { authenticateToken, restrictTo } from "./middleware/authMiddleware.js";

// --- SEQUELIZE SYNC ---
sequelize
  .sync({
    force: false, // Set to true to drop and re-create tables on startup.
  })
  .then(() => {
    console.log("Database and tables synced successfully!");
  })
  .catch((err) => console.log("Error syncing database:", err));

const app = express();
const PORT = 2020;

// ===== Middleware =====
app.use(cors(corsOptions));       // ✅ Enable CORS for React
app.use(express.json());          // ✅ Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional (form data)

// ===== Routes =====
// Public routes for authentication
app.use("/auth", authRoutes);

// Protected routes requiring JWT
app.use("/api", authenticateToken, userRoutes);

// Admin-specific routes
app.get(
  "/api/admin/dashboard",
  authenticateToken,
  restrictTo("ADMIN"),
  (req, res) => {
    res.status(200).json({ message: "Welcome to the Admin Dashboard!" });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
