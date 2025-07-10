const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBook, updateBook, updateProgress, addFavorite, removeFavorite, filterBooks } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const Book = require('../models/Book');

router.post('/', addBook);
router.get('/', auth, getBooks);
router.get('/titles', auth, async (req, res) => {
  console.log('ROUTE /titles REACHED');
  try {
    if (typeof Book === 'undefined') {
      console.error('Book is undefined!');
      return res.status(500).json({ message: 'Book model is not defined.' });
    }
    console.log('USER FOR TITLES:', req.user);
    const books = await Book.find({ userId: req.user.id }).select('title -_id');
    const titles = books.map(b => b.title);
    res.json(titles);
  } catch (err) {
    console.error('TITLES ERROR:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.get('/authors', auth, async (req, res) => {
  try {
    console.log('USER FOR AUTHORS:', req.user);
    const books = await Book.find({ userId: req.user.id }).select('author -_id');
    const authors = [...new Set(books.map(b => b.author))];
    res.json(authors);
  } catch (err) {
    console.error('AUTHORS ERROR:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.get('/categories', auth, async (req, res) => {
  try {
    console.log('USER FOR CATEGORIES:', req.user);
    const books = await Book.find({ userId: req.user.id }).select('category -_id');
    const categories = [...new Set(books.map(b => b.category))];
    res.json(categories);
  } catch (err) {
    console.error('CATEGORIES ERROR:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.get('/filter', auth, filterBooks);
router.get('/:id', auth, getBook);
router.put('/:id', auth, updateBook);
router.put('/:id/progress', auth, updateProgress);
router.post('/:id/favorite', auth, addFavorite);
router.delete('/:id/favorite', auth, removeFavorite);

// DELETE /books/:id - Supprimer un livre
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // Vérifier que l'utilisateur est bien le propriétaire
    if (book.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
