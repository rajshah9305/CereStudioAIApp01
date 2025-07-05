import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Save, Sparkles, Upload } from 'lucide-react';
import FileUpload from './FileUpload';
import UploadedFiles from './UploadedFiles';

export default function PromptInput({ 
  prompt, 
  onPromptChange, 
  placeholder, 
  onGenerate, 
  onSave, 
  isGenerating, 
  canSave, 
  errors,
  uploadedFiles = [],
  onFilesChange,
  acceptedFileTypes,
  maxFiles = 5,
  maxFileSizeMB = 10
}) {
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleFileUpload = (files, indexToRemove) => {
    if (indexToRemove !== undefined) {
      // Remove file at specific index
      const newFiles = [...uploadedFiles];
      newFiles.splice(indexToRemove, 1);
      onFilesChange(newFiles);
    } else if (files) {
      // Add new files
      onFilesChange([...uploadedFiles, ...files]);
    }
  };

  const handleDownloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileContext = () => {
    if (!uploadedFiles || uploadedFiles.length === 0) return '';
    
    return uploadedFiles.map(file => 
      `[File: ${file.name}]\n${file.content || 'File content not available'}\n`
    ).join('\n');
  };

  const enhancedPrompt = uploadedFiles.length > 0 
    ? `${getFileContext()}\n---\n${prompt}`
    : prompt;

  return (
    <section className="card p-6" aria-labelledby="prompt-section">
      <h2 id="prompt-section" className="text-xl font-semibold text-black mb-4">Prompt</h2>
      
      {/* File Upload Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Attach Files (Optional)</h3>
          <button
            type="button"
            onClick={() => setShowFileUpload(!showFileUpload)}
            className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
            aria-expanded={showFileUpload}
            aria-controls="file-upload-section"
          >
            <Upload className="w-4 h-4" />
            {showFileUpload ? 'Hide' : 'Add Files'}
          </button>
        </div>
        
        {showFileUpload && (
          <div id="file-upload-section" className="mb-4">
            <FileUpload
              onFilesChange={handleFileUpload}
              acceptedTypes={acceptedFileTypes}
              maxFiles={maxFiles}
              maxSizeMB={maxFileSizeMB}
            />
          </div>
        )}
        
        <UploadedFiles
          files={uploadedFiles}
          onRemoveFile={(index) => handleFileUpload(null, index)}
          onDownloadFile={handleDownloadFile}
        />
      </div>

      {/* Prompt Textarea */}
      <label htmlFor="prompt-input" className="sr-only">Prompt</label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={onPromptChange}
        placeholder={placeholder}
        rows={8}
        className="input-field resize-none"
        aria-required="true"
        aria-invalid={!!errors.prompt}
      />
      {errors.prompt && <div className="text-red-600 text-xs mt-1" role="alert">{errors.prompt}</div>}
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGenerate(enhancedPrompt)}
          disabled={isGenerating || !prompt.trim()}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-busy={isGenerating}
          aria-label="Generate content"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Generate
            </>
          )}
        </motion.button>
        <button
          onClick={onSave}
          disabled={!canSave}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Save project"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          Save
        </button>
      </div>
    </section>
  );
}

PromptInput.propTypes = {
  prompt: PropTypes.string.isRequired,
  onPromptChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onGenerate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  canSave: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  uploadedFiles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    content: PropTypes.string
  })),
  onFilesChange: PropTypes.func,
  acceptedFileTypes: PropTypes.string,
  maxFiles: PropTypes.number,
  maxFileSizeMB: PropTypes.number
}; 