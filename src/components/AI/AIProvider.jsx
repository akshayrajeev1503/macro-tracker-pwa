import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { openAIClient, geminiClient } from './aiClients';

export const AIContext = createContext();

export default function AIProvider({ children }) {
  const [provider] = useLocalStorage('AI_PROVIDER', 'gemini');
  const [openAIKey] = useLocalStorage('OPENAI_API_KEY');
  const [openAIModel] = useLocalStorage('OPENAI_MODEL', 'gpt-4o');
  const [geminiKey] = useLocalStorage('GEMINI_API_KEY');
  const [geminiModel] = useLocalStorage('GEMINI_MODEL', 'gemini-2.5-pro');

  const keyPresent = provider === 'openai'
    ? Boolean(openAIKey?.trim())
    : Boolean(geminiKey?.trim());

  const client = useMemo(() => {
    if (!keyPresent) return null;

    return provider === 'openai'
      ? openAIClient(openAIKey, openAIModel)
      : geminiClient(geminiKey, geminiModel);
  }, [provider, openAIKey, openAIModel, geminiKey, geminiModel, keyPresent]);

  return (
    <AIContext.Provider value={{ getMacros: client?.getMacros, provider, keyPresent }}>
      {children}
    </AIContext.Provider>
  );
}
