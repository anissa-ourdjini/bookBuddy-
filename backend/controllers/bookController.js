const Book = require('../models/Book');
const Favorite = require('../models/Favorite');

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
  console.log('filterBooks appelé', req.query);
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

// Ajouter un livre aux favoris
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;
    const exists = await Favorite.findOne({ user: userId, book: bookId });
    if (exists) return res.status(400).json({ message: 'Déjà en favori.' });
    await Favorite.create({ user: userId, book: bookId });
    res.json({ message: 'Ajouté aux favoris.' });
  } catch (err) {
    console.error('Erreur lors de l\'ajout aux favoris :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// Retirer un livre des favoris
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;
    await Favorite.deleteOne({ user: userId, book: bookId });
    res.json({ message: 'Retiré des favoris.' });
  } catch (err) {
    console.error('Erreur lors du retrait des favoris :', err.message, err.errors || '', err.stack);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// Récupérer les livres favoris de l'utilisateur
exports.getFavorites = async (req, res) => {
  try {
    console.log('getFavorites appelé', req.user);
    const userId = req.user.id;
    const favorites = await Favorite.find({ user: userId }).populate('book');
    res.json(favorites.map(fav => fav.book));
  } catch (err) {
    console.error('Erreur dans getFavorites :', err, err.stack);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
