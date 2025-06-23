import React from 'react';

const BookModal = ({ book, onClose, onUpdateStatus, onUpdateProgress }) => {
  if (!book) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {book.coverImage && <img src={book.coverImage} alt={book.title} className="img-fluid mb-3" style={{maxHeight:200}} />}
            <p><strong>Auteur :</strong> {book.author}</p>
            <p><strong>Catégorie :</strong> {book.category}</p>
            <p><strong>Pages :</strong> {book.pages}</p>
            <p><strong>État :</strong> {book.status}</p>
            {/* Gestion de la progression */}
            {book.status === 'en cours de lecture' && (
              <form onSubmit={onUpdateProgress} className="mb-2">
                <label className="form-label">Dernière page lue :</label>
                <input type="number" name="currentPage" defaultValue={book.currentPage || 0} min={0} max={book.pages} className="form-control mb-2" />
                <button type="submit" className="btn btn-info btn-sm">Mettre à jour</button>
                <div className="progress mt-2">
                  <div className="progress-bar" role="progressbar" style={{width: `${((book.currentPage||0)/book.pages)*100}%`}} aria-valuenow={book.currentPage||0} aria-valuemin="0" aria-valuemax={book.pages}></div>
                </div>
              </form>
            )}
            {/* Changement d'état */}
            <div className="mb-2">
              <label className="form-label">Changer l'état :</label>
              <select className="form-select" value={book.status} onChange={onUpdateStatus}>
                <option value="à lire">À lire</option>
                <option value="en cours de lecture">En cours de lecture</option>
                <option value="terminé">Terminé</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
