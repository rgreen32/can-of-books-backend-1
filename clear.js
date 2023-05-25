// Completely clear the database
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

const Book = require("./models/book.js");

async function clear() {
    try {
        await Book.deleteMany({});
        mongoose.disconnect();
    } catch (error) {
        console.error("Error clearing the database:", error);
        mongoose.disconnect();
    }
}

clear();