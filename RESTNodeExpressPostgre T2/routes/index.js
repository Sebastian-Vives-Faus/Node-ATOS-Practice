// Modules
const { Router } = require("express");
const router = Router();

// Controllers
const {
  get_leaderboards,
  add_leaderboard,
  get_specific_leaderboard,
} = require("../controllers/leaderboards.controller");

// Routes
router.get("/leaderboards", get_leaderboards);
router.post("/leaderboards", add_leaderboard);
router.get("/leaderboards/:game", get_specific_leaderboard);

// Modules Export
module.exports = router;
