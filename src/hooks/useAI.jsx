import { useContext } from 'react';
import { AIContext } from '../components/AI/AIProvider';
export const useAI = () => {
  const { getMacros } = useContext(AIContext);
  return { getMacros };
};
