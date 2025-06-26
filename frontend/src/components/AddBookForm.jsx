import React, { useState } from 'react';

const API_URL = '/books';
const getToken = () => localStorage.getItem('token');

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
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess(addToFavorite ? 'Livre ajouté et mis en favori !' : 'Livre ajouté !');
        const book = await res.json();
        if (addToFavorite) {
          await fetch(`/books/${book._id}/favorite`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${getToken()}` }
          });
        }
        setForm({ title: '', author: '', cover: '', status: '', pages: '', category: '' });
      } else setSuccess('Erreur lors de l\'ajout');
    }
    setLoading(false);
  };

  return (
    <form>
      <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} />
      {errors.title && <span>{errors.title}</span>}
      <input name="author" placeholder="Auteur" value={form.author} onChange={handleChange} />
      {errors.author && <span>{errors.author}</span>}
      <input name="cover" placeholder="URL de couverture" value={form.cover} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">État de lecture</option>
        <option value="à lire">À lire</option>
        <option value="en cours de lecture">En cours de lecture</option>
        <option value="terminé">Terminé</option>
      </select>
      {errors.status && <span>{errors.status}</span>}
      <input name="pages" placeholder="Nombre de pages" value={form.pages} onChange={handleChange} type="number" />
      {errors.pages && <span>{errors.pages}</span>}
      <input name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} />
      {errors.category && <span>{errors.category}</span>}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" disabled={loading} onClick={e => handleSubmit(e, false)}>Ajouter</button>
        <button type="button" disabled={loading} onClick={e => handleSubmit(e, true)}>Ajouter aux favoris</button>
      </div>
      {success && <div>{success}</div>}
    </form>
  );
};

export default AddBookForm;
