export class TimerAudio {
  private static instance: TimerAudio;
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  private constructor() {}

  static getInstance(): TimerAudio {
    if (!TimerAudio.instance) {
      TimerAudio.instance = new TimerAudio();
    }
    return TimerAudio.instance;
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async playLoop(): Promise<void> {
    if (this.isPlaying) return;
    
    try {
      await this.initializeAudioContext();
      
      if (!this.audioContext) {
        throw new Error('AudioContext not initialized');
      }

      this.isPlaying = true;
      
      const playBeep = () => {
        if (!this.isPlaying || !this.audioContext) return;

        // Create and configure oscillator
        this.oscillator = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();
        
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime);
        
        // Configure gain (volume) envelope
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.01);
        this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
        
        // Connect nodes
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        
        // Start and stop the oscillator
        this.oscillator.start(this.audioContext.currentTime);
        this.oscillator.stop(this.audioContext.currentTime + 0.5);
        
        // Schedule next beep
        setTimeout(() => {
          this.cleanup();
          if (this.isPlaying) {
            playBeep();
          }
        }, 1000);
      };

      playBeep();

    } catch (error) {
      console.error('Failed to play audio:', error);
      this.isPlaying = false;
    }
  }

  stop(): void {
    this.isPlaying = false;
    this.cleanup();
  }

  private cleanup(): void {
    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (error) {
        console.log(error);
      }
      this.oscillator = null;
    }

    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }
}