class User {
  constructor(data = {}) {
    this.id = data.id || generateId();
    this.email = data.email || '';
    this.name = data.name || '';
    this.avatar = data.avatar || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.preferences = {
      theme: 'light',
      defaultStudio: 'text',
      notifications: true,
      ...data.preferences
    };
  }

  static async me() {
    // In a real app, this would fetch from an API
    // For now, we'll use localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      return new User(JSON.parse(userData));
    }
    
    // Return a default user for demo purposes
    return new User({
      id: 'demo-user',
      email: 'demo@cerebras.studio',
      name: 'Demo User'
    });
  }

  static async login(email) {
    // Mock login - in real app, this would authenticate with backend
    const user = new User({
      email,
      name: email.split('@')[0]
    });
    
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  static async logout() {
    localStorage.removeItem('user');
    return true;
  }

  static async update(data) {
    const user = await User.me();
    const updatedUser = new User({ ...user, ...data });
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      createdAt: this.createdAt,
      preferences: this.preferences
    };
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export { User }; 