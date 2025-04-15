const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const adminRoutes = require("./routes/adminroute");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // ✅ Allow React app
  credentials: true               // ✅ Allow cookies/auth headers if needed
}));

// Root Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});
// Set the port number
const PORT = process.env.PORT || 5000; // Use environment variable or fallback to 5000

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
// Admin Routes
app.use("/api/admin", adminRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
