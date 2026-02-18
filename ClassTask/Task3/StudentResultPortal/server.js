const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// In-memory student array
const students = [
  { id: 1, name: "Ekta", marks: 85, grade: "A" },
  { id: 2, name: "Rahul", marks: 45, grade: "C" },
  { id: 3, name: "Anjali", marks: 30, grade: "D" }
];

/* ==========================
   ROUTES
========================== */

// Display all students
app.get("/students", (req, res) => {
  res.render("students", { students });
});

// Display single student
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.send("Student not found");
  }

  res.render("student", { student });
});

// Show add student form
app.get("/add-student", (req, res) => {
  res.render("add-student");
});

// Add student
app.post("/add-student", (req, res) => {
  const { name, marks } = req.body;

  let grade;
  if (marks >= 75) grade = "A";
  else if (marks >= 50) grade = "B";
  else if (marks >= 35) grade = "C";
  else grade = "Fail";

  const newStudent = {
    id: students.length + 1,
    name,
    marks: parseInt(marks),
    grade
  };

  students.push(newStudent);

  res.redirect("/students");
});

/* ========================== */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
