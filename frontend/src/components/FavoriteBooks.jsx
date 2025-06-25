import React, { useEffect, useState } from 'react';
import BookComponent from './BookComponent';

const getToken = () => localStorage.getItem('token');

const FavoriteBooks = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);

  // Récupère tous les livres et filtre ceux qui sont favoris
  const fetchFavoriteBooks = async () => {
    setLoading(true);
    const res = await fetch('/books/filter', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    // On suppose que l'API ne renvoie pas directement les favoris, donc on filtre côté client
    // Les favoris sont dans localStorage/favorites ou à synchroniser avec l'utilisateur connecté
    // Ici, on utilise le même état local que BookList
    const favs = JSON.parse(localStorage.getItem('favorites') || '{}');
    setFavorites(favs);
    setBooks(data.filter(book => favs[book._id]));
    setLoading(false);
  };

  useEffect(() => { fetchFavoriteBooks(); }, []);

  const handleFavoriteChange = (bookId, isFav) => {
    setFavorites(favs => {
      const updated = { ...favs, [bookId]: isFav };
      localStorage.setItem('favorites', JSON.stringify(updated));
      setBooks(books => isFav ? books : books.filter(b => b._id !== bookId));
      return updated;
    });
  };

  if (loading) return <div className="text-center my-4">Chargement...</div>;

  return (
    <div>
      <h2 className="mb-4">Mes favoris</h2>
      {books.length === 0 && <div className="alert alert-info">Aucun livre favori.</div>}
      <div className="row g-3">
        {books.map(book => (
          <div className="col-md-4 col-sm-6" key={book._id}>
            <BookComponent
              book={{ ...book, isFavorite: favorites[book._id] }}
              onFavoriteChange={handleFavoriteChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;
