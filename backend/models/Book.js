const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String }, // URL ou base64
  status: { type: String, enum: ['à lire', 'en cours de lecture', 'terminé'], default: 'à lire' },
  pages: { type: Number, required: true },
  category: { type: String, required: true },
  currentPage: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isFavorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
