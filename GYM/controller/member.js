const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const createMember = async (req, res) => {
  try {
    const {
      name,
      dob,
      weight,
      height,
      email,
      contact,
      emergency_contact,
      password,
      goals // Array of strings
    } = req.body;

    // Validate required fields
    if (
      !name || !dob || !weight || !height || !email ||
      !contact || !emergency_contact || !password ||
      !Array.isArray(goals) || goals.length === 0
    ) {
      return res.status(400).json({ error: "All fields including at least one goal are required." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into Members table
    const memberSql = `
      INSERT INTO Members 
      (name, dob, weight, height, email, contact, emergency_contact, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const memberValues = [
      name, dob, weight, height,
      email, contact, emergency_contact, hashedPassword
    ];

    db.query(memberSql, memberValues, (memberErr, memberResult) => {
      if (memberErr) {
        console.error("❌ Error inserting member:", memberErr);
        return res.status(500).json({ error: "Database error", details: memberErr.message });
      }

      const memberId = memberResult.insertId;

      // Insert goals
      const goalSql = `INSERT INTO Goals (goal, m_id) VALUES ?`;
      const goalValues = goals.map(goal => [goal, memberId]);

      db.query(goalSql, [goalValues], (goalErr) => {
        if (goalErr) {
          console.error("❌ Error inserting goals:", goalErr);
          return res.status(500).json({ error: "Goal insertion error", details: goalErr.message });
        }

        res.status(201).json({
          message: "✅ Member and goals added successfully",
          memberId
        });
      });
    });
  } catch (error) {
    console.error("❌ Error in registration:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { createMember };


const loginMember = (req, res) => {
    const { contact, password } = req.body;
  
    const sql = "SELECT * FROM Members WHERE contact = ?";
    db.query(sql, [contact], async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Member not found" });
      }
  
      const member = result[0];
      const isMatch = await bcrypt.compare(password, member.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid password" });
  
      const token = jwt.sign(
        { memberId: member.m_id, name: member.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ message: "Login successful", token });
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

  module.exports = { loginMember, createMember };