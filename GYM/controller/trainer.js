const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginTrainer = (req, res) => {
  const { contact, password } = req.body;

  const sql = "SELECT * FROM Trainer WHERE contact = ?";
  db.query(sql, [contact], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length === 0) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    const trainer = result[0];
    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { trainerId: trainer.tr_id, name: trainer.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  });
};





// Create Workout Plan (Admin only)
const createWorkoutPlan = (req, res) => {
  const { exercises, diet } = req.body;

  // Validation
  if (!exercises || !diet) {
    return res.status(400).json({ error: "Exercises and diet are required." });
  }

  const sql = `
    INSERT INTO Workout_plan (exercises, diet)
    VALUES (?, ?)
  `;

  db.query(sql, [exercises, diet], (err, result) => {
    if (err) {
      console.error("❌ Error inserting workout plan:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    res.status(201).json({
      message: "✅ Workout plan created successfully",
      workout_id: result.insertId, // return auto-generated ID
    });
  });
};

module.exports = { loginTrainer,createWorkoutPlan };
