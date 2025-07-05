import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingSpinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center" role="status" aria-live="polite">
      <div
        className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        tabIndex={0}
        aria-label={label || 'Loading'}
      />
      {label && <span className="text-gray-600 text-sm">{label}</span>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  label: PropTypes.string
}; 