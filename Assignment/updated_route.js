app.get("/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );

    return res.json(filteredUsers);
  }

  res.json(users);
});
