const express = require("express");
const app = express();

let books = [
    { id: 1, title: "Book A", author: "John", year: 2020 },
    { id: 2, title: "Book B", author: "Smith", year: 2021 },
    { id: 3, title: "Book C", author: "John", year: 2022 },
    { id: 4, title: "Book D", author: "Emma", year: 2020 }
];
app.get("/books", (req, res) => {
    const { author, year } = req.query;

    let filteredBooks = books;

    if (author) {
        filteredBooks = filteredBooks.filter(book =>
            book.author.toLowerCase() === author.toLowerCase()
        );
    }

    if (year) {
        filteredBooks = filteredBooks.filter(book =>
            book.year == year
        );
    }

    res.json(filteredBooks);
});
