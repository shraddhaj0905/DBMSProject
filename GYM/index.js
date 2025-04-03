// const express = require("express");
// const db = require("./config/db");

// const app = express();
// app.use(express.json()); // Middleware for JSON

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
// app.use("/api/members", memberRoutes); 

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

const memberRoutes = require("./routes/memberroute");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Root Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});


app.use("/api/members", memberRoutes);   // Member Routes

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
