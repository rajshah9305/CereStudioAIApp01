import React from 'react';
import PropTypes from 'prop-types';
import { Copy, Download, Sparkles } from 'lucide-react';

export default function GeneratedContent({ content, onCopy, onDownload }) {
  return (
    <section className="card p-6" aria-labelledby="generated-content-section">
      <div className="flex items-center justify-between mb-4">
        <h2 id="generated-content-section" className="text-xl font-semibold text-black">Generated Content</h2>
        {content && (
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Copy generated content"
            >
              <Copy className="w-4 h-4" aria-hidden="true" />
              Copy
            </button>
            <button 
              onClick={onDownload}
              className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
              aria-label="Download generated content"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download
            </button>
          </div>
        )}
      </div>
      <div className="min-h-[400px] p-4 bg-gray-50 rounded-lg border" aria-live="polite">
        {content ? (
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {content}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
              <p>Generated content will appear here</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

GeneratedContent.propTypes = {
  content: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
}; 