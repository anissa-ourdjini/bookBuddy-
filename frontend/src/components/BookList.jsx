import React, { useEffect, useState } from 'react';
import BookComponent from './BookComponent';

// Utilitaire pour récupérer le token JWT du localStorage
const getToken = () => localStorage.getItem('token');

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ author: '', category: '', status: '' });
  const [selectedBook, setSelectedBook] = useState(null);
  // Ajout d'un état local pour les favoris de chaque livre
  const [favorites, setFavorites] = useState({});
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    setError('');
    let url = '/books/filter?';
    if (filters.author) url += `author=${encodeURIComponent(filters.author)}&`;
    if (filters.category) url += `category=${encodeURIComponent(filters.category)}&`;
    if (filters.status) url += `status=${encodeURIComponent(filters.status)}&`;
    if (search) url += `title=${encodeURIComponent(search)}&`;
    try {
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) {
        if (res.status === 401) setError('Session expirée ou non autorisée. Veuillez vous reconnecter.');
        else setError('Erreur lors du chargement des livres.');
        setBooks([]);
        return;
      }
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Erreur réseau.');
      setBooks([]);
    }
  };

  useEffect(() => { fetchBooks(); }, [search, filters]);

  // Met à jour l'état favori d'un livre (callback pour BookComponent)
  const handleFavoriteChange = (bookId, isFav) => {
    setFavorites(favs => ({ ...favs, [bookId]: isFav }));
  };

  // Injection de l'état favori dans chaque BookComponent
  return (
    <div>
      <h2 className="mb-4">Ma collection</h2>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <input className="form-control" placeholder="Recherche par titre..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Auteur" value={filters.author} onChange={e => setFilters(f => ({ ...f, author: e.target.value }))} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Catégorie" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">État</option>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
      </div>
      <div className="row g-3">
        {books.map(book => (
          <div className="col-md-4 col-sm-6" key={book._id}>
            <BookComponent
              book={{ ...book, isFavorite: favorites[book._id] }}
              onClick={() => setSelectedBook(book)}
              onFavoriteChange={handleFavoriteChange}
            />
          </div>
        ))}
      </div>
      {selectedBook && (
        <BookComponent
          book={{ ...selectedBook, isFavorite: favorites[selectedBook._id] }}
          modal
          onClose={() => setSelectedBook(null)}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </div>
  );
};

export default BookList;
