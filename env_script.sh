#!/bin/bash

# Environment variable injection script for Docker containers
# This script replaces environment variables in the built React app

set -e

# Define the directory containing the built React app
BUILD_DIR="/usr/share/nginx/html"

# Find all JavaScript files in the build directory
find "${BUILD_DIR}" -name "*.js" -type f -exec sed -i \
  -e "s|REACT_APP_CEREBRAS_API_KEY_PLACEHOLDER|${REACT_APP_CEREBRAS_API_KEY:-}|g" \
  -e "s|REACT_APP_API_URL_PLACEHOLDER|${REACT_APP_API_URL:-https://api.cerebras.ai/v1}|g" \
  -e "s|REACT_APP_APP_NAME_PLACEHOLDER|${REACT_APP_APP_NAME:-Cerebras Studio}|g" \
  -e "s|REACT_APP_VERSION_PLACEHOLDER|${REACT_APP_VERSION:-1.0.0}|g" \
  -e "s|REACT_APP_ENVIRONMENT_PLACEHOLDER|${REACT_APP_ENVIRONMENT:-production}|g" \
  {} \;

# Also replace in the index.html if needed
sed -i \
  -e "s|REACT_APP_APP_NAME_PLACEHOLDER|${REACT_APP_APP_NAME:-Cerebras Studio}|g" \
  "${BUILD_DIR}/index.html"

echo "Environment variables have been injected successfully."

# Print environment info (without sensitive data)
echo "App Name: ${REACT_APP_APP_NAME:-Cerebras Studio}"
echo "Version: ${REACT_APP_VERSION:-1.0.0}"
echo "Environment: ${REACT_APP_ENVIRONMENT:-production}"
echo "API URL: ${REACT_APP_API_URL:-https://api.cerebras.ai/v1}"