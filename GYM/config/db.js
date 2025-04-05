const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to DB
pool.getConnection(async (err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }

  console.log("✅ Connected to MySQL Database!");

  // Insert default admin only if not exists
  const defaultAdminEmail = "admin@gym.com";
  const defaultPassword = "admin123"; // Plaintext
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const checkAdminQuery = "SELECT * FROM Admin WHERE email = ?";
  connection.query(checkAdminQuery, [defaultAdminEmail], (err, results) => {
    if (err) {
      console.error("Error checking default admin:", err);
      connection.release();
      return;
    }

    if (results.length === 0) {
      const insertAdminQuery = `
        INSERT INTO Admin (name, email, password) 
        VALUES (?, ?, ?)
      `;
      connection.query(
        insertAdminQuery,
        ["Super Admin", defaultAdminEmail, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error inserting default admin:", err);
          } else {
            console.log("✅ Default admin created: admin@gym.com / admin123");
          }
          connection.release();
        }
      );
    } else {
      console.log("ℹ️ Default admin already exists.");
      connection.release();
    }
  });
});

module.exports = pool;
