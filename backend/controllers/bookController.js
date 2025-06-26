const Book = require('../models/Book');
const User = require('../models/User');

// Ajouter un livre
exports.addBook = async (req, res) => {
  console.log('coucou')
  
  try {
    const { title, author, coverImage, status, pages, category, userId } = req.body;
    if (!title || !author || !pages || !category) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }
    const book = new Book({
      title,
      author,
      coverImage,
      status,
      pages,
      category,
      userId
    });
    await book.save();
    await User.findByIdAndUpdate(userId, { $push: { books: book._id } });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' + err.message });
  }
};

// Récupérer tous les livres de l'utilisateur
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Récupérer un livre spécifique
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, userId: req.user.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour la progression de lecture
exports.updateProgress = async (req, res) => {
  try {
    const { currentPage } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { currentPage },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Ajouter/retirer des favoris
exports.addFavorite = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isFavorite: true },
      { new: true }
    );
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { favoris: req.params.id } });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isFavorite: false },
      { new: true }
    );
    await User.findByIdAndUpdate(req.user.id, { $pull: { favoris: req.params.id } });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Filtrer les livres
exports.filterBooks = async (req, res) => {
  try {
    const { author, category, status } = req.query;
    const filter = { userId: req.user.id };
    if (author) filter.author = author;
    if (category) filter.category = category;
    if (status) filter.status = status;
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
