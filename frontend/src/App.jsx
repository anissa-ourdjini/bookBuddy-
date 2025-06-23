import React, { useState } from 'react';
import AddBookForm from './components/AddBookForm.jsx';
import BookList from './components/BookList.jsx';
import FavoriteBooks from './components/FavoriteBooks.jsx';
import Profile from './components/Profile.jsx';
import Rewards from './components/Rewards.jsx';

function App() {
  const [page, setPage] = useState('books');
  return (
    <div className="container">
      <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button onClick={() => setPage('books')}>Ma collection</button>
        <button onClick={() => setPage('favorites')}>Mes favoris</button>
        <button onClick={() => setPage('add')}>Ajouter un livre</button>
        <button onClick={() => setPage('profile')}>Profil</button>
        <button onClick={() => setPage('rewards')}>Récompenses</button>
      </nav>
      {page === 'add' && (<><h2>Ajouter un livre</h2><AddBookForm /></>)}
      {page === 'books' && <BookList />}
      {page === 'favorites' && <FavoriteBooks />}
      {page === 'profile' && <Profile />}
      {page === 'rewards' && <Rewards />}
    </div>
  );
}

export default App;
