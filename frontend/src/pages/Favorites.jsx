import React, { useEffect, useState } from 'react';
import apiFetch from '../utils/apiFetch';
import FavoriteButton from '../components/FavoriteButton';
import BookModal from '../components/BookModal';
import ConfirmModal from '../components/ConfirmModal';
import { useDeletedBooks } from '../components/DeletedBooksContext';

const Favorites = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirm, setConfirm] = useState({ show: false, action: null, message: '', bookId: null });
  const { addDeletedBook } = useDeletedBooks();

  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    try {
      const allBooks = await apiFetch('http://localhost:5000/books');
      setBooks(allBooks.filter(book => book.isFavorite));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (bookId) => {
    setConfirm({ show: true, action: 'removeFavorite', message: 'Are you sure you want to remove the book from favorites?', bookId });
  };

  const handleRemoveBook = async (bookId) => {
    setConfirm({ show: true, action: 'removeBook', message: 'Are you sure you want to remove this book?', bookId });
  };

  const handleConfirm = async () => {
    if (confirm.action === 'removeBook') {
      const removed = books.find(book => book._id === confirm.bookId);
      addDeletedBook(removed);
      setBooks(books => books.filter(book => book._id !== confirm.bookId));
      // Appel API différé ou à faire manuellement si suppression définitive souhaitée
    } else if (confirm.action === 'removeFavorite') {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/books/${confirm.bookId}/favorite`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFavorites(); // Rafraîchit la liste après suppression
    }
    setConfirm({ show: false, action: null, message: '', bookId: null });
  };

  const handleAddFavorite = async (bookId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/books/${bookId}/favorite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchFavorites(); // Rafraîchit la liste après ajout
  };

  return (
    <div className="container mt-5">
      <h2>My Favorites</h2>
      {loading && <div>Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {books.length === 1 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          width: '100%',
        }}>
          <div className="col-12 col-sm-6 col-md-4 mb-4" style={{ display: 'flex', justifyContent: 'center' }} key={books[0]._id}>
            <div className="card h-100" style={{ wordBreak: 'normal', writingMode: 'horizontal-tb', position: 'relative', paddingBottom: 60 }}>
              {books[0].coverImage && (
                <img src={books[0].coverImage} className="card-img-top" alt={books[0].title} style={{ height: 200, width: '100%', objectFit: 'contain', background: '#222' }} />
              )}
              <div className="card-body" style={{ wordBreak: 'normal', writingMode: 'horizontal-tb' }}>
                <h5 className="card-title" style={{ wordBreak: 'normal', writingMode: 'horizontal-tb' }}>{books[0].title}</h5>
                <p className="card-text">Auteur : {books[0].author}</p>
                <p className="card-text">Catégorie : {books[0].category}</p>
                <p className="card-text">Pages : {books[0].pages}</p>
                <p className="card-text">Statut : {books[0].status}</p>
                <div className="card-actions">
                  <button className="btn btn-warning btn-sm" onClick={() => handleRemoveFavorite(books[0]._id)} title="Remove from favorites">
                    ★ Remove from favorites
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedBook(books[0])} title="Edit">Edit</button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleRemoveBook(books[0]._id)} title="Remove book">Remove book</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="favorites-row">
          {books.map(book => (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={book._id}>
              <div className="card h-100" style={{ wordBreak: 'normal', writingMode: 'horizontal-tb', position: 'relative', paddingBottom: 60 }}>
                {book.coverImage && (
                  <img src={book.coverImage} className="card-img-top" alt={book.title} style={{ height: 200, width: '100%', objectFit: 'contain', background: '#222' }} />
                )}
                <div className="card-body" style={{ wordBreak: 'normal', writingMode: 'horizontal-tb' }}>
                  <h5 className="card-title" style={{ wordBreak: 'normal', writingMode: 'horizontal-tb' }}>{book.title}</h5>
                  <p className="card-text">Auteur : {book.author}</p>
                  <p className="card-text">Catégorie : {book.category}</p>
                  <p className="card-text">Pages : {book.pages}</p>
                  <p className="card-text">Statut : {book.status}</p>
                  <div className="card-actions">
                    <FavoriteButton
                      isFavorite={book.isFavorite}
                      onAdd={() => handleAddFavorite(book._id)}
                      onRemove={() => handleRemoveFavorite(book._id)}
                    />
                    <button className="btn btn-primary btn-sm" onClick={() => setSelectedBook(book)} title="Edit">Edit</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleRemoveBook(book._id)} title="Remove book">Remove book</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {books.length === 0 && !loading && <div>Aucun favori pour le moment.</div>}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdateStatus={() => { setSelectedBook(null); setTimeout(() => window.location.reload(), 300); }}
          onUpdateProgress={() => { setSelectedBook(null); setTimeout(() => window.location.reload(), 300); }}
        />
      )}
      <ConfirmModal
        show={confirm.show}
        onClose={() => setConfirm({ show: false, action: null, message: '', bookId: null })}
        onConfirm={handleConfirm}
        message={confirm.message}
      />
    </div>
  );
};

export default Favorites;
