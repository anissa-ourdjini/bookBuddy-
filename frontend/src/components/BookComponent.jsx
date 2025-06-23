import React, { useState } from 'react';

const ProgressBar = ({ value, max }) => (
  <div style={{ background: '#eee', borderRadius: 4, height: 10, margin: '8px 0' }}>
    <div style={{ width: `${(value / max) * 100}%`, background: '#2d3a4b', height: '100%', borderRadius: 4 }} />
  </div>
);

// Utilitaire pour récupérer le token JWT du localStorage
const getToken = () => localStorage.getItem('token');

const BookComponent = ({ book, onClick, modal, onClose, onFavoriteChange }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [status, setStatus] = useState(book.status);
  const [progress, setProgress] = useState(book.progress || 0);
  const [pages, setPages] = useState(book.pages);
  const [saving, setSaving] = useState(false);
  const [isFavorite, setIsFavorite] = useState(book.isFavorite || false);
  const [favLoading, setFavLoading] = useState(false);

  const handleStatusChange = async e => {
    setStatus(e.target.value);
    setEditStatus(true);
    if (e.target.value !== 'en cours de lecture') {
      setProgress(0);
    }
    // Mettre à jour le statut côté backend
    setSaving(true);
    await fetch(`/books/${book._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...book, status: e.target.value })
    });
    setSaving(false);
  };

  const handleProgressChange = async e => {
    setProgress(e.target.value);
    setSaving(true);
    await fetch(`/books/${book._id}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: Number(e.target.value) })
    });
    setSaving(false);
  };

  const handleFavorite = async e => {
    e.stopPropagation && e.stopPropagation();
    setFavLoading(true);
    const method = isFavorite ? 'DELETE' : 'POST';
    const res = await fetch(`/books/${book._id}/favorite`, {
      method,
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (res.ok) {
      setIsFavorite(!isFavorite);
      onFavoriteChange && onFavoriteChange(book._id, !isFavorite);
    }
    setFavLoading(false);
  };

  if (!modal) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer', border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#fff', boxShadow: '0 2px 8px #eee', position: 'relative' }}>
        <img src={book.cover} alt={book.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 4 }} />
        <button onClick={handleFavorite} disabled={favLoading} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 22, color: isFavorite ? '#e74c3c' : '#bbb', cursor: 'pointer' }} title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
          {isFavorite ? '★' : '☆'}
        </button>
        <h4>{book.title}</h4>
        <div style={{ color: '#888', fontSize: 14 }}>{book.author}</div>
        <div style={{ fontSize: 13 }}>{book.category}</div>
        <div style={{ fontSize: 13, color: '#2d3a4b' }}>{book.status}</div>
      </div>
    );
  }

  // Modal
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 320, maxWidth: 400, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
        <img src={book.cover} alt={book.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 4 }} />
        <button onClick={handleFavorite} disabled={favLoading} style={{ position: 'absolute', top: 8, left: 8, background: 'none', border: 'none', fontSize: 22, color: isFavorite ? '#e74c3c' : '#bbb', cursor: 'pointer' }} title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
          {isFavorite ? '★' : '☆'}
        </button>
        <h3>{book.title}</h3>
        <div><b>Auteur :</b> {book.author}</div>
        <div><b>Catégorie :</b> {book.category}</div>
        <div><b>Pages :</b> {book.pages}</div>
        <div style={{ margin: '12px 0' }}>
          <b>État de lecture :</b>
          <select value={status} onChange={handleStatusChange} disabled={saving} style={{ marginLeft: 8 }}>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        {status === 'en cours de lecture' && (
          <div>
            <label>Dernière page lue :</label>
            <input type="number" min={0} max={pages} value={progress} onChange={handleProgressChange} disabled={saving} />
            <ProgressBar value={progress} max={pages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookComponent;
