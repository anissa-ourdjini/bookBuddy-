import React, { useEffect, useRef, useState } from 'react';

const AUDIO_SRC = '/extrait.mp3';

const AudioIntro = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onLoadedMetadata = () => {
        audio.currentTime = 240;
      };
      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      return () => audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    }
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handlePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div onClick={handlePlay} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:1}} />
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
      {isPlaying && (
        <button
          onClick={handlePause}
          style={{
            position: 'fixed',
            top: 60, // juste sous la navbar
            right: 20,
            zIndex: 2000,
            opacity: 0.5,
            padding: '0.3em 0.7em',
            fontSize: '1.2em',
            background: '#222',
            color: '#ff2e2e',
            border: 'none',
            borderRadius: '50%'
          }}
          title="Pause l'audio"
        >
          ⏸
        </button>
      )}
    </>
  );
};

export default AudioIntro;
