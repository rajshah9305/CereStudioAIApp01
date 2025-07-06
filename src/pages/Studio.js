import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAPI } from '../contexts/APIContext';
import StudioInterface from '../components/studios/StudioInterface';
import APIKeyModal from '../components/auth/APIKeyModal';

const Studio = () => {
  const { studioType } = useParams();
  const { apiKey, setAPIKey, callCerebrasAPI } = useAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [showAPIModal, setShowAPIModal] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState(null);

  const validStudios = ['text', 'code', 'document', 'creative'];
  if (!validStudios.includes(studioType)) {
    return <Navigate to="/" replace />;
  }

  const handleGenerate = async (prompt, options = {}) => {
    if (!prompt.trim()) return;
    if (!apiKey) {
      setPendingPrompt({ prompt, options });
      setShowAPIModal(true);
      return;
    }
    setIsLoading(true);
    setError('');
    setResponse('');
    try {
      const messages = [
        { role: 'system', content: getSystemPrompt(studioType) },
        { role: 'user', content: prompt }
      ];
      const result = await callCerebrasAPI(messages, options);
      setResponse(result.choices[0]?.message?.content || 'No response generated');
    } catch (err) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAPIKeySubmit = (key) => {
    setAPIKey(key);
    setShowAPIModal(false);
    if (pendingPrompt) {
      handleGenerate(pendingPrompt.prompt, pendingPrompt.options);
      setPendingPrompt(null);
    }
  };

  const getSystemPrompt = (type) => {
    const prompts = {
      text: 'You are a professional content writer. Create compelling, well-structured content based on the user\'s request.',
      code: 'You are an expert programmer. Write clean, efficient, and well-documented code based on the user\'s requirements.',
      document: 'You are a document analysis expert. Analyze and process documents intelligently, providing insights and summaries.',
      creative: 'You are a creative writing assistant. Help users create engaging stories, poetry, scripts, and other creative content.'
    };
    return prompts[type] || prompts.text;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <StudioInterface
        studioType={studioType}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        response={response}
        error={error}
      />
      <APIKeyModal
        isOpen={showAPIModal}
        onSubmit={handleAPIKeySubmit}
        onClose={() => setShowAPIModal(false)}
        canClose={true}
      />
    </div>
  );
};

export default Studio;
