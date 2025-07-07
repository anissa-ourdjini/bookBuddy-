import React, { useState } from 'react';

const BookModal = ({ book, onClose, onUpdateStatus, onUpdateProgress }) => {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    pages: book.pages,
    coverImage: book.coverImage || '',
    status: book.status || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/books/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, pages: form.pages ? Number(form.pages) : '' })
      });
      if (!res.ok) throw new Error('Error updating book');
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;
  // Ferme la modale si on clique sur le fond
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={handleBackdropClick}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Book</h5>
            <button type="button" className="btn-close" onClick={onClose} style={{ filter: 'invert(24%) sepia(99%) saturate(7486%) hue-rotate(357deg) brightness(102%) contrast(119%)', opacity: 1 }} aria-label="Close"></button>
          </div>
          <form onSubmit={handleSave}>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-2">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Author</label>
                <input type="text" className="form-control" name="author" value={form.author} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" name="category" value={form.category} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Pages</label>
                <input type="number" className="form-control" name="pages" placeholder="Number of pages" value={form.pages} onChange={handleChange} required min={1} />
              </div>
              <div className="mb-2">
                <label className="form-label">Cover image URL</label>
                <input type="text" className="form-control" name="coverImage" value={form.coverImage} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label className="form-label">Status</label>
                <input
                  className="form-control"
                  name="status"
                  list="status-options"
                  placeholder="Status"
                  value={form.status}
                  onChange={handleChange}
                  required
                />
                <datalist id="status-options">
                  <option value="To read" />
                  <option value="Reading" />
                  <option value="Finished" />
                </datalist>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              <button type="button" className="btn btn-secondary" onClick={onClose} style={{ fontFamily: 'Special Elite, Creepster, serif' }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
