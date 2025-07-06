import React, { useState } from 'react';
import { Settings, Key, RefreshCw, Trash2 } from 'lucide-react';

const APIKeyManager = ({ currentKey, onUpdateKey, onClearKey }) => {
  const [showManager, setShowManager] = useState(false);
  const maskedKey = currentKey ? `${currentKey.slice(0, 8)}...${currentKey.slice(-4)}` : 'Not set';
  return (
    <div className="relative">
      <button
        onClick={() => setShowManager(!showManager)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        <Key className="w-4 h-4" />
        <span className="hidden sm:inline">API Key:</span>
        <span className="font-mono">{maskedKey}</span>
        <Settings className="w-4 h-4" />
      </button>
      {showManager && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowManager(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 z-20">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Key Management
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onUpdateKey();
                  setShowManager(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Update API Key
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear the API key? You will need to enter it again.')) {
                    onClearKey();
                    setShowManager(false);
                  }
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear API Key
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Your API key is stored temporarily in memory and will be cleared when you close the browser.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default APIKeyManager; 