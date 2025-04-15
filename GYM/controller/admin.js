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

const addTrainer = async (req, res) => {
  try {
    const { name, age, shift, salary, contact, specialization } = req.body;

    // Validate all required fields
    if (!name || !age || !shift || !salary || !contact || !specialization) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const sql = `
      INSERT INTO Trainer 
      (name, age, shift, salary, contact, specialization)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [name, age, shift, salary, contact, specialization];

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


const createMembership = (req, res) => {
  const { duration, price, description, workout_id } = req.body;

  if (!duration || !price || !description || !workout_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const insertSql = `
    INSERT INTO Membership (duration, price, description, workout_id)
    VALUES (?, ?, ?, ?)
  `;

  const values = [duration, price, description, workout_id];

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

const getAllMemberships = (req, res) => {
  const sql = "SELECT * FROM Membership";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    console.log(result); // Log the query result to verify the response
    res.status(200).json(result);
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

 
    

    const createMember = async (req, res) => {
      const { name, dob, weight, height, email, contact, emergency_contact, goals } = req.body;
    
      if (!name || !dob || !weight || !height || !email || !contact || !emergency_contact || !Array.isArray(goals)) {
        return res.status(400).json({ error: "All fields and an array of goals are required." });
      }
    
      const sqlMember = `
        INSERT INTO Members 
        (name, dob, weight, height, email, contact, emergency_contact)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const memberValues = [name, dob, weight, height, email, contact, emergency_contact];
    
      db.query(sqlMember, memberValues, (err, result) => {
        if (err) {
          console.error("❌ DB error (Members):", err);
          return res.status(500).json({ error: "Database error while inserting member", details: err.message });
        }
    
        const memberId = result.insertId;
    
        if (goals.length === 0) {
          return res.status(201).json({ message: "✅ Member added without goals", memberId });
        }
    
        // Prepare bulk insert for goals
        const goalValues = goals.map(goal => [goal, memberId]);
        const sqlGoals = `INSERT INTO Goals (goal, m_id) VALUES ?`;
    
        db.query(sqlGoals, [goalValues], (goalErr, goalResult) => {
          if (goalErr) {
            console.error("❌ DB error (Goals):", goalErr);
            return res.status(500).json({ error: "Database error while inserting goals", details: goalErr.message });
          }
    
          res.status(201).json({ message: "✅ Member and goals added", memberId });
        });
      });
    };
 
    
const assignTrainer = async (req, res) => {
  const { memberId, trainerId } = req.body;

  if (!memberId || !trainerId) {
    return res.status(400).json({ error: 'Both memberId and trainerId are required.' });
  }

  const sql = `UPDATE Members SET tr_id = ? WHERE m_id = ?`;

  db.query(sql, [trainerId, memberId], (err, result) => {
    if (err) {
      console.error("❌ DB error while assigning trainer:", err);
      return res.status(500).json({ error: "Database error while assigning trainer", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({ message: "✅ Trainer assigned to member successfully" });
  });
};

const assignMembership = async (req, res) => {
  const { memberId, membershipId, startDate } = req.body;

  if (!memberId || !membershipId || !startDate) {
    return res.status(400).json({ error: 'Member ID, Membership ID, and Start Date are required.' });
  }

  // Insert into the Buy table (Assigning Membership)
  const sql = `INSERT INTO Buy (start_date, M_id, Mship_id) VALUES (?, ?, ?)`;

  db.query(sql, [startDate, memberId, membershipId], (err, result) => {
    if (err) {
      console.error("❌ DB error while assigning membership:", err);
      return res.status(500).json({ error: "Database error while assigning membership", details: err.message });
    }

    res.status(200).json({ message: "✅ Membership assigned to member successfully" });
  });
};

const deleteMember = async (req, res) => {
  const memberId = req.params.id;

  console.log('Attempting to delete member with ID:', memberId); // Log the member ID for debugging

  try {
    // Ensure memberId is valid
    if (isNaN(memberId)) {
      return res.status(400).json({ error: 'Invalid member ID' });
    }

    // SQL to delete the member
    const sql = 'DELETE FROM Members WHERE m_id = ?';

    // Execute the DELETE statement
    const result = await db.execute(sql, [memberId]);

    // If no rows are deleted, return an error indicating that the member doesn't exist
    if (result && result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // If deletion was successful, return a success message
    return res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting member:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const deleteTrainer = async (req, res) => {
  const trainerId = req.params.id;

  console.log('Attempting to delete trainer with ID:', trainerId); // Log trainer ID for debugging

  try {
    // Ensure trainerId is valid
    if (isNaN(trainerId)) {
      return res.status(400).json({ error: 'Invalid trainer ID' });
    }

    // SQL to delete the trainer
    const sql = 'DELETE FROM Trainer WHERE tr_id = ?';

    // Execute the DELETE statement
    const result = await db.execute(sql, [trainerId]);

    // If no rows are deleted, return an error indicating that the trainer doesn't exist
    if (result && result.affectedRows === 0) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    // If deletion was successful, return a success message
    return res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting trainer:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};







    module.exports = { createWorkoutPlan,getAllWorkoutPlans,createMember, addTrainer ,loginAdmin,createMembership,getAllMembers,
      getAllTrainers,
      getAllWorkoutPlans,
      getAllMemberships,assignTrainer,assignMembership,deleteMember,deleteTrainer};
    