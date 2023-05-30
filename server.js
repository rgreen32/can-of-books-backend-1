'use strict';
// load environment variables from the .env file
require('dotenv').config();

// import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// bring in the Book model
const Book = require('./models/book.js');

// configure express middleware
app.use(cors());

// configure express to parse body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure port
const PORT = process.env.PORT || 3001;


// GET /books 
// returns an array of all book objects
app.get('/books', async (req, res) => {
  
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const books = await Book.find({});
    mongoose.disconnect();
    res.json(books);
  } catch (error) {
    res.json(error.message);
  }

})

// Post /books
// accepts a JSON object representing a book and adds it to the database. Returns the added book object as JSON.
app.post('/books', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const book = await Book.create({ title, description, status});
    mongoose.disconnect();
    res.json(book);
  } catch (error) {
    res.json(error.message);
  }
});

// Delete /books/:id
// accepts an id parameter and deletes the corresponding book from the database. Returns the deleted book object as JSON.
app.delete('/books/:id', async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const book = await Book.findByIdAndDelete(req.params.id);
    mongoose.disconnect();
    res.json(book);
  } catch (error) {
    res.json(error.message);
  }
});

// PUT /books/:id
// accepts an id parameter and a JSON object representing a book. Updates the book with the matching id in the database with the new information. Returns the updated book object as JSON.
app.put('/books/:id', async (req, res) => {
  const { description, status, title } = req.body;
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const book = await Book.findByIdAndUpdate(req.params.id, {description, status, title}, {new: true});
    mongoose.disconnect();
    res.json(book);
  } catch (error) {
    res.json(error.message);
  }
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
