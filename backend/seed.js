const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookbuddy';

async function seed() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  // Create a test user
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword',
  });
  await user.save();
  console.log('Test user created');

  // Create a test book
  const book = new Book({
    title: 'Test Book',
    author: 'John Doe',
    coverImage: '',
    status: 'to read',
    pages: 123,
    category: 'Fiction',
    userId: user._id,
    isFavorite: false,
  });
  await book.save();
  console.log('Test book created');

  // Link book to user
  user.books.push(book._id);
  await user.save();

  await mongoose.disconnect();
  console.log('Seeding done.');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
