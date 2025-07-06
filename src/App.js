import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APIProvider } from './contexts/APIContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Studio from './pages/Studio';
import './styles/globals.css';

function App() {
  return (
    <APIProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/studio/:studioType" element={<Studio />} />
          </Routes>
        </Layout>
      </Router>
    </APIProvider>
  );
}

export default App; 