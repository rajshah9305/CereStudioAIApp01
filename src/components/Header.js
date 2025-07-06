import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ children }) => {
  const location = useLocation();
  const isStudioPage = location.pathname.includes('/studio/');

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 sm:px-6 py-4 sticky top-0 z-20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isStudioPage && (
            <Link 
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">CereStudio AI</h1>
              <p className="text-xs sm:text-sm text-gray-600">AI-Powered Creative Studio</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {children}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;