import React, { useState } from 'react';
import { usePhotoCapture } from '../hooks/usePhotoCapture';
import CameraCapture from '../components/Camera/CameraCapture';
import PhotoUpload from '../components/Camera/PhotoUpload';
import { useAI } from '../hooks/useAI';
import { addEntry } from '../services/storageService';

export default function Home() {
  const [mode, setMode] = useState(null); // null | 'camera' | 'upload'
  const [description, setDescription] = useState('');
  const { photo, capture } = usePhotoCapture();
  const { getMacros } = useAI();
  const [processing, setProcessing] = useState(false);

  const process = async () => {
    if (!photo) return;
    setProcessing(true);
    try {
      const now = new Date();
      const dateKey = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
      ].join('-');
      const macroInput = { image: photo, description };
      let macros = null;
      try {
        macros = await getMacros({ image: photo, description });
      } catch (e) {
        alert(e.message); // e.g., "OpenAI API key is required..."
        setProcessing(false);
        return;
      }
      addEntry(dateKey, { image: photo, macros });
      alert('Saved for ' + dateKey);
      capture(null);
      setMode(null);
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Error processing image: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2>Home</h2>

      {/* Mode selection buttons */}
      {!mode && (
        <div>
          <button onClick={() => setMode('camera')}>Use Camera</button>
          <button onClick={() => setMode('upload')} style={{ marginLeft: 8 }}>
            Upload Photo
          </button>
        </div>
      )}

      {/* Camera or upload UI */}
      {mode === 'camera' && !photo && <CameraCapture onCapture={capture} />}
      {mode === 'upload' && !photo && <PhotoUpload onUpload={capture} />}

      {/* After image is selected */}
      {photo && (
        <>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the food (e.g. 'half a bowl of tomato soup')"
            rows={2}
            style={{ width: '100%', marginTop: '1rem' }}
          />
          <div style={{ marginTop: '1rem' }}>
            <button onClick={process} disabled={processing}>
              {processing ? 'Analyzing...' : 'Analyze & Save'}
            </button>
            <button
              onClick={() => {
                capture(null);
                setMode(null);
                setDescription('');
              }}
              disabled={processing}
              style={{ marginLeft: '1rem' }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
