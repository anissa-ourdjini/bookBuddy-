const Book = require('../models/Book');

// Contrôleur des livres (squelettes)
exports.addBook = async (req, res) => {
  try {
    const { title, author, cover, status, pages, category } = req.body;
    if (!title || !author || !status || !pages || !category) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
    const newBook = new Book({ title, author, cover, status, pages, category });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Erreur lors de l\'ajout du livre :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [GET] /books : Récupérer tous les livres
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error('Erreur lors de la récupération des livres :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [GET] /books/:id : Détails d'un livre
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json(book);
  } catch (err) {
    console.error('Erreur lors de la récupération du livre :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [GET] /books/filter : Liste de livres filtrés
exports.filterBooks = async (req, res) => {
  try {
    const { author, category, status, title } = req.query;
    const filter = {};
    if (author) filter.author = author;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (title) filter.title = { $regex: title, $options: 'i' };
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    console.error('Erreur lors du filtrage des livres :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [PUT] /books/:id : Mettre à jour un livre
exports.updateBook = async (req, res) => {
  try {
    const { title, author, cover, status, pages, category } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, cover, status, pages, category },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json(book);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du livre :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [PUT] /books/:id/progress : Mettre à jour la progression de lecture
exports.updateProgress = async (req, res) => {
  try {
    const { progress } = req.body; // nombre de pages lues
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json(book);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la progression :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [POST] /books/:id/favorite : Ajouter un livre aux favoris (à adapter selon User)
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Non autorisé.' });
    const bookId = req.params.id;
    const User = require('../models/User');
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    if (!user.favorites) user.favorites = [];
    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ message: 'Livre déjà dans les favoris.' });
    }
    user.favorites.push(bookId);
    await user.save();
    res.json({ message: 'Livre ajouté aux favoris.', favorites: user.favorites });
  } catch (err) {
    console.error('Erreur lors de l\'ajout aux favoris :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// [DELETE] /books/:id/favorite : Retirer un livre des favoris (à adapter selon User)
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Non autorisé.' });
    const bookId = req.params.id;
    const User = require('../models/User');
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(bookId)) {
      return res.status(400).json({ message: 'Livre non présent dans les favoris.' });
    }
    user.favorites = user.favorites.filter(favId => favId.toString() !== bookId);
    await user.save();
    res.json({ message: 'Livre retiré des favoris.', favorites: user.favorites });
  } catch (err) {
    console.error('Erreur lors du retrait des favoris :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};
