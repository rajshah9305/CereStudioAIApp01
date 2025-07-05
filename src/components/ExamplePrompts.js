import React from 'react';
import PropTypes from 'prop-types';

export default function ExamplePrompts({ examples, onExampleClick }) {
  return (
    <section className="card p-6" aria-labelledby="examples-section">
      <h3 id="examples-section" className="text-lg font-semibold text-black mb-4">Example Prompts</h3>
      <div className="space-y-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={`Use example prompt: ${example}`}
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}

ExamplePrompts.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.string).isRequired,
  onExampleClick: PropTypes.func.isRequired
}; 