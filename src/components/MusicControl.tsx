'use client'

import { useMusic } from '@/hooks/useMusic';

export default function MusicControl() {
  const { isPlaying, toggleMusic, isLoaded } = useMusic();

  return (
    <button
      onClick={toggleMusic}
      disabled={!isLoaded}
      className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-accent hover:bg-white/90 transition-all duration-300 flex items-center justify-center shadow-lg"
      style={{
        borderColor: 'var(--accent)',
      }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {!isLoaded ? (
        <div className="w-5 h-5 border-2 border-accent2 border-t-transparent rounded-full animate-spin"></div>
      ) : isPlaying ? (
        // Pause icon
        <svg
          width="18"
          height="18"
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
          width="18"
          height="18"
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