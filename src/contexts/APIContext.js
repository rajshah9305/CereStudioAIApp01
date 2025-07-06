import React, { createContext, useContext, useState, useEffect } from 'react';

const APIContext = createContext();

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};

export const APIProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isAPIKeyRequired, setIsAPIKeyRequired] = useState(true);

  useEffect(() => {
    setIsAPIKeyRequired(!apiKey);
  }, [apiKey]);

  const setAPIKey = (key) => {
    setApiKey(key);
    setIsAPIKeyRequired(false);
  };

  const clearAPIKey = () => {
    setApiKey('');
    setIsAPIKeyRequired(true);
  };

  const callCerebrasAPI = async (messages, options = {}) => {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    const {
      model = 'llama3.1-8b',
      max_tokens = 1000,
      temperature = 0.7,
      ...otherOptions
    } = options;
    try {
      const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens,
          temperature,
          ...otherOptions
        })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API call failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Cerebras API call failed:', error);
      throw error;
    }
  };

  const value = {
    apiKey,
    setAPIKey,
    clearAPIKey,
    isAPIKeyRequired,
    callCerebrasAPI
  };

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  );
}; 