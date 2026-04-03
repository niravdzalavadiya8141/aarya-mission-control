import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useSettingsStore } from '../store/useSettingsStore';

export const useAudio = (src: string, options: any = {}) => {
  const { ambientAudio } = useSettingsStore();
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      volume: options.volume || 0.5,
      loop: options.loop || false,
      ...options,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, [src]);

  useEffect(() => {
    if (soundRef.current) {
      if (ambientAudio) {
        soundRef.current.play();
      } else {
        soundRef.current.pause();
      }
    }
  }, [ambientAudio]);

  return soundRef.current;
};
