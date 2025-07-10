import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/books');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ paddingRight: 40 }}
            />
            <span
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 2
              }}
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                // œil barré
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2e2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.21-3.06 3.6-5.5 6.56-6.71" />
                  <path d="M1 1l22 22" />
                  <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.93 0 3.5-1.57 3.5-3.5 0-.47-.09-.92-.26-1.33" />
                </svg>
              ) : (
                // œil ouvert
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2e2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="10" ry="7" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </span>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <div className="mt-3 text-center">
        <button className="btn btn-link p-0" style={{ color: '#ff2e2e', fontFamily: 'Special Elite, Creepster, serif' }} onClick={() => setShowForgot(v => !v)}>
          Forgot password?
        </button>
      </div>
      {showForgot && (
        <form className="mt-3" onSubmit={async e => {
          e.preventDefault();
          setForgotMsg('');
          try {
            const res = await fetch('http://localhost:5000/auth/forgot-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: forgotEmail })
            });
            const data = await res.json();
            setForgotMsg(data.message || 'If this email exists, a reset link will be sent.');
          } catch (err) {
            setForgotMsg('An error occurred.');
          }
        }}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">Send reset link</button>
            <button type="button" className="btn btn-secondary w-100" style={{ fontFamily: 'Special Elite, Creepster, serif' }} onClick={() => { setShowForgot(false); setForgotMsg(''); setForgotEmail(''); }}>Cancel</button>
          </div>
          {forgotMsg && <div className="alert alert-info mt-2">{forgotMsg}</div>}
        </form>
      )}
    </div>
  );
};

export default Login;
