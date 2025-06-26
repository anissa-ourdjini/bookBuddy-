import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Home = () => {
  const [tab, setTab] = useState('login');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">BookBuddy</span>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className={`nav-link btn btn-link${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>Connexion</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link${tab === 'register' ? ' active' : ''}`} onClick={() => setTab('register')}>Inscription</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div style={{ width: 350 }}>
          {tab === 'login' && <Login onLogin={() => window.location.reload()} goToRegister={() => setTab('register')} />}
          {tab === 'register' && <Register goToLogin={() => setTab('login')} />}
        </div>
      </div>
    </div>
  );
};

export default Home; 