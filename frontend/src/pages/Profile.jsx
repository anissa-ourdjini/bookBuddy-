import React, { useEffect, useState } from 'react';
import apiFetch from '../utils/apiFetch';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '' });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiFetch('http://localhost:5000/users/me');
        setUser(data);
        setForm({ username: data.username, email: data.email });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEdit(true);
  const handleCancel = () => {
    setEdit(false);
    setForm({ username: user.username, email: user.email });
    setError('');
    setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await apiFetch(`http://localhost:5000/users/${user._id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setUser(data);
      setEdit(false);
      setSuccess('Profil mis à jour !');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container mt-5">Chargement...</div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (!user) return null;

  return (
    <div className="container mt-5" style={{maxWidth: 500}}>
      <h2>My Profile</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {edit ? (
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-outline-primary" onClick={handleEdit}>Modifier</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
