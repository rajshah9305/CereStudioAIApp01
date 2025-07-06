import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../contexts/APIContext';
import { motion } from 'framer-motion';
import { Sparkles, Code, FileText, PenTool, Lock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { apiKey } = useAPI();

  const studios = [
    {
      id: 'text',
      icon: Sparkles,
      title: 'Text Generation Studio',
      description: 'Create compelling articles, blog posts, and marketing copy',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'code',
      icon: Code,
      title: 'Code Generation Studio', 
      description: 'Write, debug, and optimize code in multiple languages',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'document',
      icon: FileText,
      title: 'Document AI Studio',
      description: 'Analyze and process documents intelligently',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'creative',
      icon: PenTool,
      title: 'Creative Writing Studio',
      description: 'Unleash creativity with AI-powered writing tools',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleStudioSelect = (studioId) => {
    if (!apiKey) return;
    navigate(`/studio/${studioId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Creative Studio
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our AI-powered studios to enhance your creativity and productivity.
          Each studio is designed to help you create exceptional content.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {studios.map((studio, index) => (
          <motion.div
            key={studio.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleStudioSelect(studio.id)}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
              !apiKey 
                ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                : 'border-gray-200 hover:border-purple-300 hover:shadow-lg bg-white/80 backdrop-blur-sm'
            }`}
          >
            {!apiKey && (
              <div className="absolute top-4 right-4">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            )}
            <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all ${
              !apiKey ? 'bg-gray-200' : `bg-gradient-to-br ${studio.color} group-hover:scale-110`
            }`}>
              <studio.icon className={`w-6 h-6 ${!apiKey ? 'text-gray-400' : 'text-white'}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${!apiKey ? 'text-gray-400' : 'text-gray-900'}`}>
              {studio.title}
            </h3>
            <p className={`text-sm ${!apiKey ? 'text-gray-400' : 'text-gray-600'}`}>
              {studio.description}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Status Banner */}
      {!apiKey ? (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center"
        >
          <p className="text-yellow-800 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Please provide your Cerebras API key to access the studios.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
        >
          <p className="text-green-800">
            ✓ API key configured. All studios are ready to use!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard; 