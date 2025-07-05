import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function GenerationSettings({ settings, onSettingsChange, isVisible }) {
  if (!isVisible) return null;

  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="card p-6"
      aria-labelledby="generation-settings-section"
    >
      <h3 id="generation-settings-section" className="text-lg font-semibold text-black mb-4">Generation Settings</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="temperature-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Temperature: {settings.temperature}
          </label>
          <input
            id="temperature-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => onSettingsChange({ ...settings, temperature: parseFloat(e.target.value) })}
            className="w-full"
            aria-valuenow={settings.temperature}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-label="Temperature"
          />
        </div>
        <div>
          <label htmlFor="max-tokens-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Max Tokens: {settings.maxTokens}
          </label>
          <input
            id="max-tokens-slider"
            type="range"
            min="100"
            max="2000"
            step="100"
            value={settings.maxTokens}
            onChange={(e) => onSettingsChange({ ...settings, maxTokens: parseInt(e.target.value) })}
            className="w-full"
            aria-valuenow={settings.maxTokens}
            aria-valuemin={100}
            aria-valuemax={2000}
            aria-label="Max Tokens"
          />
        </div>
        <div>
          <label htmlFor="top-p-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Top P: {settings.topP}
          </label>
          <input
            id="top-p-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.topP}
            onChange={(e) => onSettingsChange({ ...settings, topP: parseFloat(e.target.value) })}
            className="w-full"
            aria-valuenow={settings.topP}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-label="Top P"
          />
        </div>
      </div>
    </motion.section>
  );
}

GenerationSettings.propTypes = {
  settings: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    maxTokens: PropTypes.number.isRequired,
    topP: PropTypes.number.isRequired
  }).isRequired,
  onSettingsChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
}; 