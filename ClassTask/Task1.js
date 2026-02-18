const express = require("express");
const app = express();

app.use(express.json());


let users = [
  {
    id: 101,
    name: "ekta",
    email: "guptaek@gmail.com",
    role: "data scientist",
  }
];


function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(logger);


function validateUser(req, res, next) {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: "Name, email and role fields are required"
    });
  }

  next();
}


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


app.post("/users", validateUser, (req, res) => {
  const { name, email, role } = req.body;

  const newUser = {
    id: Date.now(), 
    name,
    email,
    role
  };

  users.push(newUser);

  res.status(201).json(newUser);
});


app.put("/users/:id", validateUser, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name;
  user.email = email;
  user.role = role;

  res.json(user);
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.json({ message: "User deleted successfully" });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
