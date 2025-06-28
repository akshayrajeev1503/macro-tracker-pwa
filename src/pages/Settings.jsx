// src/pages/Settings.jsx
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import GeminiKeyManager from '../components/Auth/GeminiKeyManager';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function Settings() {
  const [provider, setProvider] = useLocalStorage('AI_PROVIDER', 'gemini');
  const [geminiModel, setGeminiModel] = useLocalStorage('GEMINI_MODEL', 'gemini-2.5-pro');
  const [openAIKey, setOpenAIKey] = useLocalStorage('OPENAI_API_KEY', '');
  const [openAIModel, setOpenAIModel] = useLocalStorage('OPENAI_MODEL', 'gpt-4o');

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Provider</label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
        >
          <option value="openai">OpenAI</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>

      <hr className="my-6" />

      {provider === 'gemini' ? (
        <div>
          <GeminiKeyManager required={true} />
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gemini Model</label>
            <input
              type="text"
              value={geminiModel}
              onChange={(e) => setGeminiModel(e.target.value)}
              placeholder="e.g. gemini-2.5-pro"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="relative mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
            <input
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="Enter OpenAI API Key"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI Model</label>
            <input
              type="text"
              value={openAIModel}
              onChange={(e) => setOpenAIModel(e.target.value)}
              placeholder="e.g. gpt-4o"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
            />
          </div>
        </div>
      )}

      <hr className="my-6" />
      <p className="text-sm text-gray-500">API keys are stored locally and never shared.</p>
    </div>
  );
}
