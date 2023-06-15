"use strict";
// load environment variables from the .env file
require("dotenv").config();

// import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();
// const { expressjwt: jwt } = require("express-jwt");
// const jwks = require("jwks-rsa");

// bring in the Book model
const Book = require("./models/book.js");

// configure express middleware
app.use(cors());

// configure express to parse body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const verifyJWT = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "dev-trnqc5jxbp8gfsin.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "http://localhost:3001",
//   issuer: "dev-trnqc5jxbp8gfsin.us.auth0.com/",
//   algorithms: ["RS256"],
// });

// app.use(verifyJWT);

// configure port
const PORT = process.env.PORT || 3001;

// GET /books
// returns an array of all book objects
app.get("/books", async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const books = await Book.find();
    await mongoose.disconnect();
    res.json(books);
  } catch (error) {
    res.json([{ title: "error from get", description: error.message }]);;
  }
});

// Post /books
// accepts a JSON object representing a book and adds it to the database. Returns the added book object as JSON.
app.post("/books", async (req, res) => {
  const { title, description, status } = req.body;
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    let book = await Book.create({ title, description, status });
    await mongoose.disconnect();
    res.json(book);
  } catch (error) {
    res.json([{ title: "error from post", description: error.message }]);
  }
});

// Delete /books/:id
// accepts an id parameter and deletes the corresponding book from the database. Returns the deleted book object as JSON.
app.delete("/books/:id", async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const book = await Book.findByIdAndDelete(req.params.id);
    const books = await Book.find({});
    mongoose.disconnect();
    res.json(books);
  } catch (error) {
    res.json(error.message);
  }
});

// PUT /books/:id
// accepts an id parameter and a JSON object representing a book. Updates the book with the matching id in the database with the new information. Returns the updated book object as JSON.
app.put("/books/:id", async (req, res) => {
  const { description, status, title } = req.body;
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { description, status, title },
      { new: true }
    );
    const books = await Book.find({});
    mongoose.disconnect();
    res.json(books);
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
