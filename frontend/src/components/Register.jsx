import React, { useState } from 'react';

const API_URL = '/auth/register';

const Register = ({ goToLogin }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Inscription réussie ! Vous pouvez vous connecter.');
      } else {
        setError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (e) {
      setError('Erreur réseau');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm mx-auto" style={{ maxWidth: 350 }}>
      <h2 className="mb-4 text-center">Inscription</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3">
        <input name="username" className="form-control" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input name="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <input name="password" type="password" className="form-control" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Inscription...' : "S'inscrire"}</button>
      <div className="text-center mt-3">
        <button type="button" className="btn btn-link p-0" onClick={goToLogin}>Déjà un compte ? Se connecter</button>
      </div>
    </form>
  );
};

export default Register; 