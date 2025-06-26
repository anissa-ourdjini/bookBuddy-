import React, { useEffect, useState } from 'react';
import BookComponent from './BookComponent';

const getToken = () => localStorage.getItem('token');

const FavoriteBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupère les livres favoris de l'utilisateur
  const fetchFavoriteBooks = async () => {
    setLoading(true);
    const res = await fetch('/books/favorites', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    setBooks(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchFavoriteBooks(); }, []);

  // Rafraîchit la liste après ajout/suppression d'un favori
  const handleFavoriteChange = () => {
    fetchFavoriteBooks();
  };

  if (loading) return <div className="text-center my-4">Chargement...</div>;

  return (
    <div>
      <h2 className="mb-4">Mes favoris</h2>
      {books.length === 0 && <div className="alert alert-info">Aucun livre favori.</div>}
      <div className="row g-3">
        {books.map(book => (
          <BookComponent
            key={book._id}
            book={{ ...book, isFavorite: true }}
            onFavoriteChange={handleFavoriteChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;
