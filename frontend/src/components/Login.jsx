import React, { useState } from 'react';

const API_URL = '/auth/login';

const Login = ({ onLogin, goToRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        onLogin && onLogin();
      } else {
        setError(data.message || 'Identifiants invalides');
      }
    } catch (e) {
      setError('Erreur réseau');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm mx-auto" style={{ maxWidth: 350 }}>
      <h2 className="mb-4 text-center">Connexion</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input name="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input name="password" type="password" className="form-control" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'}</button>
      <div className="text-center mt-3">
        <button type="button" className="btn btn-link p-0" onClick={goToRegister}>Créer un compte</button>
      </div>
    </form>
  );
};

export default Login; 