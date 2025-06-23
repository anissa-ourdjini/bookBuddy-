import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/books', label: 'Ma collection' },
  { to: '/favorites', label: 'Favoris' },
  { to: '/profile', label: 'Profil' },
  { to: '/login', label: 'Connexion' },
  { to: '/register', label: 'Inscription' },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BookBuddy</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map(item => (
              <li className="nav-item" key={item.to}>
                <Link className={`nav-link${location.pathname === item.to ? ' active' : ''}`} to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
