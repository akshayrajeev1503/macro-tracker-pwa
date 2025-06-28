import React, { useState } from 'react';
import { usePhotoCapture } from '../hooks/usePhotoCapture';
import CameraCapture from '../components/Camera/CameraCapture';
import PhotoUpload from '../components/Camera/PhotoUpload';
import { useAI } from '../hooks/useAI';
import { addEntry } from '../services/storageService';

export default function Home() {
  const [mode, setMode] = useState(null); // 'camera' | 'upload' | null
  const [description, setDescription] = useState('');
  const { photo, capture } = usePhotoCapture();
  const { getMacros, provider, keyPresent } = useAI();
  const [processing, setProcessing] = useState(false);

  const process = async () => {
    if (!photo) return;

    if (!keyPresent) {
      alert(`⚠️ No API key found for ${provider}. Please set it in Settings.`);
      return;
    }

    setProcessing(true);

    try {
      const now = new Date();
      const dateKey = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
      ].join('-');

      let macros;
      try {
        macros = await getMacros({ image: photo, description });
      } catch (e) {
        alert(e.message);
        return;
      }

      addEntry(dateKey, { image: photo, macros });
      alert(`✅ Saved entry for ${dateKey}`);

      capture(null);
      setMode(null);
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Unexpected error: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2>Home</h2>

      {!keyPresent && (
        <p style={{ color: 'orange', marginBottom: '1rem' }}>
          ⚠️ Please add your API key in Settings before proceeding.
        </p>
      )}

      {!mode && !photo && keyPresent && (
        <div>
          <button onClick={() => setMode('camera')}>Use Camera</button>
          <button onClick={() => setMode('upload')} style={{ marginLeft: 8 }}>
            Upload Photo
          </button>
        </div>
      )}

      {mode === 'camera' && !photo && (
        <CameraCapture onCapture={capture} />
      )}
      {mode === 'upload' && !photo && (
        <PhotoUpload onUpload={capture} />
      )}

      {photo && keyPresent && (
        <>
          <img
            src={photo}
            alt="Selected"
            style={{ maxWidth: '100%', marginTop: '1rem', borderRadius: 4 }}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the food (e.g. 'half a bowl of tomato soup')"
            rows={2}
            style={{ width: '100%', marginTop: '1rem' }}
          />

          <div style={{ marginTop: '1rem' }}>
            <button onClick={process} disabled={processing || !keyPresent}>
              {processing ? 'Analyzing...' : 'Analyze & Save'}
            </button>
            <button
              onClick={() => {
                capture(null);
                setMode(null);
                setDescription('');
              }}
              disabled={processing}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
