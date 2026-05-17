'use client'

import { useEffect, useRef } from 'react';
import audioManager from '@/lib/audioManager';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Register the audio element with the manager
      audioManager.setAudioElement(audioRef.current);
      console.log('🎵 BackgroundAudio registered with manager');
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music.mp3"
      preload="auto"
      loop
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: 'none'
      }}
    />
  );
}