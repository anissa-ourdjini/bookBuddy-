const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBook, updateBook, updateProgress, addFavorite, removeFavorite, filterBooks } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const Book = require('../models/Book');

router.post('/', addBook);
router.get('/', auth, getBooks);
router.get('/:id', auth, getBook);
router.put('/:id', auth, updateBook);
router.put('/:id/progress', auth, updateProgress);
router.post('/:id/favorite', auth, addFavorite);
router.delete('/:id/favorite', auth, removeFavorite);
router.get('/filter', auth, filterBooks);

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
