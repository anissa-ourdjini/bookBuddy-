import React, { useEffect, useState } from 'react';
import AddBookForm from '../components/AddBookForm';
import BookSearchFilter from '../components/BookSearchFilter';
import FavoriteButton from '../components/FavoriteButton';
import BookModal from '../components/BookModal';

const BookCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:5000/books';
      const params = [];
      if (filters.author) params.push(`author=${encodeURIComponent(filters.author)}`);
      if (filters.category) params.push(`category=${encodeURIComponent(filters.category)}`);
      if (filters.status) params.push(`status=${encodeURIComponent(filters.status)}`);
      if (filters.search) params.push(`search=${encodeURIComponent(filters.search)}`);
      if (params.length) url = `http://localhost:5000/books/filter?${params.join('&')}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des livres');
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
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/books/${bookId}/favorite`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks();
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

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Ma collection de livres</h2>
      <AddBookForm onBookAdded={fetchBooks} />
      <BookSearchFilter onFilter={fetchBooks} />
      {loading && <div>Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(book)}>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Auteur : {book.author}</p>
                <p className="card-text">Catégorie : {book.category}</p>
                <p className="card-text">Pages : {book.pages}</p>
                <p className="card-text">État : {book.status}</p>
                <FavoriteButton
                  isFavorite={book.isFavorite}
                  onAdd={() => handleAddFavorite(book._id)}
                  onRemove={() => handleRemoveFavorite(book._id)}
                />
                {/* Ajout d'autres actions à venir */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
          onUpdateProgress={handleUpdateProgress}
        />
      )}
    </div>
  );
};

export default BookCollection;
