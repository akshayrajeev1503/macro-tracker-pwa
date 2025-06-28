import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const MODELS = [
  '3.5 turbo',
  'gpt-4o',
];

export default function OpenAIModelSelector() {
  const [model, setModel] = useLocalStorage('OPENAI_MODEL', MODELS[0]);

  return (
    <div>
      <h3>OpenAI Model</h3>
      <select value={model} onChange={e => setModel(e.target.value)}>
        {MODELS.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}