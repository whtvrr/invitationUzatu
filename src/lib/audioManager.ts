type AudioStateChangeListener = (isPlaying: boolean) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioStateChangeListener> = new Set();
  private _isPlaying: boolean = false;
  private _isInitialized: boolean = false;

  constructor() {
    // Audio element will be registered via setAudioElement after user interaction
    console.log('🎵 AudioManager created (waiting for audio element registration)');
  }

  private notifyListeners(isPlaying: boolean) {
    this.listeners.forEach(listener => {
      try {
        listener(isPlaying);
      } catch (error) {
        console.error('Error in audio state listener:', error);
      }
    });
  }

  public setAudioElement(element: HTMLAudioElement): void {
    console.log('🎵 Setting external audio element');

    // Clean up old audio if exists
    if (this.audio && this.audio !== element) {
      this.audio.pause();
    }

    this.audio = element;
    this.audio.loop = true;
    this.audio.volume = 0.3;

    // Set up event listeners for the external audio element
    this.audio.addEventListener('play', () => {
      this._isPlaying = true;
      this.notifyListeners(true);
    });

    this.audio.addEventListener('pause', () => {
      this._isPlaying = false;
      this.notifyListeners(false);
    });

    this.audio.addEventListener('ended', () => {
      this._isPlaying = false;
      this.notifyListeners(false);
    });

    this._isInitialized = true;
    this._isPlaying = !element.paused;
    this.notifyListeners(this._isPlaying);
  }

  public playImmediately(): void {
    console.log('🔥 IMMEDIATE PLAY requested');

    if (!this.audio) {
      console.error('❌ No audio element available');
      return;
    }

    try {
      this.audio.play().then(() => {
        console.log('✅ Audio playing successfully');
      }).catch(error => {
        console.error('❌ Play failed:', error);
      });

      // Update state immediately
      this._isPlaying = true;
      this.notifyListeners(true);
    } catch (error) {
      console.error('❌ Critical play error:', error);
    }
  }

  public pauseImmediately(): void {
    console.log('⏸️ IMMEDIATE PAUSE requested');

    if (!this.audio) {
      console.error('❌ Audio not initialized');
      return;
    }

    try {
      this.audio.pause();

      // Update state immediately
      this._isPlaying = false;
      this.notifyListeners(false);

      console.log('✅ Audio paused immediately');
    } catch (error) {
      console.error('❌ Critical pause error:', error);
    }
  }

  public toggle(): void {
    if (this._isPlaying) {
      this.pauseImmediately();
    } else {
      this.playImmediately();
    }
  }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  public onStateChange(listener: AudioStateChangeListener): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  public destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
    this.listeners.clear();
    this._isPlaying = false;
    this._isInitialized = false;
    console.log('🗑️ AudioManager destroyed');
  }
}

// Create singleton instance
const audioManager = new AudioManager();

export default audioManager;