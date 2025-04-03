const db = require("../config/db"); // Import MySQL database connection

// Create a new member
const createMember = (req, res) => {
    const {
        m_id,
        name,
        dob,
        weight,
        height,
        email,
        contact,
        membership_type,
        emergency_contact,
        tr_id
    } = req.body; // Extract data from request body

    // SQL query to insert a new member
    const sql = `
        INSERT INTO Members (m_id, name, dob, weight, height, email, contact, membership_type, emergency_contact, tr_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [m_id, name, dob, weight, height, email, contact, membership_type, emergency_contact, tr_id];

    // Execute SQL query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting member:", err);
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        res.status(201).json({ message: "Member added successfully", memberId: result.insertId });
    });
};

module.exports = { createMember };
