'use client'

import { useState, useEffect, useRef } from 'react';
import audioManager from '@/lib/audioManager';

interface InvitationOverlayProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function InvitationOverlay({ onVisibilityChange }: InvitationOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isActivatedRef = useRef(false);

  useEffect(() => {
    // Notify parent of visibility state
    onVisibilityChange?.(showOverlay);
  }, [showOverlay, onVisibilityChange]);

  // Use native event listener for autoplay compliance
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleNativeClick = () => {
      // Prevent multiple clicks
      if (isActivatedRef.current) return;
      isActivatedRef.current = true;

      // Play audio synchronously via audio manager
      // The audio element is in BackgroundAudio component (always rendered)
      audioManager.playImmediately();

      // State updates after play
      setIsActivated(true);
      setIsAnimating(true);

      // Hide overlay after animation
      setTimeout(() => {
        setShowOverlay(false);
      }, 2800);
    };

    button.addEventListener('click', handleNativeClick);

    return () => {
      button.removeEventListener('click', handleNativeClick);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-[2500ms] ease-out"
      style={{
        background: isAnimating ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: isAnimating ? 'blur(0px)' : 'blur(8px)',
        WebkitBackdropFilter: isAnimating ? 'blur(0px)' : 'blur(8px)',
      }}
    >
      {/* Modal Card */}
      <div
        className="relative max-w-md mx-4 text-center p-12 rounded-2xl transition-all duration-1000 ease-out"
        style={{
          background: 'var(--card)',
          boxShadow: '0 24px 80px rgba(139, 111, 63, 0.15)',
          border: '1px solid var(--border)',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'scale(0.9) translateY(20px)' : 'scale(1) translateY(0)',
        }}
      >
        {/* Main text */}
        <div
          className="mb-8"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 'clamp(22px, 5vw, 28px)',
            fontWeight: 500,
            color: 'var(--text)',
            letterSpacing: '1px',
            lineHeight: 1.4
          }}
        >
          Шақыруды ашу үшін басыңыз
        </div>

        {/* Open Button */}
        <button
          ref={buttonRef}
          disabled={isActivated}
          className={`px-8 py-3 rounded-full transition-all duration-300 ${
            isActivated ? 'scale-95 opacity-70' : 'hover:scale-105'
          }`}
          style={{
            background: isActivated
              ? 'linear-gradient(135deg, #ccc 0%, #999 100%)'
              : 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
            color: 'var(--text)',
            fontFamily: 'Jost',
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '1px',
            border: 'none',
            boxShadow: isActivated
              ? '0 4px 12px rgba(0, 0, 0, 0.1)'
              : '0 8px 24px rgba(243, 195, 178, 0.3)',
            WebkitTapHighlightColor: 'transparent',
            cursor: isActivated ? 'not-allowed' : 'pointer'
          }}
        >
          {isActivated ? 'Ашылды...' : 'Ашу'}
        </button>
      </div>
    </div>
  );
}