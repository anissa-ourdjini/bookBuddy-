import React from 'react';
import cw from '../assets/cw.jpg';
import M from '../assets/M.jpg';
import rl from '../assets/rl.png';
import mh from '../assets/mh.jpg';
import ConfirmModal from '../components/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const rewards = [
  { count: 50, img: cw, label: '50 books read' },
  { count: 100, img: M, label: '100 books read' },
  { count: 150, img: rl, label: '150 books read' },
  { count: 300, img: mh, label: '300 books read - Maître de l\'horreur' },
];

const Rewards = () => {
  const [editIndex, setEditIndex] = React.useState(null);
  const [editReward, setEditReward] = React.useState({ count: '', img: '', label: '' });
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [removeIndex, setRemoveIndex] = React.useState(null);
  const [rewardsList, setRewardsList] = React.useState(rewards);
  const booksRead = 300; // À remplacer par la vraie valeur utilisateur
  const [newReward, setNewReward] = React.useState({ count: '', img: '', label: '' });
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditReward({ ...rewardsList[idx] });
  };

  const handleSave = () => {
    const updated = [...rewardsList];
    updated[editIndex] = { ...editReward };
    setRewardsList(updated);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleRemove = (idx) => {
    setRemoveIndex(idx);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    const updated = rewardsList.filter((_, i) => i !== removeIndex);
    setRewardsList(updated);
    setShowConfirm(false);
    setRemoveIndex(null);
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    if (!newReward.count || !newReward.label || !newReward.img) return;
    setRewardsList([...rewardsList, { ...newReward, count: Number(newReward.count) }]);
    setNewReward({ count: '', img: '', label: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (checkingAuth) return null;

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
        {rewardsList.map((r, idx) => (
          <div className="col-md-3 mb-4" key={r.count}>
            <div className="card h-100 p-2" style={{ border: booksRead >= r.count ? '2px solid #ff2e2e' : '2px solid #888', background: booksRead >= r.count ? '#181818' : '#333' }}>
              {editIndex === idx ? (
                <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                  <input type="number" className="form-control mb-2" value={editReward.count} onChange={e => setEditReward({ ...editReward, count: Number(e.target.value) })} placeholder="Count" required />
                  <input type="text" className="form-control mb-2" value={editReward.label} onChange={e => setEditReward({ ...editReward, label: e.target.value })} placeholder="Label" required />
                  {/* Pour l'image, on garde le champ texte pour la démo */}
                  <input type="text" className="form-control mb-2" value={editReward.img} onChange={e => setEditReward({ ...editReward, img: e.target.value })} placeholder="Image path" required />
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    <button type="button" className="btn btn-secondary btn-sm" style={{ fontFamily: 'Special Elite, Creepster, serif' }} onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <img src={r.img} alt={r.label} className="img-fluid mb-2" style={{ maxHeight: 180, objectFit: 'contain', borderRadius: 8, boxShadow: booksRead >= r.count ? '0 0 16px #ff2e2e' : 'none' }} />
                  <h5 style={{ color: booksRead >= r.count ? '#ff2e2e' : '#aaa', fontFamily: 'Special Elite, Creepster, serif' }}>{r.label}</h5>
                  {r.count === 300 && booksRead >= 300 && (
                    <div className="mt-2" style={{ color: '#ff2e2e', fontWeight: 'bold', fontSize: '1.2em' }}>
                      Maître de l'horreur
                    </div>
                  )}
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(idx)}>Edit</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleRemove(idx)}>Remove</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmRemove}
        message="Are you sure to remove this award?"
      />
    </div>
  );
};

export default Rewards; 