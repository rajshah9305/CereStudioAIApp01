const API_BASE_URL_RAW = localStorage.getItem('apiUrl') || process.env.REACT_APP_API_URL || 'https://api.cerebras.ai/v1';
const API_BASE_URL = API_BASE_URL_RAW.endsWith('/chat/completions') ? API_BASE_URL_RAW : `${API_BASE_URL_RAW.replace(/\/$/, '')}/chat/completions`;
const API_KEY = localStorage.getItem('apiKey') || process.env.REACT_APP_CEREBRAS_API_KEY;

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

async function makeRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new APIError(`API request failed: ${response.statusText}`, response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Network error: ${error.message}`, 0);
  }
}

export async function InvokeLLM(prompt, options = {}) {
  const payload = {
    model: options.model || 'llama-4-scout-17b-16e-instruct',
    messages: [
      { role: 'user', content: prompt }
    ],
    ...options
  };
  // Remove legacy fields if present
  delete payload.prompt;
  delete payload.studio;
  delete payload.maxTokens;
  delete payload.temperature;
  delete payload.topP;

  try {
    const response = await makeRequest('', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    // The chat API returns choices[0].message.content
    return response.choices?.[0]?.message?.content || response.choices?.[0]?.text || response.text || '';
  } catch (error) {
    console.error('LLM invocation failed:', error);
    throw error;
  }
}

export async function generateText(prompt, options = {}) {
  return InvokeLLM(prompt, { ...options, studio: 'text' });
}

export async function generateCode(prompt, options = {}) {
  return InvokeLLM(prompt, { ...options, studio: 'code' });
}

export async function processDocument(content, options = {}) {
  return InvokeLLM(content, { ...options, studio: 'document' });
}

export async function createCreativeContent(prompt, options = {}) {
  return InvokeLLM(prompt, { ...options, studio: 'creative' });
} 