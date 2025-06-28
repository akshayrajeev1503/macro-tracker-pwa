export const loadEntries = () => {
  const raw = localStorage.getItem('ENTRIES');
  return raw ? JSON.parse(raw) : {};
};
export const saveEntries = (entries) => {
  localStorage.setItem('ENTRIES', JSON.stringify(entries));
};
export const addEntry = (dateKey, entry) => {
  const all = loadEntries();
  all[dateKey] = entry;
  saveEntries(all);
};
