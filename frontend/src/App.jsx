import React, { useState, useEffect } from 'react';
import AddBookForm from './components/AddBookForm.jsx';
import BookList from './components/BookList.jsx';
import FavoriteBooks from './components/FavoriteBooks.jsx';
import Profile from './components/Profile.jsx';
import Rewards from './components/Rewards.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function App() {
  const [page, setPage] = useState('books');
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setAuth(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    setPage('books');
  };

  if (!auth) {
    return showRegister ? (
      <Register goToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={() => setAuth(true)} goToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs mb-4 align-items-center">
        <li className="nav-item">
          <button className={`nav-link${page === 'books' ? ' active' : ''}`} onClick={() => setPage('books')}>Ma collection</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link${page === 'favorites' ? ' active' : ''}`} onClick={() => setPage('favorites')}>Mes favoris</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link${page === 'add' ? ' active' : ''}`} onClick={() => setPage('add')}>Ajouter un livre</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link${page === 'profile' ? ' active' : ''}`} onClick={() => setPage('profile')}>Profil</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link${page === 'rewards' ? ' active' : ''}`} onClick={() => setPage('rewards')}>Récompenses</button>
        </li>
        <li className="nav-item ms-auto">
          <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>Se déconnecter</button>
        </li>
      </ul>
      {page === 'add' && (<><h2>Ajouter un livre</h2><AddBookForm /></>)}
      {page === 'books' && <BookList />}
      {page === 'favorites' && <FavoriteBooks />}
      {page === 'profile' && <Profile />}
      {page === 'rewards' && <Rewards />}
    </div>
  );
}

export default App;
