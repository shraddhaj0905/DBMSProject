const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyTrainer = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Trainer token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.trainerId) {
      return res.status(403).json({ error: "Access denied: Not a trainer" });
    }

    req.trainer = decoded; // attach trainer payload
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired trainer token" });
  }
};


module.exports = { verifyTrainer };
