import React from 'react';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;
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
            <h5 className="modal-title">Confirmation</h5>
            <button type="button" className="btn-close" onClick={onClose} style={{ filter: 'invert(24%) sepia(99%) saturate(7486%) hue-rotate(357deg) brightness(102%) contrast(119%)', opacity: 1 }} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onConfirm}>Yes</button>
            <button className="btn btn-secondary" onClick={onClose} style={{ fontFamily: 'Special Elite, Creepster, serif' }}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 