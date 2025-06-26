import React, { useState } from 'react';

const API_URL = '/books';

const AddBookForm = () => {
  const [form, setForm] = useState({
    title: '', author: '', cover: '', status: '', pages: '', category: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (field, value) => {
    let err = {};
    if (field === 'title' && !value) err.title = 'Titre requis';
    if (field === 'author' && !value) err.author = 'Auteur requis';
    if (field === 'pages' && (!value || isNaN(value) || value <= 0)) err.pages = 'Nombre de pages invalide';
    if (field === 'status' && !['à lire', 'en cours de lecture', 'terminé'].includes(value)) err.status = 'État invalide';
    if (field === 'category' && !value) err.category = 'Catégorie requise';
    return err;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, ...validate(name, value) });
  };

  const handleSubmit = async (e, addToFavorite = false) => {
    e.preventDefault();
    setLoading(true);
    let newErrors = {};
    Object.keys(form).forEach(field => {
      newErrors = { ...newErrors, ...validate(field, form[field]) };
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const token = localStorage.getItem('token');
      const payload = { ...form, pages: Number(form.pages) };
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccess(addToFavorite ? 'Livre ajouté et mis en favori !' : 'Livre ajouté !');
        const book = await res.json();
        if (addToFavorite) {
          await fetch(`/books/${book._id}/favorite`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }
        setForm({ title: '', author: '', cover: '', status: '', pages: '', category: '' });
      } else setSuccess('Erreur lors de l\'ajout');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
      <div className="mb-3">
        <input name="title" className="form-control" placeholder="Titre" value={form.title} onChange={handleChange} />
        {errors.title && <span className="text-danger small">{errors.title}</span>}
      </div>
      <div className="mb-3">
        <input name="author" className="form-control" placeholder="Auteur" value={form.author} onChange={handleChange} />
        {errors.author && <span className="text-danger small">{errors.author}</span>}
      </div>
      <div className="mb-3">
        <input name="cover" className="form-control" placeholder="URL de couverture" value={form.cover} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <select name="status" className="form-select" value={form.status} onChange={handleChange}>
          <option value="">État de lecture</option>
          <option value="à lire">À lire</option>
          <option value="en cours de lecture">En cours de lecture</option>
          <option value="terminé">Terminé</option>
        </select>
        {errors.status && <span className="text-danger small">{errors.status}</span>}
      </div>
      <div className="mb-3">
        <input name="pages" className="form-control" placeholder="Nombre de pages" value={form.pages} onChange={handleChange} type="number" />
        {errors.pages && <span className="text-danger small">{errors.pages}</span>}
      </div>
      <div className="mb-3">
        <input name="category" className="form-control" placeholder="Catégorie" value={form.category} onChange={handleChange} />
        {errors.category && <span className="text-danger small">{errors.category}</span>}
      </div>
      <button type="submit" className="btn btn-primary w-100">Ajouter</button>
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </form>
  );
};

export default AddBookForm;
