const express = require("express");
const app = express();

app.use(express.json());

function validateYear(req, res, next) {
    const { year } = req.body;

    // Check if year exists
    if (year === undefined) {
        return res.status(400).json({ message: "Year is required" });
    }

    // Check if year is a number
    if (isNaN(year)) {
        return res.status(400).json({ message: "Year must be a number" });
    }

    const numYear = Number(year);

    // Check reasonable range
    const currentYear = new Date().getFullYear();

    if (numYear < 1000 || numYear > currentYear) {
        return res.status(400).json({
            message: `Year must be between 1000 and ${currentYear}`
        });
    }

    next(); // move to next middleware or route
}
