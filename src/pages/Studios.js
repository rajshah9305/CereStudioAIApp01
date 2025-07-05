import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Code, 
  FileSearch, 
  PenTool, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { createPageUrl } from '../utils';

const studios = [
  {
    id: 'text',
    name: 'Text Generation',
    description: 'Generate high-quality text content with AI assistance',
    longDescription: 'Create compelling articles, blog posts, marketing copy, and more with our advanced text generation studio. Perfect for content creators, marketers, and writers.',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    features: [
      'Article and blog post generation',
      'Marketing copy creation',
      'Content summarization',
      'Language translation',
      'Tone and style customization'
    ],
    href: createPageUrl('studio') + '?type=text'
  },
  {
    id: 'code',
    name: 'Code Generation',
    description: 'Write, debug, and optimize code with AI',
    longDescription: 'Accelerate your development workflow with AI-powered code generation. From simple functions to complex applications, get clean, efficient code in any language.',
    icon: Code,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    features: [
      'Multi-language support',
      'Code explanation and documentation',
      'Bug detection and fixes',
      'Performance optimization',
      'Best practices enforcement'
    ],
    href: createPageUrl('studio') + '?type=code'
  },
  {
    id: 'document',
    name: 'Document AI',
    description: 'Analyze and process documents intelligently',
    longDescription: 'Extract insights, summarize content, and process documents with our intelligent document analysis tools. Perfect for research, legal work, and data extraction.',
    icon: FileSearch,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      'Document summarization',
      'Key information extraction',
      'Question answering',
      'Document comparison',
      'Format conversion'
    ],
    href: createPageUrl('studio') + '?type=document'
  },
  {
    id: 'creative',
    name: 'Creative Writing',
    description: 'Unleash your creativity with AI-powered writing tools',
    longDescription: 'Break through writer\'s block and explore new creative possibilities. Generate stories, poetry, scripts, and more with our creative writing studio.',
    icon: PenTool,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      'Story and novel generation',
      'Poetry and lyrics creation',
      'Script and dialogue writing',
      'Character development',
      'Plot and world-building'
    ],
    href: createPageUrl('studio') + '?type=creative'
  }
];

export default function Studios() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6">
            Our <span className="text-gradient">Studios</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our specialized AI-powered studios, each designed for specific creative tasks and workflows.
          </p>
        </motion.div>

        {/* Studios Grid */}
        <div className="space-y-12" aria-label="Studios list">
          {studios.map((studio, index) => (
            <motion.section
              key={studio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card p-8 ${studio.bgColor}`}
              aria-labelledby={`studio-title-${studio.id}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Content */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${studio.color} rounded-2xl flex items-center justify-center`}>
                      <studio.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id={`studio-title-${studio.id}`} className="text-3xl font-bold text-black">{studio.name}</h2>
                      <p className="text-gray-600">{studio.description}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {studio.longDescription}
                  </p>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-black mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {studio.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={studio.href}
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${studio.color} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      aria-label={`Open ${studio.name} studio`}
                    >
                      Open Studio
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </div>
                {/* Right Column - Visual */}
                <div className="relative">
                  <div className={`w-full h-64 bg-gradient-to-br ${studio.color} rounded-2xl flex items-center justify-center`}>
                    <studio.icon className="w-24 h-24 text-white opacity-80" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card p-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Choose a studio that matches your creative needs and start building amazing content with AI assistance.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={createPageUrl('dashboard')}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Back to Dashboard"
              >
                Back to Dashboard
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 