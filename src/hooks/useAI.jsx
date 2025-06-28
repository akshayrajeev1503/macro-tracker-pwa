// src/hooks/useAI.js
import { useContext } from 'react';
import { AIContext } from '../components/AI/AIProvider';

export const useAI = () => {
  const { getMacros, provider, keyPresent } = useContext(AIContext);
  return { getMacros, provider, keyPresent };
};
