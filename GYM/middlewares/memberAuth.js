const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyMember = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Member token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.memberId) {
      return res.status(403).json({ error: "Access denied: Not a member" });
    }

    req.member = decoded; // attach member payload
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired member token" });
  }
};

module.exports = verifyMember;
