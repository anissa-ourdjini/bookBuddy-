const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: String,
  status: { type: String, enum: ['à lire', 'en cours de lecture', 'terminé'], required: true },
  pages: { type: Number, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
