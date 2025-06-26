import React, { useEffect, useState } from 'react';

const getToken = () => localStorage.getItem('token');

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      const res = await fetch('/rewards', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setRewards(data);
      setLoading(false);
    };
    fetchRewards();
  }, []);

  if (loading) return <div className="text-center my-4">Chargement...</div>;

  return (
    <div className="mx-auto" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">Mes récompenses</h2>
      {rewards.length === 0 && <div className="alert alert-info">Aucune récompense débloquée.</div>}
      <ul className="list-group">
        {rewards.map(r => (
          <li key={r._id} className="list-group-item mb-2">
            <b>{r.title}</b> <br />
            <span>{r.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;
