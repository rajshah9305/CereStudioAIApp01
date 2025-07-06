import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

const APIKeyModal = ({ isOpen, onSubmit, onClose, canClose = false }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async () => {
    if (!apiKey.trim()) return;
    setIsValidating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit(apiKey.trim());
    } catch (error) {
      alert('Invalid API key. Please check and try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">API Key Required</h2>
            <p className="text-sm text-gray-600">Enter your Cerebras API key to continue</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cerebras API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your Cerebras API key..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                autoFocus
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <strong>Need an API key?</strong> Get one from{' '}
              <a 
                href="https://cerebras.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-600"
              >
                cerebras.ai
              </a>
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            {canClose && (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!apiKey.trim() || isValidating}
              className={`${canClose ? 'flex-1' : 'w-full'} px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2`}
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Validating...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIKeyModal; 