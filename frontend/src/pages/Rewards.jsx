import React, { useState } from 'react';
import cw from '../assets/cw.jpg';
import M from '../assets/M.jpg';
import rl from '../assets/rl.png';
import mh from '../assets/mh.jpg';
import questionMark from '../assets/questionMark.png';
import ConfirmModal from '../components/ConfirmModal';

const rewardsData = [
  { count: 50, img: cw, label: '50 books read' },
  { count: 100, img: M, label: '100 books read' },
  { count: 150, img: rl, label: '150 books read' },
  { count: 300, img: mh, label: "300 books read - Maître de l'horreur" },
];

const Rewards = () => {
  const [rewards, setRewards] = useState(rewardsData);
  const [editIndex, setEditIndex] = useState(null);
  const [editReward, setEditReward] = useState({ count: '', img: '', label: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const booksRead = 0; // Test : toutes les récompenses sont cachées
  const [deletedRewards, setDeletedRewards] = useState([]);
  const [confirmRemoveDeleted, setConfirmRemoveDeleted] = useState({ show: false, reward: null });
  const [newReward, setNewReward] = useState({ count: '', img: '', label: '' });

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditReward({ ...rewards[idx] });
    setShowEditModal(true);
  };

  const handleSave = () => {
    const updated = [...rewards];
    updated[editIndex] = { ...editReward };
    setRewards(updated);
    setEditIndex(null);
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setShowEditModal(false);
  };

  const handleRemove = (idx) => {
    setRemoveIndex(idx);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    const removed = rewards[removeIndex];
    setDeletedRewards([...deletedRewards, { ...removed, originalIndex: removeIndex }]);
    const updated = rewards.filter((_, i) => i !== removeIndex);
    setRewards(updated);
    setShowConfirm(false);
    setRemoveIndex(null);
  };

  const handleUndo = (reward) => {
    const updated = [...rewards];
    updated.splice(reward.originalIndex, 0, reward);
    setRewards(updated);
    setDeletedRewards(deletedRewards.filter(r => r !== reward));
  };

  const handleRemoveDeleted = (reward) => {
    setConfirmRemoveDeleted({ show: true, reward });
  };

  const confirmRemoveDeletedReward = () => {
    setDeletedRewards(deletedRewards.filter(r => r !== confirmRemoveDeleted.reward));
    setConfirmRemoveDeleted({ show: false, reward: null });
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    if (!newReward.count || !newReward.label || !newReward.img) return;
    setRewards([...rewards, { ...newReward, count: Number(newReward.count) }]);
    setNewReward({ count: '', img: '', label: '' });
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Rewards</h2>
      <form className="row justify-content-center mb-4" onSubmit={handleAddReward} style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="col-md-3 mb-2">
          <input type="number" className="form-control" placeholder="Count" value={newReward.count} onChange={e => setNewReward({ ...newReward, count: e.target.value })} required />
        </div>
        <div className="col-md-5 mb-2">
          <input type="text" className="form-control" placeholder="Label" value={newReward.label} onChange={e => setNewReward({ ...newReward, label: e.target.value })} required />
        </div>
        <div className="col-md-3 mb-2">
          <input type="text" className="form-control" placeholder="Image path" value={newReward.img} onChange={e => setNewReward({ ...newReward, img: e.target.value })} required />
        </div>
        <div className="col-md-2 mb-2 d-flex align-items-end">
          <button type="submit" className="btn btn-success btn-lg w-100">Add</button>
        </div>
      </form>
      <div className="row justify-content-center mt-4">
        {rewards.map((r, idx) => (
          <div className="col-md-3 mb-4" key={r.count}>
            <div className="card h-100 p-2 d-flex flex-column justify-content-between" style={{ border: '2px solid #ff2e2e', background: booksRead >= r.count ? '#181818' : '#333', width: '100%', maxWidth: 400 }}>
              <div style={{position: 'relative', width: '100%', maxWidth: 180, margin: '0 auto'}}>
                <img src={r.img} alt={r.label} className="img-fluid mb-2" style={{ maxHeight: 180, objectFit: 'contain', borderRadius: 8, boxShadow: booksRead >= r.count ? '0 0 16px #ff2e2e' : 'none', width: '100%', display: 'block' }} />
                {booksRead < r.count && (
                  <img src={questionMark} alt="hidden" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, zIndex: 2, pointerEvents: 'none', background: 'rgba(0,0,0,0.2)' }} />
                )}
              </div>
              <h5 style={{ color: '#ff2e2e', fontFamily: 'Special Elite, Creepster, serif' }}>{r.label}</h5>
              <div className="d-flex justify-content-center gap-2 mt-3 mt-auto">
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(idx)}>Edit</button>
                <button className="btn btn-primary btn-sm" onClick={() => handleRemove(idx)}>Remove rewards</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmRemove}
        message="Are you sure to remove this rewards?"
      />
      {/* Modal d'édition */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Reward</h5>
                <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close" style={{ filter: 'invert(24%) sepia(99%) saturate(7486%) hue-rotate(357deg) brightness(102%) contrast(119%)', opacity: 1, color: 'red' }}></button>
              </div>
              <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <div className="modal-body">
                  <input type="number" className="form-control mb-2" value={editReward.count} onChange={e => setEditReward({ ...editReward, count: Number(e.target.value) })} placeholder="Count" required />
                  <input type="text" className="form-control mb-2" value={editReward.label} onChange={e => setEditReward({ ...editReward, label: e.target.value })} placeholder="Label" required />
                  <input type="text" className="form-control mb-2" value={editReward.img} onChange={e => setEditReward({ ...editReward, img: e.target.value })} placeholder="Image path" required />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary btn-sm">Save</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {deletedRewards.length > 0 && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
          {deletedRewards.map((reward, idx) => (
            <div key={reward.count + '-' + idx} className="alert alert-warning d-flex align-items-center mb-2" style={{ minWidth: 250 }}>
              <span className="me-auto">Reward supprimée : <b>{reward.label}</b></span>
              <button className="btn btn-sm btn-success ms-2" onClick={() => handleUndo(reward)}>Undo</button>
              <button className="btn btn-sm btn-success ms-2" onClick={() => handleRemoveDeleted(reward)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        show={confirmRemoveDeleted.show}
        onClose={() => setConfirmRemoveDeleted({ show: false, reward: null })}
        onConfirm={confirmRemoveDeletedReward}
        message={confirmRemoveDeleted.reward ? `Are you sure you want to remove definitely this reward "${confirmRemoveDeleted.reward.label}"?` : ''}
      />
    </div>
  );
};

export default Rewards; 