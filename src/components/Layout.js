import React from 'react';
import { useAPI } from '../contexts/APIContext';
import APIKeyModal from './auth/APIKeyModal';
import APIKeyManager from './auth/APIKeyManager';
import Header from './Header';
import Scene from './three/Scene';

const Layout = ({ children }) => {
  const { 
    apiKey, 
    setAPIKey, 
    clearAPIKey, 
    isAPIKeyRequired 
  } = useAPI();

  const [showAPIModal, setShowAPIModal] = React.useState(false);

  React.useEffect(() => {
    if (isAPIKeyRequired) {
      setShowAPIModal(true);
    }
  }, [isAPIKeyRequired]);

  const handleAPIKeySubmit = (key) => {
    setAPIKey(key);
    setShowAPIModal(false);
  };

  const handleUpdateAPIKey = () => {
    setShowAPIModal(true);
  };

  const handleClearAPIKey = () => {
    clearAPIKey();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        <Header>
          {apiKey && (
            <APIKeyManager 
              currentKey={apiKey}
              onUpdateKey={handleUpdateAPIKey}
              onClearKey={handleClearAPIKey}
            />
          )}
        </Header>
        <main className="relative">
          {children}
        </main>
      </div>
      {/* API Key Modal */}
      <APIKeyModal 
        isOpen={showAPIModal}
        onSubmit={handleAPIKeySubmit}
        onClose={() => setShowAPIModal(false)}
        canClose={!isAPIKeyRequired}
      />
    </div>
  );
};

export default Layout; 