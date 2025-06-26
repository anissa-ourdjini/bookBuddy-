const express = require('express');
const router = express.Router();
const bookController = require('../backend/controllers/bookController');
const authenticateJWT = require('../backend/middleware/authenticateJWT');

// [GET] /books/favorites : Récupérer les livres favoris de l'utilisateur
router.get('/favorites', authenticateJWT, bookController.getFavorites);
// [GET] /books/filter : Liste de livres filtrés
router.get('/filter', bookController.filterBooks);
// [GET] /books : Récupérer tous les livres
router.get('/', bookController.getBooks);
// [POST] /books : Ajouter un nouveau livre
router.post('/', bookController.addBook);
// [GET] /books/:id : Détails d'un livre
router.get('/:id', bookController.getBookById);
// [PUT] /books/:id : Mettre à jour un livre
router.put('/:id', bookController.updateBook);
// [PUT] /books/:id/progress : Mettre à jour la progression
router.put('/:id/progress', bookController.updateProgress);
// [POST] /books/:id/favorite : Ajouter aux favoris
router.post('/:id/favorite', authenticateJWT, bookController.addFavorite);
// [DELETE] /books/:id/favorite : Retirer des favoris
router.delete('/:id/favorite', authenticateJWT, bookController.removeFavorite);

module.exports = router;
