// src/pages/Settings.jsx
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import GeminiKeyManager from '../components/Auth/GeminiKeyManager';
import GeminiModelSelector from '../components/Auth/GeminiModelSelector';
import OpenAIKeyManager from '../components/Auth/OpenAIKeyManager';
import OpenAIModelSelector from '../components/Auth/OpenAIModelSelector';

export default function Settings() {
  const [provider, setProvider] = useLocalStorage('AI_PROVIDER', 'gemini');

  return (
    <div>
      <h2>Settings</h2>

      <h3>Select AI Provider</h3>
      <select value={provider} onChange={e => setProvider(e.target.value)}>
        <option value="openai">OpenAI</option>
        <option value="gemini">Gemini</option>
      </select>

      <hr />

      {provider === 'gemini' ? (
        <>
          <GeminiKeyManager required />
          <GeminiModelSelector />
        </>
      ) : (
        <>
          <OpenAIKeyManager required />
          <OpenAIModelSelector />
        </>
      )}

      <hr />
      <p>API keys are stored locally and never shared.</p>
    </div>
  );
}
