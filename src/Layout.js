import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from './components/three/Scene';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

const navItems = [
  { name: 'Dashboard', href: createPageUrl('dashboard') },
  { name: 'Studios', href: createPageUrl('studios') },
  { name: 'Projects', href: createPageUrl('projects') }
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={createPageUrl('dashboard')} className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center"
            >
              <BrainCircuit className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-black text-black">Cerebras Studio</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-orange-500 relative ${
                  location.pathname === item.href ? 'text-orange-500' : 'text-black'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                  />
                )}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Link
              to={createPageUrl('settings')}
              className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              style={{ marginRight: '8px' }}
            >
              Settings
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Get Started
            </motion.button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-black/5 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-sm"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.href 
                      ? 'text-orange-500 bg-orange-50' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  to={createPageUrl('settings')}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-4 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Settings
                </Link>
                <button className="w-full bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function Layout({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Listen for toast messages in localStorage (for demo purposes)
    const checkToast = () => {
      const msg = localStorage.getItem('app-toast');
      if (msg) {
        setToast(msg);
        setTimeout(() => {
          setToast(null);
          localStorage.removeItem('app-toast');
        }, 3000);
      }
    };
    checkToast();
    window.addEventListener('storage', checkToast);
    return () => window.removeEventListener('storage', checkToast);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased bg-white">
      {toast && <Toast message={toast} />}
      <header className="sr-only">Cerebras Studio main background and navigation</header>
      <div className="fixed top-0 left-0 w-full h-full z-0" aria-hidden="true">
        <Scene />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/50 to-white/80"></div>
      </div>
      <div className="relative z-10">
        <ErrorBoundary>
          <nav aria-label="Main navigation">
            <Header />
          </nav>
          <main className="pt-20" tabIndex={-1} id="main-content">
            {children}
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
} 