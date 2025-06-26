import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMessage('Inscription réussie ! Vous pouvez vous connecter.');
    } else {
      const data = await res.json();
      setMessage(data.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <div className="card p-4 shadow-sm">
          <h2 className="mb-4">Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nom d'utilisateur</label>
              <input name="username" className="form-control" value={form.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">S'inscrire</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
