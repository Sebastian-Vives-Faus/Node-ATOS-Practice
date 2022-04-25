// PostgreSQL
const { Pool } = require("pg");

// Connection to PostgreSQL database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "62933926",
  database: "firstapi",
  port: "5432",
});

// Users

// Get users
const get_users = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  console.log(response.rows);

  res.status(200).json(response.rows);
};

// Create a new user
const create_user = async (req, res) => {
  console.log(req.body);

  // Destructure req.body, creating variables
  const { name, email } = req.body;

  const response = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email]
  );
  res.status(200).json({
    message: "User created successfully",
    body: {
      user: { name, email },
    },
  });
};

// Get specific user from ID
const get_id_user = async (req, res) => {
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  console.log(response.rows);
  res.status(200).json(response.rows);
};

const delete_user = async (req, res) => {
  const response = await pool.query("DELETE FROM users WHERE id = $1", [
    req.params.id,
  ]);
  console.log("User deleted successfully");
  res.status(200).json({
    message: "User deleted successfully",
  });
};

// Update user
const update_user = async (req, res) => {
  // Destructure body
  const { name, email } = req.body;
  const response = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, req.params.id]
  );
  console.log(`User ${req.params.id} updated successfully`);
  res.status(200).json({
    message: `User ${req.params.id} updated successfully`,
  });
};

module.exports = {
  get_users,
  create_user,
  get_id_user,
  delete_user,
  update_user,
};
