import React from 'react';
import PropTypes from 'prop-types';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string
}; 