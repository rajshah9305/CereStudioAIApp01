#!/bin/bash

# CereStudio AI App Deployment Script
echo "🚀 Starting CereStudio AI App Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false --coverage --passWithNoTests

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Your app is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Set up Vercel deployment (see README.md)"
    echo "3. Configure environment variables in Vercel dashboard"
else
    echo "❌ Build failed!"
    exit 1
fi 