const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateJWT = require('../middleware/authenticateJWT');

// [POST] /books : Ajouter un nouveau livre
router.post('/', authenticateJWT, bookController.addBook);
// [GET] /books : Récupérer tous les livres de l'utilisateur
router.get('/', authenticateJWT, bookController.getBooks);
// [GET] /books/:id : Détails d'un livre
router.get('/:id', authenticateJWT, bookController.getBookById);
// [GET] /books/filter : Liste de livres filtrés
router.get('/filter', authenticateJWT, bookController.filterBooks);
// [PUT] /books/:id : Mettre à jour un livre
router.put('/:id', authenticateJWT, bookController.updateBook);
// [PUT] /books/:id/progress : Mettre à jour la progression
router.put('/:id/progress', authenticateJWT, bookController.updateProgress);
// [POST] /books/:id/favorite : Ajouter aux favoris
router.post('/:id/favorite', authenticateJWT, bookController.addFavorite);
// [DELETE] /books/:id/favorite : Retirer des favoris
router.delete('/:id/favorite', authenticateJWT, bookController.removeFavorite);

module.exports = router;
