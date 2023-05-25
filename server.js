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

app.use(express.json());

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
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const book = await Book.create(req.body);
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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
