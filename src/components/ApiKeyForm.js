import React from 'react';
import PropTypes from 'prop-types';

export default function ApiKeyForm({ apiKey, apiUrl, appName, version, environment, errors, onChange }) {
  return (
    <section className="card p-6" aria-labelledby="api-section">
      <h2 id="api-section" className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
        API Keys & App Settings
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">Cerebras API Key</label>
          <input
            id="api-key"
            type="text"
            name="apiKey"
            value={apiKey}
            onChange={onChange}
            className="input-field"
            autoComplete="off"
            aria-required="true"
            aria-invalid={!!errors.apiKey}
          />
          {errors.apiKey && <div className="text-red-600 text-xs mt-1" role="alert">{errors.apiKey}</div>}
        </div>
        <div>
          <label htmlFor="api-url" className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
          <input
            id="api-url"
            type="text"
            name="apiUrl"
            value={apiUrl}
            onChange={onChange}
            className="input-field"
            autoComplete="off"
            aria-required="true"
            aria-invalid={!!errors.apiUrl}
          />
          {errors.apiUrl && <div className="text-red-600 text-xs mt-1" role="alert">{errors.apiUrl}</div>}
        </div>
        <div>
          <label htmlFor="app-name" className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
          <input
            id="app-name"
            type="text"
            name="appName"
            value={appName}
            onChange={onChange}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="app-version" className="block text-sm font-medium text-gray-700 mb-1">Version</label>
          <input
            id="app-version"
            type="text"
            name="version"
            value={version}
            onChange={onChange}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="app-env" className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
          <input
            id="app-env"
            type="text"
            name="environment"
            value={environment}
            onChange={onChange}
            className="input-field"
          />
        </div>
      </div>
    </section>
  );
}

ApiKeyForm.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  environment: PropTypes.string.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}; 