import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudioInterface = ({ studioType, onGenerate, isLoading, response, error }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="card p-6 bg-white/90 rounded-xl shadow-lg max-w-2xl mx-auto w-full"
    >
      <h2 className="text-2xl font-bold mb-4 capitalize text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {studioType} Studio
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="input-field w-full mb-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 transition"
          rows={6}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <button
          type="submit"
          className="btn-primary px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {response && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 border rounded p-4 mt-4"
        >
          <h3 className="font-semibold mb-2 text-gray-800">Generated Content</h3>
          <div className="whitespace-pre-wrap text-gray-700">{response}</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudioInterface;