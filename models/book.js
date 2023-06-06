// Book model
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    description: String,
    status: String,
    userEmail: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;