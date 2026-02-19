const express = require("express");
const app = express();

app.use(express.json());


let authors = [
    { id: 1, name: "ekta", country: "USA" },
    { id: 2, name: "guptaa", country: "UK" }
];

app.get("/authors", (req, res) => {
    res.json(authors);
});

app.get("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const author = authors.find(a => a.id === id);

    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
});

app.post("/authors", (req, res) => {
    const { name, country } = req.body;

    if (!name || !country) {
        return res.status(400).json({ message: "Name and country are required" });
    }
    const newAuthor = {
        id: authors.length + 1,
        name,
        country
    };
    authors.push(newAuthor);
    res.status(201).json({
        message: "Author created successfully",
        author: newAuthor
    });
});

app.put("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, country } = req.body;
    const author = authors.find(a => a.id === id);
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    author.name = name;
    author.country = country;

    res.json({
        message: "Author updated successfully",
        author
    });
});


app.patch("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }

    Object.assign(author, req.body);
    res.json({
        message: "Author partially updated",
        author
    });
});


app.delete("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Author not found" });
    }
    authors.splice(index, 1);

    res.json({ message: "Author deleted successfully" });
});

