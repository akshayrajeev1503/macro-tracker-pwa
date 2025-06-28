// src/pages/Settings.jsx
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Settings() {
  const [provider, setProvider] = useLocalStorage('AI_PROVIDER', 'gemini');
  const [geminiKey, setGeminiKey] = useLocalStorage('GEMINI_API_KEY', '');
  const [geminiModel, setGeminiModel] = useLocalStorage('GEMINI_MODEL', 'gemini-2.5-pro');
  const [openAIKey, setOpenAIKey] = useLocalStorage('OPENAI_API_KEY', '');
  const [openAIModel, setOpenAIModel] = useLocalStorage('OPENAI_MODEL', 'gpt-4o');

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
          <label>
            Gemini API Key:
            <input
              type="text"
              value={geminiKey}
              onChange={e => setGeminiKey(e.target.value)}
              placeholder="Enter Gemini API Key"
              required
              style={{ width: '100%' }}
            />
          </label>
          <br />
          <label>
            Gemini Model:
            <input
              type="text"
              value={geminiModel}
              onChange={e => setGeminiModel(e.target.value)}
              placeholder="e.g. gemini-2.5-pro"
              style={{ width: '100%' }}
            />
          </label>
        </>
      ) : (
        <>
          <label>
            OpenAI API Key:
            <input
              type="text"
              value={openAIKey}
              onChange={e => setOpenAIKey(e.target.value)}
              placeholder="Enter OpenAI API Key"
              required
              style={{ width: '100%' }}
            />
          </label>
          <br />
          <label>
            OpenAI Model:
            <input
              type="text"
              value={openAIModel}
              onChange={e => setOpenAIModel(e.target.value)}
              placeholder="e.g. gpt-4o"
              style={{ width: '100%' }}
            />
          </label>
        </>
      )}

      <hr />
      <p>API keys are stored locally and never shared.</p>
    </div>
  );
}