export const analyzeImage = async (getMacros, imageDataUrl) => {
  const macros = await getMacros(imageDataUrl);
  return macros;
};
