'use strict';
// load environment variables from the .env file
require('dotenv').config();

// import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// bring in the Book model
const Book = require('./models/Book.js');

// configure express middleware
app.use(cors());

// configure port
const PORT = process.env.PORT || 3001;


// book route
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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
