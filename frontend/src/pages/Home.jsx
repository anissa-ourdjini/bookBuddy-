import React from 'react';
import horrorBook from '../assets/image (1).jpg';
import AudioIntro from '../components/AudioIntro';

const Home = () => (
  <div className="container mt-5 text-center">
    <AudioIntro />
    <img
      src={horrorBook}
      alt="Bienvenue dans BuckBuddy"
      className="img-fluid"
      style={{
        maxWidth: '480px',
        width: '100%',
        height: 'auto',
        marginBottom: '1rem',
        marginTop: '-1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 24px #000a',
        objectFit: 'contain'
      }}
    />
    <h1>Dive into horror with BookBuddy</h1>
    <p>Easily manage and track your readings!</p>
  </div>
);

export default Home;
