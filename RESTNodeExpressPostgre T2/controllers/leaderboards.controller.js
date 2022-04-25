// Modules
const pool = require("../database/db");

// Get all leaderboards
const get_leaderboards = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM leaderboards");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

// Add a new leaderboard
const add_leaderboard = async (req, res) => {
  // Destructure body
  const { game, player, score } = req.body;

  try {
    const response = await pool.query(
      "INSERT INTO leaderboards (game,player, score) VALUES ($1, $2, $3);",
      [game, player, score]
    );
    res.status(200).json(`Leaderboard ${game} added successfully`);
  } catch (error) {
    console.log(error.message);
  }
};

// Get specific leaderboard
const get_specific_leaderboard = async (req, res) => {
  // Destructure URL
  const { game } = req.params;

  try {
    const response = await pool.query(
      "SELECT * FROM leaderboards WHERE game = $1",
      [game]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_leaderboards,
  add_leaderboard,
  get_specific_leaderboard,
};
