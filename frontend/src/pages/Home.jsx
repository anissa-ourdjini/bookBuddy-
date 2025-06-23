import React from 'react';
import itChapterTwo from '../assets/it-chapter-two.jpg';

const Home = () => (
  <div className="container mt-5 text-center">
    <img src={itChapterTwo} alt="IT Chapter Two" style={{maxWidth: '480px', width: '100%', height: 'auto', marginBottom: '1rem', marginTop: '-1.5rem', borderRadius: '12px', boxShadow: '0 4px 24px #000a', objectFit: 'contain'}} />
    <h1>Plongez dans l'horreur avec BookBuddy </h1>
    <p>Gérez et suivez vos lectures facilement !</p>
  </div>
);

export default Home;
