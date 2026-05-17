'use client'

import { useState, useEffect } from 'react';
import audioManager from '@/lib/audioManager';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    // Subscribe to audio manager state changes
    const unsubscribe = audioManager.onStateChange((playing) => {
      setIsPlaying(playing);
      localStorage.setItem('samal_music', playing.toString());
    });

    // Initialize state from audio manager
    setIsPlaying(audioManager.isPlaying);

    // Always set loaded to true since audio manager handles initialization
    setIsLoaded(true);

    // Mark as appeared after initial animation completes
    const timer = setTimeout(() => {
      setHasAppeared(true);
    }, 700);

    console.log('🎵 MusicPlayer connected to AudioManager', {
      isInitialized: audioManager.isInitialized,
      isPlaying: audioManager.isPlaying
    });

    // Cleanup subscription on unmount
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const toggleMusic = () => {
    console.log('🎵 Music toggle clicked');
    audioManager.toggle();
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-6 left-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-accent/40 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 ${
        isPlaying ? 'animate-pulse shadow-xl' : ''
      }`}
      title={isPlaying ? 'Музыканы өшіру' : 'Музыканы қосу'}
      style={{
        borderColor: 'var(--accent)',
        animation: isPlaying
          ? 'musicPulse 2s ease-in-out infinite'
          : (hasAppeared ? 'none' : 'slideIn 0.6s ease-out'),
        boxShadow: isPlaying
          ? '0 12px 40px rgba(243, 195, 178, 0.4), 0 0 20px rgba(243, 195, 178, 0.3)'
          : '0 8px 24px rgba(139, 111, 63, 0.15)',
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