const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Reddirection
app.get("/about-us", (req, res) => {
  res.redirect("/");
});

app.listen(3000);
