import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Code, 
  FileSearch, 
  PenTool, 
  Plus,
  Search,
  Filter,
  Calendar,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { createPageUrl, formatDate, truncateText } from '../utils';
import { CreativeProject } from '../entities/CreativeProject';
import LoadingSpinner from '../components/LoadingSpinner';

const studioIcons = {
  text: FileText,
  code: Code,
  document: FileSearch,
  creative: PenTool
};

const studioColors = {
  text: 'from-blue-500 to-blue-600',
  code: 'from-green-500 to-green-600',
  document: 'from-purple-500 to-purple-600',
  creative: 'from-orange-500 to-orange-600'
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudio, setSelectedStudio] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedStudio]);

  const loadProjects = async () => {
    try {
      const projectList = await CreativeProject.list();
      setProjects(projectList);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by studio
    if (selectedStudio !== 'all') {
      filtered = filtered.filter(project => project.studio === selectedStudio);
    }

    setFilteredProjects(filtered);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await CreativeProject.delete(projectId);
        await loadProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const getStudioName = (studioType) => {
    const names = {
      text: 'Text Generation',
      code: 'Code Generation',
      document: 'Document AI',
      creative: 'Creative Writing'
    };
    return names[studioType] || studioType;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner label="Loading projects..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">My Projects</h1>
            <p className="text-gray-600">
              {projects.length} project{projects.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={createPageUrl('studios')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Create new project"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              New Project
            </Link>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Project filters">
            {/* Search */}
            <div className="relative">
              <label htmlFor="project-search" className="sr-only">Search projects</label>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                id="project-search"
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Search projects"
              />
            </div>
            {/* Studio Filter */}
            <div className="relative">
              <label htmlFor="studio-filter" className="sr-only">Filter by studio</label>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <select
                id="studio-filter"
                value={selectedStudio}
                onChange={(e) => setSelectedStudio(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                aria-label="Filter by studio"
              >
                <option value="all">All Studios</option>
                <option value="text">Text Generation</option>
                <option value="code">Code Generation</option>
                <option value="document">Document AI</option>
                <option value="creative">Creative Writing</option>
              </select>
            </div>
          </form>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
            aria-live="polite"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStudio !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first project to get started'
              }
            </p>
            {!searchTerm && selectedStudio === 'all' && (
              <Link
                to={createPageUrl('studios')}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Create your first project"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                Create Project
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Project list"
          >
            {filteredProjects.map((project, index) => {
              const StudioIcon = studioIcons[project.studio];
              const studioColor = studioColors[project.studio];
              return (
                <motion.section
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card p-6 group"
                  aria-labelledby={`project-title-${project.id}`}
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${studioColor} rounded-lg flex items-center justify-center`}>
                        <StudioIcon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 id={`project-title-${project.id}`} className="font-semibold text-black group-hover:text-orange-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getStudioName(project.studio)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 rounded hover:bg-red-50 text-red-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        title="Delete project"
                        aria-label={`Delete project ${project.title}`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  {/* Project Content */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {truncateText(project.content, 100)}
                    </p>
                    {project.generated_text && (
                      <p className="text-sm text-gray-500">
                        {truncateText(project.generated_text, 80)}
                      </p>
                    )}
                  </div>
                  {/* Project Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      {formatDate(project.created_date)}
                    </div>
                    <Link
                      to={`${createPageUrl('studio')}?type=${project.studio}&project=${project.id}`}
                      className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label={`View project ${project.title}`}
                    >
                      View
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.section>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
} 