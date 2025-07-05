import { formatDate } from '../utils';

class CreativeProject {
  constructor(data = {}) {
    this.id = data.id || generateId();
    this.title = data.title || '';
    this.studio = data.studio || 'text';
    this.content = data.content || '';
    this.generated_text = data.generated_text || '';
    this.created_by = data.created_by || '';
    this.created_date = data.created_date || new Date().toISOString();
    this.updated_date = data.updated_date || new Date().toISOString();
    this.status = data.status || 'draft';
    this.tags = data.tags || [];
    this.metadata = data.metadata || {};
  }

  static async list() {
    // In a real app, this would fetch from an API
    // For now, we'll use localStorage
    const projectsData = localStorage.getItem('projects');
    if (projectsData) {
      return JSON.parse(projectsData).map(data => new CreativeProject(data));
    }
    return [];
  }

  static async create(data) {
    const project = new CreativeProject({
      ...data,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    });

    const projects = await CreativeProject.list();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects.map(p => p.toJSON())));

    return project;
  }

  static async update(id, data) {
    const projects = await CreativeProject.list();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Project not found');
    }

    const updatedProject = new CreativeProject({
      ...projects[index],
      ...data,
      updated_date: new Date().toISOString()
    });

    projects[index] = updatedProject;
    localStorage.setItem('projects', JSON.stringify(projects.map(p => p.toJSON())));

    return updatedProject;
  }

  static async delete(id) {
    const projects = await CreativeProject.list();
    const filteredProjects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(filteredProjects.map(p => p.toJSON())));
    return true;
  }

  static async getById(id) {
    const projects = await CreativeProject.list();
    return projects.find(p => p.id === id);
  }

  getFormattedCreatedDate() {
    return formatDate(this.created_date);
  }

  getFormattedUpdatedDate() {
    return formatDate(this.updated_date);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      studio: this.studio,
      content: this.content,
      generated_text: this.generated_text,
      created_by: this.created_by,
      created_date: this.created_date,
      updated_date: this.updated_date,
      status: this.status,
      tags: this.tags,
      metadata: this.metadata
    };
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export { CreativeProject }; 