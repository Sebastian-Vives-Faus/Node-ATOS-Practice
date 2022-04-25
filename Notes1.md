# Node / Express / PostgreSQL

### File Structure

- /src

  - /controllers
  - _All functions inside each route_
  - /routes
  - ```js
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
    ```

  - server.js
  - ```js
    // Modules
    const express = require("express");
    const router = require("./routes/index");

    // Execute Server
    const app = express();

    // Middleware
    // It parses incoming requests with JSON payloads and is based on body-parser.
    app.use(express.json());
    // It parses incoming requests with urlencoded payloads and is based on body-parser.
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use(require("./routes/index"));

    // Listen to port
    app.listen(3000, () => {
      console.log("Server open at port 3000");
    });
    ```

- /databse

### Simple PostgreSQL CRUD

Connect to a PostgreSQL database

```js
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
```

Create Entry

```js
// Create a new user
const create_user = async (req, res) => {
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
```

Get Table

```js
// Get users
const get_users = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  console.log(response.rows);

  res.status(200).json(response.rows);
};
```

Get Specific Row

```js
// Get specific user from ID
const get_id_user = async (req, res) => {
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  console.log(response.rows);
  res.status(200).json(response.rows);
};
```

Update Row

```js
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
```

Delete Row

```js
// Delete user
const delete_user = async (req, res) => {
  const response = await pool.query("DELETE FROM users WHERE id = $1", [
    req.params.id,
  ]);
  console.log("User deleted successfully");
  res.status(200).json({
    message: "User deleted successfully",
  });
};
```
