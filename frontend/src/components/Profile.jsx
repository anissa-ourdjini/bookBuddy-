import React, { useEffect, useState } from 'react';

const getToken = () => localStorage.getItem('token');

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await fetch('/users/me', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setProfile(data);
      setForm({ username: data.username, email: data.email });
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMessage('Profil mis à jour !');
      setEdit(false);
      setProfile({ ...profile, ...form });
    } else {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div className="text-center my-4">Chargement...</div>;
  if (!profile) return <div className="alert alert-danger">Profil non trouvé.</div>;

  return (
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Mon profil</h2>
      {edit ? (
        <form onSubmit={handleSave} className="bg-light p-3 rounded shadow-sm mb-3">
          <div className="mb-3">
            <label className="form-label">Nom d'utilisateur</label>
            <input name="username" className="form-control" value={form.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEdit(false)}>Annuler</button>
          </div>
        </form>
      ) : (
        <div className="bg-light p-3 rounded shadow-sm mb-3">
          <div><b>Nom d'utilisateur :</b> {profile.username}</div>
          <div><b>Email :</b> {profile.email}</div>
          <button className="btn btn-outline-primary mt-2" onClick={() => setEdit(true)}>Modifier</button>
        </div>
      )}
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default Profile;
