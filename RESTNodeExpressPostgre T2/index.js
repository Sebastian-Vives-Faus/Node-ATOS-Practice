// Modules
const express = require("express");
const router = require("./routes/index");
const cors = require("cors");

// Execute Server
const app = express();
// Heroku Server Port or fallback to 3000 port
const PORT = process.env.PORT || 3000;
const corsOptions = { origin: process.env.URL || "*" };
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./routes/index"));

// Listen to port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
