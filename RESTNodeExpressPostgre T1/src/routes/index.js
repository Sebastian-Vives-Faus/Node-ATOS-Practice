// Modules
const { Router } = require("express");
const router = Router();

// Controllers
const {
  get_users,
  create_user,
  get_id_user,
  delete_user,
  update_user,
} = require("../controllers/index.controller");

// Routes
router.get("/users", get_users); // Get users from DB users
router.post("/users", create_user); // Create user
router.get("/users/:id", get_id_user); // Get user from ID
router.delete("/users/:id", delete_user); // Delete user from
router.put("/users/:id", update_user);

module.exports = router;
