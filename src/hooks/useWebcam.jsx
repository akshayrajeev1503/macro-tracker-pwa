// src/hooks/useWebcam.js
import { useState, useEffect } from 'react';

export const useWebcam = () => {
  const [hasWebcam, setHasWebcam] = useState(false);

  useEffect(() => {
    async function detect() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setHasWebcam(devices.some(d => d.kind === 'videoinput'));
      } catch (e) {
        console.error('Webcam detection failed', e);
        setHasWebcam(false);
      }
    }
    detect();
  }, []);

  return hasWebcam;
};
