import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, AlertCircle } from 'lucide-react';

export default function FileUpload({ onFilesChange, acceptedTypes = '.txt,.md,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json,.xml,.csv,.pdf,.doc,.docx', maxFiles = 5, maxSizeMB = 10 }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);



  const validateFile = (file) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    if (file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is ${maxSizeMB}MB.`;
    }
    return null;
  };

  const handleFiles = (files) => {
    setUploadError('');
    const fileArray = Array.from(files);
    
    if (fileArray.length > maxFiles) {
      setUploadError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    const errors = [];
    const validFiles = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setUploadError(errors.join(' '));
    }

    if (validFiles.length > 0) {
      onFilesChange(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  // File removal is handled by the parent component through onFilesChange

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver 
            ? 'border-orange-500 bg-orange-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop files here, or{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-orange-500 hover:text-orange-600 underline"
          >
            browse files
          </button>
        </p>
        <p className="text-xs text-gray-500">
          Accepted: {acceptedTypes.replace(/\./g, '').split(',').join(', ')} | 
          Max {maxFiles} files, {maxSizeMB}MB each
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-700">{uploadError}</span>
        </div>
      )}
    </div>
  );
}

FileUpload.propTypes = {
  onFilesChange: PropTypes.func.isRequired,
  acceptedTypes: PropTypes.string,
  maxFiles: PropTypes.number,
  maxSizeMB: PropTypes.number
}; 