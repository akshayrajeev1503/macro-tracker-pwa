// src/components/AI/AIProvider.jsx
import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { openAIClient, geminiClient } from './aiClients';

export const AIContext = createContext();

export default function AIProvider({ children }) {
  const [provider] = useLocalStorage('AI_PROVIDER', 'openai');
  const [openAIKey] = useLocalStorage('OPENAI_API_KEY');
  const [openAIModel] = useLocalStorage('OPENAI_MODEL', 'gpt-4o');
  const [geminiKey] = useLocalStorage('GEMINI_API_KEY');
  const [geminiModel] = useLocalStorage('GEMINI_MODEL', 'gemini-2.5-pro');

  const client = useMemo(() => {
    if (provider === 'openai') {
      if (!openAIKey) throw new Error('OpenAI API key is required for OpenAI provider');
      return openAIClient(openAIKey, openAIModel);
    } else {
      if (!geminiKey) throw new Error('Gemini API key is required for Gemini provider');
      return geminiClient(geminiKey, geminiModel);
    }
  }, [provider, openAIKey, openAIModel, geminiKey, geminiModel]);

  return (
    <AIContext.Provider value={{ getMacros: client.getMacros, provider }}>
      {children}
    </AIContext.Provider>
  );
}
