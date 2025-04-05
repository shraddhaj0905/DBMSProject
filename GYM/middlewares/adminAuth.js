const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Admin token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.admin_id) {
      return res.status(403).json({ error: "Access denied: Not an admin" });
    }

    req.admin = decoded; // attach admin payload
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired admin token" });
  }
};

module.exports = {verifyAdmin};
