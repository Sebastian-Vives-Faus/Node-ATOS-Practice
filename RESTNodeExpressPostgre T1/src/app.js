// Modules
const express = require("express");
const router = require("./routes/index");

// Execute Server
const app = express();

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Routes
app.use(require("./routes/index"));

// Listen to port
app.listen(3000, () => {
  console.log("Server open at port 3000");
});
