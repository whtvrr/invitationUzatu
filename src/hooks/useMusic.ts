'use client'

import { useState, useRef, useEffect } from 'react';

export function useMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%
    audioRef.current = audio;

    // Auto-play attempt (may be blocked by browser)
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked by browser:', error);
        setIsPlaying(false);
      }
    };

    // Load audio
    audio.addEventListener('loadeddata', () => {
      setIsLoaded(true);
      attemptAutoplay();
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
    });

    audio.addEventListener('play', () => {
      setIsPlaying(true);
    });

    return () => {
      audio.removeEventListener('loadeddata', () => {});
      audio.removeEventListener('ended', () => {});
      audio.removeEventListener('pause', () => {});
      audio.removeEventListener('play', () => {});
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  return { isPlaying, toggleMusic, isLoaded };
}