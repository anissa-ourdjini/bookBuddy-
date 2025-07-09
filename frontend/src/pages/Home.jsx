import React from 'react';
import horrorBook from '../assets/image (2).jpg';
import AudioIntro from '../components/AudioIntro';
import questionMark from '../assets/questionMark.png';

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
    <div style={{margin:'2rem 0'}}>
      <h3>Test affichage image questionMark.png</h3>
      <img src={questionMark} alt="test question mark" style={{maxWidth:200, border:'2px solid red'}} />
    </div>
    <h1>Dive into horror with BookBuddy</h1>
    <p>Easily manage and track your readings!</p>
  </div>
);

export default Home;
