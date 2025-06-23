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

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Mes récompenses</h2>
      {rewards.length === 0 && <div>Aucune récompense débloquée.</div>}
      <ul>
        {rewards.map(r => (
          <li key={r._id} style={{ marginBottom: 12 }}>
            <b>{r.title}</b> <br />
            <span>{r.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;
