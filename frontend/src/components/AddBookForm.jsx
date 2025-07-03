import React, { useState, useEffect } from 'react';

// Fonction utilitaire pour décoder le token JWT
function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const AddBookForm = ({ onBookAdded }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    coverImage: '',
    status: 'à lire',
    pages: '',
    category: '',
    isFavorite: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: name === 'pages' ? Number(value) : (type === 'checkbox' ? checked : value)
    });
  };

  const handleAdd = async (e, favorite = false) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const decoded = parseJwt(token);
      const userId = decoded?.id;
      if (!userId) throw new Error('Utilisateur non authentifié.');
      const res = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          pages: Number(form.pages),
          userId,
          isFavorite: favorite
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error while adding');
      setSuccess('Book added!');
      setForm({ title: '', author: '', coverImage: '', status: 'à lire', pages: '', category: '', isFavorite: false });
      if (onBookAdded) onBookAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <form onSubmit={e => handleAdd(e, form.isFavorite)} className="mb-4">
      <div className="row g-2">
        <div className="col-md-6">
          <input type="text" className="form-control" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" name="pages" placeholder="Number of pages" value={form.pages} onChange={handleChange} required min={1} />
        </div>
        <div className="col-md-6">
          <select className="form-select" name="status" value={form.status} onChange={handleChange} required>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="coverImage" placeholder="Cover image URL (optional)" value={form.coverImage} onChange={handleChange} />
        </div>
      </div>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}
      <div className="d-flex gap-2 mt-3">
        <button type="button" className="btn btn-success" disabled={loading} onClick={e => handleAdd(e, false)}>{loading ? 'Adding...' : 'Add Book'}</button>
        <button type="button" className="btn btn-success" disabled={loading} onClick={e => handleAdd(e, true)}>{loading ? 'Adding...' : 'Add to favorites'}</button>
      </div>
    </form>
  );
};

export default AddBookForm;
