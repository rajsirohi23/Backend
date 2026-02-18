const express = require("express");
const path = require("path");
const app = express();

app.use((req, res) => {
  res.status(404).render("404");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
