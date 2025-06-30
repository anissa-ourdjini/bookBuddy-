import React, { useEffect, useState } from 'react';
import apiFetch from '../utils/apiFetch';
import ConfirmModal from '../components/ConfirmModal';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '' });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDelete, setShowDelete] = useState(false);

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

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    await apiFetch(`http://localhost:5000/users/${user._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    window.location.href = '/login';
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
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel} style={{ fontFamily: 'Special Elite, Creepster, serif' }}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          <button className="btn btn-primary ms-2" onClick={() => setShowDelete(true)}>Delete account</button>
        </div>
      )}
      <ConfirmModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDeleteAccount}
        message="Are you sure to delete this account?"
      />
    </div>
  );
};

export default Profile;
