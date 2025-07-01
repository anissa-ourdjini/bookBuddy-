import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'My Collection' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/add-book', label: 'Add Book' },
  { to: '/profile', label: 'Profile' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/rewards', label: 'Rewards' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {isLoggedIn && (
          <button className="btn btn-primary me-3" onClick={handleLogout}>Sign out</button>
        )}
        <Link className="navbar-brand" to="/">BookBuddy</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map(item => (
              (item.to === '/register' || !isLoggedIn || (item.to !== '/login')) && (
                <li className="nav-item" key={item.to}>
                  <Link className={`nav-link${location.pathname === item.to ? ' active' : ''}`} to={item.to}>{item.label}</Link>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
