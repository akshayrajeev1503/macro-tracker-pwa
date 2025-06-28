// CameraCapture.jsx
import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';

export default function CameraCapture({ onCapture }) {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const takePhoto = () => {
    const photo = camera.current.takePhoto();
    setImage(photo);
    onCapture(photo);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Camera ref={camera} style={{ width: '100%', height: '100%' }} />
      <button
        onClick={takePhoto}
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
        }}
      >
        📸 Capture
      </button>
    </div>
  );
}
