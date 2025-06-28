import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { EyeIcon, EyeOffIcon, PencilIcon } from 'lucide-react';

export default function OpenAIKeyManager({ required }) {
  const [storedKey, setStoredKey] = useLocalStorage('OPENAI_API_KEY', '');
  const [temp, setTemp] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  // Sync `temp` state with `storedKey` whenever `storedKey` changes
  useEffect(() => {
    if (!isEditing) {
      setTemp(storedKey || '');
    }
  }, [storedKey, isEditing]);

  // Validate input
  useEffect(() => {
    if (required && !temp.trim() && isEditing) {
      setError('This field is required for the selected provider.');
    } else {
      setError('');
    }
  }, [temp, required, isEditing]);

  const handleSave = () => {
    if (!temp.trim() && required) {
      setError('API key is required.');
      return;
    }
    setStoredKey(temp.trim());
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTemp(storedKey || '');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">
        OPENAI API Key {required && <span className="text-red-500">*</span>}
      </h3>
      {isEditing ? (
        <div className="relative mb-4">
          <input
            type={show ? 'text' : 'password'}
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder={required ? 'Enter OPENAI API Key' : 'Optional'}
            className={`w-full px-4 py-2 text-base border rounded-lg focus:ring focus:outline-none ${
              error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'
            }`}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {show ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg mb-4">
          <span className="text-gray-600">{storedKey ? '************' : 'No API Key Saved'}</span>
          <button
            type="button"
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      {isEditing && (
        <button
          onClick={handleSave}
          disabled={required && !temp.trim()}
          className={`w-full py-2 text-white font-medium rounded-lg transition ${
            required && !temp.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Save API Key
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="text-gray-500 text-xs mt-4">
        API keys are stored locally and never shared.
      </p>
    </div>
  );
}
