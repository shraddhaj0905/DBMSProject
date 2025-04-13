const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin Login
const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if admin exists
  const query = "SELECT * FROM Admin WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const admin = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { admin_id: admin.admin_id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin.admin_id,
        name: admin.name,
        email: admin.email,
      },
    });
  });
};

// Admin-only: Add new trainer without password
const addTrainer = async (req, res) => {
  try {
    const { name, age, shift, salary, contact, password, specialization } = req.body;

    // Validate all required fields
    if (!name || !age || !shift || !salary || !contact || !password || !specialization) {
      return res.status(400).json({ error: "All fields including password are required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO Trainer 
      (name, age, shift, salary, contact, password, specialization)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [name, age, shift, salary, contact, hashedPassword, specialization];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ Error inserting trainer:", err);
        return res.status(500).json({ error: "Database error", details: err.message });
      }

      res.status(201).json({
        message: "✅ Trainer added successfully",
        trainerId: result.insertId
      });
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


// Admin-only: Create a membership plan
const createMembership = (req, res) => {
  const { duration, price, description } = req.body;

  // Validate input
  if (!duration || !price || !description ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if the workout plan exists
  const checkWorkoutSql = "SELECT * FROM Workout_plan WHERE = ?";
  db.query(checkWorkoutSql, (err, workoutResult) => {
    if (err) {
      console.error("❌ Workout check failed:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (workoutResult.length === 0) {
      return res.status(404).json({ error: "Workout plan not found" });
    }

    // Insert into Membership
    const insertSql = `
      INSERT INTO Membership (duration, price, description)
      VALUES (?, ?, ?, ?)
    `;

    const values = [duration, price, description];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error("❌ Error inserting membership:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "✅ Membership created successfully",
        membership_id: result.insertId,
      });
    });
  });
};


// ✅ Get all members
const getAllMembers = (req, res) => {
  const sql = "SELECT * FROM Members";  // Fixed table name
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(result);
  });
};

// ✅ Get all trainers
const getAllTrainers = (req, res) => {
  const sql = "SELECT * FROM Trainer";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(result);
  });
};

// ✅ Get all workout plans
const getAllWorkoutPlans = (req, res) => {
  const sql = "SELECT * FROM Workout_plan";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(result);
  });
};

// ✅ Get all memberships
const getAllMemberships = (req, res) => {
  const sql = "SELECT * FROM Membership";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(result);
  });
};


const buyMembership = (req, res) => {
  const { m_id, mship_id, start_date } = req.body;

  // Basic validation
  if (!m_id || !mship_id || !start_date) {
    return res.status(400).json({ error: "m_id, mship_id, and start_date are required" });
  }

  // Check if Member exists
  const checkMemberSql = "SELECT * FROM Members WHERE m_id = ?";
  db.query(checkMemberSql, [m_id], (err, memberResult) => {
    if (err) return res.status(500).json({ error: "Database error", details: err.message });
    if (memberResult.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Check if Membership exists
    const checkMembershipSql = "SELECT * FROM Membership WHERE Mship_id = ?";
    db.query(checkMembershipSql, [mship_id], (err, membershipResult) => {
      if (err) return res.status(500).json({ error: "Database error", details: err.message });
      if (membershipResult.length === 0) {
        return res.status(404).json({ error: "Membership not found" });
      }

      // Insert into Buy table
      const insertSql = "INSERT INTO Buy (start_date, M_id, Mship_id) VALUES (?, ?, ?)";
      db.query(insertSql, [start_date, m_id, mship_id], (err, result) => {
        if (err) {
          console.error("❌ Error inserting into Buy:", err);
          return res.status(500).json({ error: "Failed to assign membership", details: err.message });
        }

        res.status(201).json({ message: "✅ Membership successfully assigned to member" });
      });
    });
  });
};

  module.exports = { addTrainer ,loginAdmin,createMembership,getAllMembers,
    getAllTrainers,
    getAllWorkoutPlans,
    getAllMemberships,buyMembership};

