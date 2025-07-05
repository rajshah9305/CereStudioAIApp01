import React from 'react';
import PropTypes from 'prop-types';
import { X, FileText, FileCode, File, Download } from 'lucide-react';

export default function UploadedFiles({ files, onRemoveFile, onDownloadFile }) {
  if (!files || files.length === 0) return null;

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(extension)) {
      return <FileCode className="w-4 h-4 text-blue-500" />;
    }
    if (['txt', 'md'].includes(extension)) {
      return <FileText className="w-4 h-4 text-green-500" />;
    }
    return <File className="w-4 h-4 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Uploaded Files ({files.length})</h4>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {getFileIcon(file.name)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onDownloadFile && (
                <button
                  onClick={() => onDownloadFile(file)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={`Download ${file.name}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onRemoveFile(index)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

UploadedFiles.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  onRemoveFile: PropTypes.func.isRequired,
  onDownloadFile: PropTypes.func
}; 