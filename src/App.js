import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Studio from './pages/Studio';
import Studios from './pages/Studios';
import Projects from './pages/Projects';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 