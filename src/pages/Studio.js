import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Code, 
  FileSearch, 
  PenTool, 
  Settings,
  ArrowLeft
} from 'lucide-react';
import { createPageUrl } from '../utils';
import { InvokeLLM } from '../integrations/Core';
import { CreativeProject } from '../entities/CreativeProject';
import PromptInput from '../components/PromptInput';
import GeneratedContent from '../components/GeneratedContent';
import GenerationSettings from '../components/GenerationSettings';
import ExamplePrompts from '../components/ExamplePrompts';

const studioConfigs = {
  text: {
    name: 'Text Generation',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    placeholder: 'Enter your text prompt here...',
    description: 'Generate high-quality text content with AI assistance',
    acceptedFileTypes: '.txt,.md,.doc,.docx,.pdf,.rtf',
    examples: [
      'Write a blog post about artificial intelligence trends in 2024',
      'Create a marketing email for a new product launch',
      'Summarize the key points of a research paper',
      'Generate a social media post about sustainability'
    ]
  },
  code: {
    name: 'Code Generation',
    icon: Code,
    color: 'from-green-500 to-green-600',
    placeholder: 'Describe the code you want to generate...',
    description: 'Write, debug, and optimize code with AI',
    acceptedFileTypes: '.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json,.xml,.sql,.php,.rb,.go,.rs,.swift,.kt,.scala',
    examples: [
      'Create a React component for a todo list',
      'Write a Python function to sort a list of dictionaries',
      'Generate a SQL query to find users with multiple orders',
      'Create a JavaScript function to validate email addresses'
    ]
  },
  document: {
    name: 'Document AI',
    icon: FileSearch,
    color: 'from-purple-500 to-purple-600',
    placeholder: 'Paste your document content or ask questions...',
    description: 'Analyze and process documents intelligently',
    acceptedFileTypes: '.txt,.md,.pdf,.doc,.docx,.rtf,.csv,.json,.xml,.html,.htm',
    examples: [
      'Summarize this legal document',
      'Extract key information from this research paper',
      'Answer questions about this contract',
      'Compare two documents and highlight differences'
    ]
  },
  creative: {
    name: 'Creative Writing',
    icon: PenTool,
    color: 'from-orange-500 to-orange-600',
    placeholder: 'Describe your creative writing project...',
    description: 'Unleash your creativity with AI-powered writing tools',
    acceptedFileTypes: '.txt,.md,.doc,.docx,.rtf',
    examples: [
      'Write a short story about a time traveler',
      'Create a poem about nature and technology',
      'Generate dialogue for a movie scene',
      'Develop a character profile for a fantasy novel'
    ]
  }
};

export default function Studio() {
  const [searchParams] = useSearchParams();
  const studioType = searchParams.get('type') || 'text';
  const config = studioConfigs[studioType] || studioConfigs.text;
  
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0
  });
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const readFileContent = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      
      if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.json') || file.name.endsWith('.xml') || file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        // For binary files like PDFs, we'll just note that content extraction isn't available
        resolve('File content extraction not available for this file type.');
      }
    });
  };

  const handleFilesChange = async (newFiles) => {
    if (newFiles) {
      const filesWithContent = await Promise.all(
        newFiles.map(async (file) => ({
          ...file,
          content: await readFileContent(file)
        }))
      );
      setUploadedFiles(filesWithContent);
    } else {
      setUploadedFiles([]);
    }
  };

  const validate = () => {
    const errs = {};
    if (!prompt.trim()) errs.prompt = 'Prompt is required.';
    if (!projectTitle.trim()) errs.projectTitle = 'Project title is required to save.';
    return errs;
  };

  const handleGenerate = async (enhancedPrompt) => {
    const errs = validate();
    setErrors(errs);
    if (errs.prompt) return;
    setIsGenerating(true);
    try {
      const result = await InvokeLLM(enhancedPrompt || prompt, {
        studio: studioType,
        ...settings
      });
      setGeneratedContent(result);
      if (result && result.length > 0) {
        localStorage.setItem('app-toast', 'Content generated successfully!');
      }
    } catch (error) {
      setGeneratedContent('Sorry, there was an error generating content. Please try again.');
      localStorage.setItem('app-toast', 'Error generating content. Please check your API key and network.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    const errs = validate();
    setErrors(errs);
    if (errs.projectTitle || errs.prompt || !generatedContent) return;
    try {
      await CreativeProject.create({
        title: projectTitle,
        studio: studioType,
        content: prompt,
        generated_text: generatedContent,
        created_by: 'demo@cerebras.studio',
        files: uploadedFiles.map(f => ({ name: f.name, size: f.size }))
      });
      localStorage.setItem('app-toast', 'Project saved successfully!');
    } catch (error) {
      localStorage.setItem('app-toast', 'Failed to save project. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle || 'generated-content'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExample = (example) => {
    setPrompt(example);
  };

  const canSave = projectTitle.trim() && prompt.trim() && generatedContent;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to={createPageUrl('studios')}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Back to Studios"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Back to Studios
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-pressed={showSettings}
              aria-label="Toggle generation settings panel"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              Settings
            </button>
          </div>
        </div>

        {/* Studio Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className={`w-20 h-20 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <config.icon className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-2">{config.name}</h1>
          <p className="text-xl text-gray-600">{config.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <section className="card p-6" aria-labelledby="project-title-section">
              <h2 id="project-title-section" className="text-xl font-semibold text-black mb-4">Project Title</h2>
              <label htmlFor="project-title" className="sr-only">Project Title</label>
              <input
                id="project-title"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter project title..."
                className="input-field"
                aria-required="true"
                aria-invalid={!!errors.projectTitle}
              />
              {errors.projectTitle && <div className="text-red-600 text-xs mt-1" role="alert">{errors.projectTitle}</div>}
            </section>

            <PromptInput
              prompt={prompt}
              onPromptChange={(e) => setPrompt(e.target.value)}
              placeholder={config.placeholder}
              onGenerate={handleGenerate}
              onSave={handleSave}
              isGenerating={isGenerating}
              canSave={canSave}
              errors={errors}
              uploadedFiles={uploadedFiles}
              onFilesChange={handleFilesChange}
              acceptedFileTypes={config.acceptedFileTypes}
              maxFiles={5}
              maxFileSizeMB={10}
            />

            <ExamplePrompts examples={config.examples} onExampleClick={handleExample} />
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <GeneratedContent
              content={generatedContent}
              onCopy={handleCopy}
              onDownload={handleDownload}
            />

            <GenerationSettings
              settings={settings}
              onSettingsChange={setSettings}
              isVisible={showSettings}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 