export const openAIClient = (apiKey, model) => ({
  async getMacros({ image, description }) {
    if (!apiKey) throw new Error('Set your OpenAI API key in Settings');

    const messages = [
      {
        role: 'system',
        content: `You are a nutrition expert. Given the image and optional user description, return strictly a JSON object with: calories, protein, carbs, fats (numbers). No extra text.`
      },
      description && {
        role: 'user',
        content: description
      },
      image && {
        role: 'user',
        content: image
      }
    ].filter(Boolean); // removes null items

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model, messages })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error('OpenAI error: ' + errText);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('OpenAI responded with non-JSON', text);
      throw new Error('Invalid JSON response from OpenAI');
    }
  }
});


// src/components/AI/aiClients.js
import { GoogleGenAI } from '@google/genai';

export const geminiClient = (apiKey, model) => {
  const ai = new GoogleGenAI({ apiKey });

  return {
    async getMacros({ image, description }) {
      if (!apiKey) throw new Error('Set your Gemini API key in Settings');

      const base64 = image.split(',')[1];
      const contents = [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64 } }
          ]
        },
        {
          role: 'user',
          parts: [
            { text: `You are a nutrition expert. Given the image and optional user description: ${description || ''}, return strictly a JSON object with: calories, protein, carbs, fats (numbers). No extra text or code fences.` }
          ]
        }
      ];

      const response = await ai.models.generateContent({ model, contents });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
      if (!part) throw new Error('No text returned from Gemini');

      // Extract and clean JSON—strip markdown code fences if present
      const cleaned = part
        .replace(/```json\s*([\s\S]*?)```/i, '$1')  // strip ```json ... ```
        .replace(/```([\s\S]*?)```/, '$1')          // strip generic ``` ```
        .trim();

      try {
        return JSON.parse(cleaned);
      } catch (e) {
        console.error('Cleaned Gemin response:', cleaned);
        throw new Error('Invalid JSON from Gemini');
      }
    }
  };
};