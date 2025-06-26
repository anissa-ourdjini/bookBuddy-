import React, { useState } from 'react';

const AddBookForm = ({ onBookAdded }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    coverImage: '',
    status: 'to read',
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
      if (!res.ok) throw new Error(data.message || 'Error while adding');
      setSuccess('Book added!');
      setForm({ title: '', author: '', coverImage: '', status: 'to read', pages: '', category: '' });
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
            <option value="to read">To read</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="coverImage" placeholder="Cover image URL (optional)" value={form.coverImage} onChange={handleChange} />
        </div>
      </div>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}
      <button type="submit" className="btn btn-success mt-3" disabled={loading}>{loading ? 'Adding...' : 'Add Book'}</button>
    </form>
  );
};

export default AddBookForm;
