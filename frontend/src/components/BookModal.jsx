import React, { useState, useRef, useEffect } from 'react';

const BookModal = ({ book, onClose, onUpdateStatus, onUpdateProgress }) => {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    pages: book.pages,
    coverImage: book.coverImage || '',
    status: book.status || 'Status',
    startDate: book.startDate || '',
    currentPage: book.currentPage || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showContextForm, setShowContextForm] = useState(false);
  const [hideContextForm, setHideContextForm] = useState(false);
  const contextRef = useRef(null);

  function isReadingStatus(status) {
    if (!status) return false;
    return status.trim().toLowerCase() === 'reading';
  }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'status') setHideContextForm(false);
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
        body: JSON.stringify({ ...form, pages: form.pages ? Number(form.pages) : '', startDate: form.startDate, currentPage: form.currentPage })
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

  console.log('DEBUG hideContextForm:', hideContextForm, 'showContextForm:', showContextForm, 'status:', form.status);

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {showContextForm && (
                <div ref={contextRef}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 4 }}>
                    <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => setShowContextForm(false)}>
                      Masquer
                    </button>
                    <button type="button" className="btn-close" aria-label="Fermer" onClick={() => { setShowContextForm(false); setHideContextForm(true); }} style={{ fontSize: 18, marginLeft: 4, filter: 'invert(24%) sepia(99%) saturate(7486%) hue-rotate(357deg) brightness(102%) contrast(119%)', color: 'red' }} />
                  </div>
                  <div ref={contextRef} className="mb-2" style={{ position: 'relative' }}>
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
                  <div ref={contextRef} className="mb-2">
                    <label className="form-label">Page actuelle</label>
                    <input type="number" className="form-control" name="currentPage" value={form.currentPage} min={1} max={form.pages || undefined} onChange={handleChange} />
                  </div>
                  <div ref={contextRef} className="mb-2">
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
