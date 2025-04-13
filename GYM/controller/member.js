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
      membership_length,
      goals // Array of strings
    } = req.body;

    // Validate required fields
    if (
      !name || !dob || !weight || !height || !email ||
      !contact || !emergency_contact || !password ||
      !membership_length || !Array.isArray(goals) || goals.length === 0
    ) {
      return res.status(400).json({ error: "All fields including membership length and at least one goal are required." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into Members table
    const memberSql = `
      INSERT INTO Members 
      (name, dob, weight, height, email, contact, emergency_contact, password, membership_length)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const memberValues = [
      name, dob, weight, height,
      email, contact, emergency_contact,
      hashedPassword, membership_length
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

const deleteMember = (req, res) => {
  const memberId = req.params.id;

  if (!memberId) {
    return res.status(400).json({ error: "Member ID is required." });
  }

  // First delete the goals associated with the member
  const deleteGoalsSql = `DELETE FROM Goals WHERE m_id = ?`;

  db.query(deleteGoalsSql, [memberId], (goalErr) => {
    if (goalErr) {
      console.error("❌ Error deleting goals:", goalErr);
      return res.status(500).json({ error: "Failed to delete goals", details: goalErr.message });
    }

    // Now delete the member
    const deleteMemberSql = `DELETE FROM Members WHERE id = ?`;

    db.query(deleteMemberSql, [memberId], (memberErr, result) => {
      if (memberErr) {
        console.error("❌ Error deleting member:", memberErr);
        return res.status(500).json({ error: "Failed to delete member", details: memberErr.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Member not found." });
      }

      res.status(200).json({ message: "✅ Member and related goals deleted successfully." });
    });
  });
};

module.exports = {deleteMember}
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
const getAllMemberships = (req, res) => {
  const sql = "SELECT * FROM Membership";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(result);
  });
};

const updateMember = async (req, res) => {
  const memberId = req.params.id;

  const {
    name,
    dob,
    weight,
    height,
    email,
    contact,
    emergency_contact,
    password,
    membership_length,
    goals // optional: array of updated goals
  } = req.body;

  if (
    !name || !dob || !weight || !height || !email ||
    !contact || !emergency_contact || !membership_length
  ) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    // Hash the new password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Build dynamic SQL query
    const fieldsToUpdate = [
      "name = ?",
      "dob = ?",
      "weight = ?",
      "height = ?",
      "email = ?",
      "contact = ?",
      "emergency_contact = ?",
      "membership_length = ?"
    ];
    const values = [
      name, dob, weight, height,
      email, contact, emergency_contact,
      membership_length
    ];

    if (hashedPassword) {
      fieldsToUpdate.push("password = ?");
      values.push(hashedPassword);
    }

    values.push(memberId);

    const updateSql = `UPDATE Members SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    db.query(updateSql, values, (err, result) => {
      if (err) {
        console.error("❌ Error updating member:", err);
        return res.status(500).json({ error: "Update failed", details: err.message });
      }

      // If goals are provided, update them
      if (Array.isArray(goals)) {
        // First delete existing goals
        const deleteGoalsSql = `DELETE FROM Goals WHERE m_id = ?`;

        db.query(deleteGoalsSql, [memberId], (delErr) => {
          if (delErr) {
            console.error("❌ Error deleting old goals:", delErr);
            return res.status(500).json({ error: "Failed to update goals", details: delErr.message });
          }

          if (goals.length > 0) {
            const insertGoalsSql = `INSERT INTO Goals (goal, m_id) VALUES ?`;
            const goalValues = goals.map(goal => [goal, memberId]);

            db.query(insertGoalsSql, [goalValues], (goalErr) => {
              if (goalErr) {
                console.error("❌ Error inserting new goals:", goalErr);
                return res.status(500).json({ error: "Failed to insert updated goals", details: goalErr.message });
              }

              res.status(200).json({ message: "✅ Member and goals updated successfully." });
            });
          } else {
            res.status(200).json({ message: "✅ Member updated. No new goals added." });
          }
        });
      } else {
        res.status(200).json({ message: "✅ Member updated successfully." });
      }
    });
  } catch (error) {
    console.error("❌ Error updating member:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


  module.exports = { loginMember, createMember,getAllMemberships ,deleteMember , updateMember};

