// src/components/Auth/GeminiModelSelector.jsx
import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const MODELS = [
  'gemini-2.5-pro',
  'gemini-2.5-flash'
];

export default function GeminiModelSelector() {
  const [model, setModel] = useLocalStorage('GEMINI_MODEL', MODELS[0]);

  return (
    <div>
      <h3>Gemini Model</h3>
      <select value={model} onChange={e => setModel(e.target.value)}>
        {MODELS.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
