'use client'

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Load saved state
    const savedState = localStorage.getItem('samal_music');
    if (savedState === 'true') {
      setIsPlaying(true);
    }

    setIsLoaded(true);

    // Clean up on unmount
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }

    localStorage.setItem('samal_music', isPlaying.toString());
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) return null;

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 left-6 z-50 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-accent/30 flex items-center justify-center hover:bg-white transition-all duration-200"
      title={isPlaying ? 'Музыканы өшіру / Выключить музыку' : 'Музыканы қосу / Включить музыку'}
    >
      {isPlaying ? (
        <div className="flex space-x-0.5">
          <div className="w-0.5 h-3 bg-accent2 rounded-full animate-bounce-slow"></div>
          <div className="w-0.5 h-3 bg-accent2 rounded-full animate-bounce-slow" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-0.5 h-3 bg-accent2 rounded-full animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
        </div>
      ) : (
        <div className="w-3 h-3 border border-accent2 rounded-full relative">
          <div className="absolute inset-0 rotate-45">
            <div className="w-full h-0.5 bg-accent2 absolute top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
      )}
    </button>
  );
}