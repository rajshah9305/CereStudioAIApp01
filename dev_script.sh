#!/bin/bash

# Cerebras Studio Development Setup Script
set -e

echo "🚀 Setting up Cerebras Studio development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION is not supported. Please install Node.js 18+"
    exit 1
fi

print_success "Node.js version $NODE_VERSION detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm"
    exit 1
fi

print_success "npm detected"

# Install dependencies
print_status "Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating environment file..."
    cp .env.example .env
    print_warning "Please update .env with your actual API keys and configuration"
    print_warning "Edit .env file with your Cerebras API key and other settings"
else
    print_success "Environment file already exists"
fi

# Install global tools (optional)
print_status "Installing helpful global tools..."

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    npm install -g vercel
    print_success "Vercel CLI installed"
else
    print_success "Vercel CLI already installed"
fi

# Install Netlify CLI if not installed
if ! command -v netlify &> /dev/null; then
    npm install -g netlify-cli
    print_success "Netlify CLI installed"
else
    print_success "Netlify CLI already installed"
fi

# Run initial linting
print_status "Running code quality checks..."
npm run lint

if [ $? -eq 0 ]; then
    print_success "Code quality checks passed"
else
    print_warning "Code quality issues found. Run 'npm run lint:fix' to auto-fix"
fi

# Run tests
print_status "Running tests..."
npm test -- --watchAll=false

if [ $? -eq 0 ]; then
    print_success "All tests passed"
else
    print_warning "Some tests failed. Please check test output"
fi

# Build the project to ensure it compiles
print_status "Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Production build successful"
    rm -rf build # Clean up test build
else
    print_error "Production build failed"
    exit 1
fi

# Create helpful scripts directory
mkdir -p scripts

# Create a quick development script
cat > scripts/dev.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Cerebras Studio development server..."
echo "📱 Application will be available at http://localhost:3000"
echo "🔧 API calls are mocked for development"
echo "📁 Project data is stored in localStorage"
echo ""
echo "To stop the server, press Ctrl+C"
echo ""
npm start
EOF

chmod +x scripts/dev.sh

# Create a deployment script
cat > scripts/deploy.sh << 'EOF'
#!/bin/bash
echo "🚀 Building and deploying Cerebras Studio..."

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Check if Vercel is configured
if [ -f .vercel/project.json ]; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
elif command -v netlify &> /dev/null && [ -f netlify.toml ]; then
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod --dir=build
else
    echo "📦 Build ready for deployment"
    echo "The 'build' folder contains the production-ready files"
    echo "You can deploy this folder to any static hosting service"
fi
EOF

chmod +x scripts/deploy.sh

print_success "Development environment setup complete!"
echo ""
echo "🎉 Next steps:"
echo "1. Update .env with your Cerebras API key"
echo "2. Run './scripts/dev.sh' or 'npm start' to start development"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Start building amazing AI-powered applications!"
echo ""
echo "📚 Useful commands:"
echo "  npm start          - Start development server"
echo "  npm test           - Run tests"
echo "  npm run build      - Build for production"
echo "  npm run lint       - Check code quality"
echo "  npm run lint:fix   - Fix code quality issues"
echo "  ./scripts/deploy.sh - Deploy to production"
echo ""
echo "📖 For more information, check the README.md file"