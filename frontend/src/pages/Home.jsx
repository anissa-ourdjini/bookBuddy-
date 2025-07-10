import React, { useRef, useState } from 'react';
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
  const [volume, setVolume] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
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

  React.useEffect(() => {
    if (mediaList[currentIndex].type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentIndex, isPlaying]);

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
            volume={volume}
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
      <p>Easily manage and track your readings!</p>
    </div>
  );
};

export default Home;
