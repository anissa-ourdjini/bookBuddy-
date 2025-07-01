import React, { useEffect, useState } from 'react';
import AddBookForm from '../components/AddBookForm';
import BookSearchFilter from '../components/BookSearchFilter';
import FavoriteButton from '../components/FavoriteButton';
import BookModal from '../components/BookModal';
import ConfirmModal from '../components/ConfirmModal';

const BookCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirm, setConfirm] = useState({ show: false, action: null, message: '', bookId: null });
  const [deletedBooks, setDeletedBooks] = useState([]);
  const [confirmRemoveDeleted, setConfirmRemoveDeleted] = useState({ show: false, book: null });

  const fetchBooks = async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Vous devez être connecté.');
      let url = 'http://localhost:5000/books';
      const params = [];
      if (filters.search) params.push(`search=${encodeURIComponent(filters.search)}`);
      if (filters.author) params.push(`author=${encodeURIComponent(filters.author)}`);
      if (filters.category) params.push(`category=${encodeURIComponent(filters.category)}`);
      if (filters.status) params.push(`status=${encodeURIComponent(filters.status)}`);
      if (params.length) url = `http://localhost:5000/books/filter?${params.join('&')}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erreur lors du chargement des livres');
      }
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (bookId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/books/${bookId}/favorite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks();
  };

  const handleRemoveFavorite = async (bookId) => {
    setConfirm({ show: true, action: 'removeFavorite', message: 'Are you sure you want to remove the book from favorites?', bookId });
  };

  const handleConfirm = async () => {
    if (confirm.action === 'removeBook') {
      const removed = books.find(book => book._id === confirm.bookId);
      setDeletedBooks([...deletedBooks, { ...removed, originalIndex: books.findIndex(book => book._id === confirm.bookId) }]);
      setBooks(books => books.filter(book => book._id !== confirm.bookId));
    } else if (confirm.action === 'removeFavorite') {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/books/${confirm.bookId}/favorite`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books => books.filter(book => book._id !== confirm.bookId));
    }
    setConfirm({ show: false, action: null, message: '', bookId: null });
  };

  const handleUndo = (book) => {
    const updated = [...books];
    updated.splice(book.originalIndex, 0, book);
    setBooks(updated);
    setDeletedBooks(deletedBooks.filter(b => b._id !== book._id));
    // Si besoin, restaurer côté backend ici
  };

  const handleCardClick = (book) => setSelectedBook(book);
  const handleCloseModal = () => setSelectedBook(null);

  const handleUpdateStatus = async (e) => {
    const status = e.target.value;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/books/${selectedBook._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchBooks();
    setSelectedBook({ ...selectedBook, status });
  };

  const handleUpdateProgress = async (e) => {
    e.preventDefault();
    const currentPage = e.target.currentPage.value;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/books/${selectedBook._id}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPage }),
    });
    fetchBooks();
    setSelectedBook({ ...selectedBook, currentPage });
  };

  const handleRemoveBook = async (bookId) => {
    setConfirm({ show: true, action: 'removeBook', message: 'Are you sure you want to remove this book?', bookId });
  };

  const handleRemoveDeleted = (book) => {
    setConfirmRemoveDeleted({ show: true, book });
  };

  const confirmRemoveDeletedBook = async () => {
    // Suppression côté backend uniquement lors de la suppression définitive
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/books/${confirmRemoveDeleted.book._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeletedBooks(deletedBooks.filter(b => b._id !== confirmRemoveDeleted.book._id));
    setConfirmRemoveDeleted({ show: false, book: null });
    fetchBooks();
  };

  const handleFilter = (filters) => {
    const statusMap = {
      'to read': 'à lire',
      'reading': 'en cours de lecture',
      'finished': 'terminé'
    };
    const backendStatus = statusMap[filters.status] || filters.status;
    fetchBooks({ ...filters, status: backendStatus });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Collection</h2>
      <BookSearchFilter onFilter={handleFilter} />
      {loading && <div>Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {books.map((book) => {
          const {
            coverImage = '',
            title = 'No title',
            author = 'Unknown',
            category = 'Unknown',
            pages = 'N/A',
            status = 'N/A',
            isFavorite = false,
            _id
          } = book || {};
          return (
            <div className="col-md-4 mb-4" key={_id}>
              <div className="card h-100 d-flex flex-column justify-content-between" style={{ border: '2px solid #ff2e2e', background: '#181818', boxShadow: '0 0 30px 2px #ff2e2e33, 0 0 10px #000a' }}>
                <div style={{ cursor: 'pointer' }} onClick={() => setSelectedBook(book)}>
                  {coverImage ? (
                    <img
                      src={coverImage}
                      className="card-img-top"
                      alt={title}
                      style={{ height: 200, width: '100%', objectFit: 'contain', background: '#222', borderRadius: 8 }}
                    />
                  ) : (
                    <div style={{ height: 200, width: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff2e2e', fontSize: 24, borderRadius: 8 }}>
                      No image
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#ff2e2e', fontFamily: 'Special Elite, Creepster, serif' }}>{title}</h5>
                    <p className="card-text">Auteur : {author}</p>
                    <p className="card-text">Catégorie : {category}</p>
                    <p className="card-text">Pages : {pages}</p>
                    <p className="card-text">Statut : {status}</p>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 d-flex justify-content-end gap-2 mt-auto">
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onAdd={() => handleAddFavorite(_id)}
                    onRemove={() => handleRemoveFavorite(_id)}
                  />
                  <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedBook(book); }} title="Edit">Edit</button>
                  <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleRemoveBook(_id); }} title="Remove book">Remove book</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
          onUpdateProgress={handleUpdateProgress}
        />
      )}
      <ConfirmModal
        show={confirm.show}
        onClose={() => setConfirm({ show: false, action: null, message: '', bookId: null })}
        onConfirm={handleConfirm}
        message={confirm.message}
      />
      {deletedBooks.length > 0 && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
          {deletedBooks.map((book, idx) => (
            <div key={book._id + '-' + idx} className="alert alert-warning d-flex align-items-center mb-2" style={{ minWidth: 250 }}>
              <span className="me-auto">Livre supprimé : <b>{book.title}</b></span>
              <button className="btn btn-sm btn-success ms-2" onClick={() => handleUndo(book)}>Undo</button>
              <button className="btn btn-sm btn-success ms-2" onClick={() => handleRemoveDeleted(book)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        show={confirmRemoveDeleted.show}
        onClose={() => setConfirmRemoveDeleted({ show: false, book: null })}
        onConfirm={confirmRemoveDeletedBook}
        message={confirmRemoveDeleted.book ? `Are you sure you want to remove definitely this book "${confirmRemoveDeleted.book.title}"?` : ''}
      />
    </div>
  );
};

export default BookCollection;
