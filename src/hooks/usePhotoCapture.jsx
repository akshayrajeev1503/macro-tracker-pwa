import { useState } from 'react';
export const usePhotoCapture = () => {
  const [photo, setPhoto] = useState(null);
  const capture = dataUrl => setPhoto(dataUrl);
  return { photo, capture };
};
