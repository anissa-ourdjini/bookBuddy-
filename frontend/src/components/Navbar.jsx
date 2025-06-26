import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">BookBuddy</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Ma collection</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Ajouter un livre</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favoris</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rewards">Récompenses</Link>
            </li>
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">Créer un compte</Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={handleLogout} style={{marginTop: 2}}>Déconnexion</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
