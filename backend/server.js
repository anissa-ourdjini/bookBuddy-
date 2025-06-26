require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser')

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connexion à la base de données
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('API BookBuddy opérationnelle');
});

const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const rewardsRoutes = require('./routes/rewards');


app.use('/books', booksRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/rewards', rewardsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
