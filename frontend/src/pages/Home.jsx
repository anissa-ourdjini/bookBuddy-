import React, { useRef, useState, useEffect } from 'react';
import horrorBook from '../assets/image (2).jpg';
// import AudioIntro from '../components/AudioIntro';
import questionMark from '../assets/questionMark.png';
import videoLivre from '../assets/Vidéo_livre.mp4';

const mediaList = [
  { type: 'video', src: videoLivre },
  { type: 'image', src: horrorBook },
  { type: 'image', src: questionMark },
];

const Home = () => {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('homeVideoVolume');
    return saved !== null ? parseFloat(saved) : 1;
  });
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('homeVideoIsPlaying');
    return saved !== null ? saved === 'true' : true;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('homeVideoVolume', newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    localStorage.setItem('homeVideoIsPlaying', true);
    if (mediaList[currentIndex].type === 'video' && videoRef.current) {
      videoRef.current.play();
    }
    // Démarrage du défilement automatique
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaList.length);
      }, 4000);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    localStorage.setItem('homeVideoIsPlaying', false);
    if (mediaList[currentIndex].type === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Arrêter le défilement auto quand on change d'élément ou quitte la page
  React.useEffect(() => {
    if (!isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, currentIndex]);

  // Synchronise le volume et l'état de lecture à chaque changement
  useEffect(() => {
    if (mediaList[currentIndex].type === 'video' && videoRef.current) {
      videoRef.current.volume = volume;
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentIndex, volume, isPlaying]);

  return (
    <div className="container mt-5 text-center">
      <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
        {mediaList[currentIndex].type === 'video' ? (
          <video
            ref={videoRef}
            src={mediaList[currentIndex].src}
            autoPlay={isPlaying}
            loop
            playsInline
            controls={showControls}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.volume = volume;
                if (isPlaying) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }
            }}
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
        ) : (
          <img
            src={mediaList[currentIndex].src}
            alt="media"
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
        )}
      </div>
      {/* Contrôle du volume et lecture/pause */}
      {mediaList[currentIndex].type === 'video' && (
        <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {/* Boutons lecture/pause supprimés */}
        </div>
      )}
      <p>Easily manage and track your readings!</p>
    </div>
  );
};

export default Home;
