import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      login();
      setMessage('Connexion réussie !');
      navigate('/');
    } else {
      setMessage(data.message || 'Identifiants invalides');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <div className="card p-4 shadow-sm">
          <h2 className="mb-4">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </form>
          <div className="mt-3 text-center">
            <span>Pas encore de compte ? </span>
            <Link to="/register">Créer un compte</Link>
          </div>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
