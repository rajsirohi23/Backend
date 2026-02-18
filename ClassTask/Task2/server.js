const express = require("express");
const users = require("./data");
const { authMiddleware, validTokens } = require("./authMiddleware");

const app = express();
app.use(express.json());


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate dummy token
  const token = "token_" + user.id;

  validTokens.push(token);

  res.json({
    message: "Login successful",
    token: token
  });
});



app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard" });
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is your profile" });
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
