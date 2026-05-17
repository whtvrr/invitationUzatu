'use client'

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Set default playing state (music should be on by default)
    setIsPlaying(true);

    // Multiple autoplay attempts
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        localStorage.setItem('samal_music', 'true');
      } catch (error) {
        console.log('Initial autoplay blocked:', error);
        // Still show as playing so user knows music should be on
        setIsPlaying(true);
      }
    };

    // Try autoplay as soon as possible
    if (audio.readyState >= 2) {
      attemptAutoplay();
    } else {
      audio.addEventListener('loadeddata', attemptAutoplay);
      audio.addEventListener('canplaythrough', attemptAutoplay);
    }

    setIsLoaded(true);

    // Try autoplay on any user interaction
    const startOnInteraction = () => {
      if (!audio.paused) return;
      audio.play().catch(() => {});
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
    };

    document.addEventListener('click', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);
    document.addEventListener('touchstart', startOnInteraction);

    // Clean up on unmount
    return () => {
      audio.removeEventListener('loadeddata', attemptAutoplay);
      audio.removeEventListener('canplaythrough', attemptAutoplay);
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Play prevented:', error);
        // Don't set to false immediately, let user interaction handle it
      });
    } else {
      audioRef.current.pause();
    }

    localStorage.setItem('samal_music', isPlaying.toString());
  }, [isPlaying, isLoaded]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) return null;

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 left-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-accent/40 flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-300"
      title={isPlaying ? 'Музыканы өшіру' : 'Музыканы қосу'}
      style={{
        borderColor: 'var(--accent)',
      }}
    >
      {!isLoaded ? (
        <div className="w-5 h-5 border-2 border-accent2 border-t-transparent rounded-full animate-spin"></div>
      ) : isPlaying ? (
        // Pause icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: 'var(--accent2)' }}
        >
          <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1"/>
          <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1"/>
        </svg>
      ) : (
        // Play icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: 'var(--accent2)' }}
        >
          <polygon
            points="8,5 19,12 8,19"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}