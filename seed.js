// Seeds the database with some initial data
const mongoose = require("mongoose");
require("dotenv").config();


const Book = require("./models/book.js");

async function seed() {
  try {
    mongoose.connect(
      process.env.DATABASE_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    
    await Book.create({
      title: "The Great Gatsby",
      description:
        "The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
      status: "Available",
    });

    await Book.create({
      title: "Harry Potter and the Sorcerer's Stone",
      description:
        "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard, just as his parents were.",
      status: "Available",
    });

    await Book.create({
      title: "The Hobbit",
      description:
        "Bilbo Baggins, a respectable, well-to-do hobbit, lives comfortably in his hobbit-hole until the day the wandering wizard Gandalf chooses him to take part in an adventure from which he may never return.",
      status: "Unavailable",
    });

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding the database:", error);
    mongoose.disconnect();
  }
}

seed();
