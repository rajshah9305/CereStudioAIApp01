import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Code, 
  FileSearch, 
  PenTool, 
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { createPageUrl } from '../utils';

const studios = [
  {
    id: 'text',
    name: 'Text Generation',
    description: 'Generate high-quality text content with AI assistance',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    href: createPageUrl('studio') + '?type=text'
  },
  {
    id: 'code',
    name: 'Code Generation',
    description: 'Write, debug, and optimize code with AI',
    icon: Code,
    color: 'from-green-500 to-green-600',
    href: createPageUrl('studio') + '?type=code'
  },
  {
    id: 'document',
    name: 'Document AI',
    description: 'Analyze and process documents intelligently',
    icon: FileSearch,
    color: 'from-purple-500 to-purple-600',
    href: createPageUrl('studio') + '?type=document'
  },
  {
    id: 'creative',
    name: 'Creative Writing',
    description: 'Unleash your creativity with AI-powered writing tools',
    icon: PenTool,
    color: 'from-orange-500 to-orange-600',
    href: createPageUrl('studio') + '?type=creative'
  }
];

const features = [
  {
    icon: Sparkles,
    title: 'Advanced AI Models',
    description: 'Powered by state-of-the-art language models'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate content in seconds, not minutes'
  },
  {
    icon: Target,
    title: 'Precise Control',
    description: 'Fine-tune parameters for perfect results'
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-black mb-6">
              Unleash Your{' '}
              <span className="text-gradient">Creative Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your ideas into reality with AI-powered creative tools. 
              From text generation to code creation, we've got you covered.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={createPageUrl('studios')}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Studios Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-black mb-4">
              Choose Your Studio
            </h2>
            <p className="text-xl text-gray-600">
              Select the perfect tool for your creative needs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {studios.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={studio.href}
                  className="block card p-6 h-full transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${studio.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <studio.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {studio.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {studio.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
} 