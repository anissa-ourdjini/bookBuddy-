const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBook, updateBook, updateProgress, addFavorite, removeFavorite, filterBooks } = require('../controllers/bookController');
const auth = require('../middleware/auth');
router.post('/', addBook);
router.get('/', auth, getBooks);
router.get('/:id', auth, getBook);
router.put('/:id', auth, updateBook);
router.put('/:id/progress', auth, updateProgress);
router.post('/:id/favorite', auth, addFavorite);
router.delete('/:id/favorite', auth, removeFavorite);
router.get('/filter', auth, filterBooks);

module.exports = router;
