import React, { useEffect, useState } from 'react';
import AddBookForm from '../components/AddBookForm';
import BookSearchFilter from '../components/BookSearchFilter';
import FavoriteButton from '../components/FavoriteButton';
import BookModal from '../components/BookModal';
import ConfirmModal from '../components/ConfirmModal';
import { useDeletedBooks } from '../components/DeletedBooksContext';

const BookCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirm, setConfirm] = useState({ show: false, action: null, message: '', bookId: null });
  const { addDeletedBook } = useDeletedBooks();

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
      addDeletedBook(removed);
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

  const handleFilter = (filters) => {
    const statusMap = {
      'to read': 'à lire',
      'reading': 'en cours de lecture',
      'finished': 'terminé'
    };
    const backendStatus = statusMap[filters.status] || filters.status;
    fetchBooks({ ...filters, status: backendStatus });
  };

  // Ajout de la fonction d'harmonisation
  const getDisplayStatus = (status) => {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s === 'à lire' || s === 'to read') return 'To read';
    if (s === 'en cours de lecture' || s === 'reading') return 'Reading';
    if (s === 'terminé' || s === 'finished') return 'Finished';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Collection</h2>
      <BookSearchFilter onFilter={handleFilter} />
      {loading && <div>Loading...</div>}
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
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={_id}>
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
                    <p className="card-text">Author: {author}</p>
                    <p className="card-text">Category: {category}</p>
                    <p className="card-text">Pages: {pages}</p>
                    <p className="card-text">Status: {getDisplayStatus(status)}</p>
                  </div>
                </div>
                <div className="card-actions">
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
    </div>
  );
};

export default BookCollection;
