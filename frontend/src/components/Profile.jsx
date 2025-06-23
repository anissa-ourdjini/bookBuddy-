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

  if (loading) return <div>Chargement...</div>;
  if (!profile) return <div>Profil non trouvé.</div>;

  return (
    <div>
      <h2>Mon profil</h2>
      {edit ? (
        <form onSubmit={handleSave} style={{ maxWidth: 320 }}>
          <label>Nom d'utilisateur</label>
          <input name="username" value={form.username} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEdit(false)}>Annuler</button>
        </form>
      ) : (
        <div style={{ maxWidth: 320 }}>
          <div><b>Nom d'utilisateur :</b> {profile.username}</div>
          <div><b>Email :</b> {profile.email}</div>
          <button onClick={() => setEdit(true)}>Modifier</button>
        </div>
      )}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Profile;
