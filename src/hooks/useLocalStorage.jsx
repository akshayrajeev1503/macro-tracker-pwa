import { useState } from 'react';
export const useLocalStorage = (key, defaultValue = '') => {
  const [value, setValue] = useState(() => localStorage.getItem(key) || defaultValue);
  const save = v => {
    setValue(v);
    localStorage.setItem(key, v);
  };
  return [value, save];
};
