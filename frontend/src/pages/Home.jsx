import React, { useRef, useState } from 'react';
import horrorBook from '../assets/image (2).jpg';
// import AudioIntro from '../components/AudioIntro';
import questionMark from '../assets/questionMark.png';
import videoLivre from '../assets/Vidéo_livre.mp4';

const Home = () => {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div className="container mt-5 text-center">
      {/* <AudioIntro /> supprimé */}
      <video
        ref={videoRef}
        src={videoLivre}
        autoPlay
        loop
        playsInline
        style={{
          maxWidth: '480px',
          width: '100%',
          height: 'auto',
          marginBottom: '1rem',
          marginTop: '-1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 24px #000a',
          objectFit: 'contain',
          background: '#000'
        }}
      />
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="video-volume" style={{ marginRight: 8, color: '#ff2e2e', fontWeight: 'bold' }}>Volume :</label>
        <input
          id="video-volume"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          style={{ width: 200, accentColor: '#ff2e2e' }}
        />
      </div>
      <p>Easily manage and track your readings!</p>
    </div>
  );
};

export default Home;
