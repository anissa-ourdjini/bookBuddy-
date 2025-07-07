import React, { useState, useEffect, useRef } from 'react';

// Fonction utilitaire pour décoder le token JWT
function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function isReadingStatus(status) {
  if (!status) return false;
  const s = status.toLowerCase();
  return s === 'reading' || s === 'en cours de lecture';
}

const AddBookForm = ({ onBookAdded }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    coverImage: '',
    status: 'Status',
    pages: '',
    category: '',
    isFavorite: false,
    startDate: '',
    currentPage: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContextForm, setShowContextForm] = useState(false);
  const [hideContextForm, setHideContextForm] = useState(false);
  const contextRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    if (name === 'status') setHideContextForm(false);
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
          pages: form.pages ? Number(form.pages) : '',
          userId,
          isFavorite: favorite,
          startDate: form.startDate,
          currentPage: form.currentPage,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error while adding');
      setSuccess('Book added!');
      setForm({ title: '', author: '', coverImage: '', status: '', pages: '', category: '', isFavorite: false, startDate: '', currentPage: '' });
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

  useEffect(() => {
    if (isReadingStatus(form.status)) {
      if (!hideContextForm) setShowContextForm(true);
    } else {
      setShowContextForm(false);
      setHideContextForm(false);
    }
  }, [form.status, hideContextForm]);

  useEffect(() => {
    if (!showContextForm) return;
    function handleClickOutside(event) {
      if (
        contextRef.current &&
        !contextRef.current.contains(event.target) &&
        event.target.name !== 'status'
      ) {
        setShowContextForm(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContextForm]);

  console.log('DEBUG hideContextForm:', hideContextForm, 'showContextForm:', showContextForm, 'status:', form.status);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              name="status"
              placeholder="Status"
              value={form.status}
              onChange={handleChange}
              required
              onFocus={e => {
                if (e.target.value === "Status") {
                  e.target.setSelectionRange(0, 0);
                }
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="coverImage" placeholder="Cover image URL (optional)" value={form.coverImage} onChange={handleChange} />
        </div>
        {showContextForm && (
          <div ref={contextRef} className="row g-2">
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 4 }}>
              <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => setShowContextForm(false)}>
                Masquer
              </button>
              <button type="button" className="btn-close" aria-label="Fermer" onClick={() => { setShowContextForm(false); setHideContextForm(true); }} style={{ fontSize: 18, marginLeft: 4, filter: 'invert(24%) sepia(99%) saturate(7486%) hue-rotate(357deg) brightness(102%) contrast(119%)', color: 'red' }} />
            </div>
            <div className="col-md-6" style={{ position: 'relative' }}>
              <label className="form-label">Date de début</label>
              <input
                type="date"
                className="form-control custom-date-input"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                style={{ paddingRight: 36 }}
              />
              {/* Icône calendrier SVG rouge */}
              <span style={{ position: 'absolute', right: 10, top: 36, pointerEvents: 'none', zIndex: 2 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" fill="none"/>
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
            </div>
            <div className="col-md-6">
              <label className="form-label">Page actuelle</label>
              <input type="number" className="form-control" name="currentPage" value={form.currentPage} min={1} max={form.pages || undefined} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Progression</label>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: form.pages && form.currentPage ? `${Math.min(100, Math.round((form.currentPage / form.pages) * 100))}%` : '0%' }}
                  aria-valuenow={form.pages && form.currentPage ? Math.min(100, Math.round((form.currentPage / form.pages) * 100)) : 0}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {form.pages && form.currentPage ? `${Math.min(100, Math.round((form.currentPage / form.pages) * 100))}%` : '0%'}
                </div>
              </div>
            </div>
          </div>
        )}
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
