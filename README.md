# Cerebras Studio

An AI-powered creative studio platform built with React, featuring advanced text generation, code creation, document analysis, and creative writing tools.

## 🚀 Features

- **Text Generation Studio**: Create compelling articles, blog posts, and marketing copy
- **Code Generation Studio**: Write, debug, and optimize code in multiple languages
- **Document AI Studio**: Analyze and process documents intelligently
- **Creative Writing Studio**: Unleash creativity with AI-powered writing tools
- **3D Interactive Background**: Beautiful animated Three.js scene
- **Project Management**: Save, organize, and manage your creative projects
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js
- **Icons**: Lucide React
- **Testing**: Jest, React Testing Library
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cerebras-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` and add your Cerebras API key:
   ```
   REACT_APP_CEREBRAS_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Getting Started

1. **Dashboard**: Explore the main dashboard to see all available studios
2. **Choose a Studio**: Select from Text, Code, Document, or Creative Writing studios
3. **Create Content**: Enter your prompt and generate AI-powered content
4. **Save Projects**: Save your work for future reference
5. **Manage Projects**: View, edit, and organize your saved projects

### Studios

#### Text Generation
- Blog post creation
- Marketing copy
- Content summarization
- Language translation

#### Code Generation
- Multi-language support
- Code explanation
- Bug detection
- Performance optimization

#### Document AI
- Document summarization
- Information extraction
- Question answering
- Document comparison

#### Creative Writing
- Story generation
- Poetry creation
- Script writing
- Character development

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## 🏗️ Building for Production

Create a production build:
```bash
npm run build
```

The build files will be created in the `build/` directory.

## 📝 Code Quality

Run linting:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

Format code with Prettier:
```bash
npm run format
```

## 🐳 Docker Deployment

Build the Docker image:
```bash
docker build -t cerebras-studio .
```

Run the container:
```bash
docker run -p 80:80 cerebras-studio
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

#### Automatic Deployment from GitHub

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository: `rajshah9305/CereStudioAIApp01`

2. **Configure Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables and add:
   ```
   REACT_APP_CEREBRAS_API_KEY=your_cerebras_api_key
   REACT_APP_API_URL=https://api.cerebras.ai/v1/chat/completions
   REACT_APP_APP_NAME=CereStudio AI
   REACT_APP_VERSION=1.0.0
   REACT_APP_ENVIRONMENT=production
   ```

3. **Deploy**
   - Vercel will automatically deploy on every push to `main` branch
   - Your app will be available at: `https://your-project-name.vercel.app`

#### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Actions CI/CD

The repository includes a GitHub Actions workflow that automatically:
- Runs tests and linting
- Builds the application
- Deploys to Vercel on push to `main` branch

#### Setup GitHub Secrets

In your GitHub repository, go to Settings → Secrets and add:
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `REACT_APP_CEREBRAS_API_KEY`: Your Cerebras API key
- `REACT_APP_API_URL`: Cerebras API URL
- `REACT_APP_APP_NAME`: App name
- `REACT_APP_VERSION`: App version
- `REACT_APP_ENVIRONMENT`: Environment (production)

### Option 3: Manual Deployment
1. Run `npm run build`
2. Upload the `build/` folder to your web server
3. Configure your server to serve `index.html` for all routes

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_CEREBRAS_API_KEY` | Your Cerebras API key | Required |
| `REACT_APP_API_URL` | Cerebras API endpoint | `https://api.cerebras.ai/v1` |
| `REACT_APP_APP_NAME` | Application name | `Cerebras Studio` |
| `REACT_APP_VERSION` | Application version | `1.0.0` |
| `REACT_APP_ENVIRONMENT` | Environment | `development` |

### Customization

- **Styling**: Modify `src/styles/globals.css` for custom styles
- **3D Scene**: Edit `src/components/three/Scene.js` for background customization
- **Studios**: Add new studios in `src/pages/Studio.js`
- **API Integration**: Modify `src/integrations/Core.js` for different AI providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Cerebras](https://cerebras.ai/) for AI capabilities
- [Three.js](https://threejs.org/) for 3D graphics
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

---

Built with ❤️ by the Cerebras Studio team 