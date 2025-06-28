// src/components/Auth/GeminiKeyManager.jsx
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function OpenAIKeyManager({ required }) {
  const [key, setKey] = useLocalStorage('OPENAI_API_KEY');
  const [temp, setTemp] = useState(key || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (required && !temp) setError('Required for selected provider');
    else setError('');
  }, [temp, required]);

  const save = () => setKey(temp);

  return (
    <div>
      <h3>Gemini API Key {required && '*'}</h3>
      <input
        type="password"
        value={temp}
        onChange={e => setTemp(e.target.value)}
        placeholder={required ? 'Required' : 'Optional'}
      />
      <button onClick={save} disabled={required && !temp}>
        Save
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
