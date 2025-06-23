import React, { useState } from 'react';

const AddBookForm = ({ onBookAdded }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    coverImage: '',
    status: 'à lire',
    pages: '',
    category: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          pages: Number(form.pages)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'ajout');
      setSuccess('Livre ajouté !');
      setForm({ title: '', author: '', coverImage: '', status: 'à lire', pages: '', category: '' });
      if (onBookAdded) onBookAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-6">
          <input type="text" className="form-control" name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="author" placeholder="Auteur" value={form.author} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" name="pages" placeholder="Nombre de pages" value={form.pages} onChange={handleChange} required min={1} />
        </div>
        <div className="col-md-6">
          <select className="form-select" name="status" value={form.status} onChange={handleChange} required>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="coverImage" placeholder="URL de la couverture (optionnel)" value={form.coverImage} onChange={handleChange} />
        </div>
      </div>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}
      <button type="submit" className="btn btn-success mt-3" disabled={loading}>{loading ? 'Ajout...' : 'Ajouter le livre'}</button>
    </form>
  );
};

export default AddBookForm;
