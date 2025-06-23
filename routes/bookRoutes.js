const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// [POST] /books : Ajouter un nouveau livre
router.post('/', bookController.addBook);
// [GET] /books : Récupérer tous les livres de l'utilisateur
router.get('/', bookController.getBooks);
// [GET] /books/:id : Détails d'un livre
router.get('/:id', bookController.getBookById);
// [GET] /books/filter : Liste de livres filtrés
router.get('/filter', bookController.filterBooks);
// [PUT] /books/:id : Mettre à jour un livre
router.put('/:id', bookController.updateBook);
// [PUT] /books/:id/progress : Mettre à jour la progression
router.put('/:id/progress', bookController.updateProgress);
// [POST] /books/:id/favorite : Ajouter aux favoris
router.post('/:id/favorite', bookController.addFavorite);
// [DELETE] /books/:id/favorite : Retirer des favoris
router.delete('/:id/favorite', bookController.removeFavorite);

module.exports = router;
