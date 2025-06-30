import React from 'react';
import cw from '../assets/cw.jpg';
import M from '../assets/M.jpg';
import rl from '../assets/rl.png';
import mh from '../assets/mh.jpg';

const rewards = [
  { count: 50, img: cw, label: '50 books read' },
  { count: 100, img: M, label: '100 books read' },
  { count: 150, img: rl, label: '150 books read' },
  { count: 300, img: mh, label: '300 books read - Maître de l\'horreur' },
];

const Rewards = () => {
  // Pour la démo, on simule le nombre de livres lus
  const booksRead = 300; // À remplacer par la vraie valeur utilisateur

  return (
    <div className="container mt-5 text-center">
      <h2>Rewards</h2>
      <div className="row justify-content-center mt-4">
        {rewards.map(r => (
          <div className="col-md-3 mb-4" key={r.count}>
            <div className="card h-100 p-2" style={{ border: booksRead >= r.count ? '2px solid #ff2e2e' : '2px solid #888', background: booksRead >= r.count ? '#181818' : '#333' }}>
              <img src={r.img} alt={r.label} className="img-fluid mb-2" style={{ maxHeight: 180, objectFit: 'contain', borderRadius: 8, boxShadow: booksRead >= r.count ? '0 0 16px #ff2e2e' : 'none' }} />
              <h5 style={{ color: booksRead >= r.count ? '#ff2e2e' : '#aaa', fontFamily: 'Special Elite, Creepster, serif' }}>{r.label}</h5>
              {r.count === 300 && booksRead >= 300 && (
                <div className="mt-2" style={{ color: '#ff2e2e', fontWeight: 'bold', fontSize: '1.2em' }}>
                  Maître de l'horreur
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards; 