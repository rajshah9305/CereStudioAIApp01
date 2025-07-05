// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock WebGL context for Three.js tests
const mockWebGLContext = {
  getExtension: () => null,
  getParameter: () => null,
  createShader: () => ({}),
  shaderSource: () => {},
  compileShader: () => {},
  getShaderParameter: () => true,
  createProgram: () => ({}),
  attachShader: () => {},
  linkProgram: () => {},
  getProgramParameter: () => true,
  useProgram: () => {},
  createBuffer: () => ({}),
  bindBuffer: () => {},
  bufferData: () => {},
  enableVertexAttribArray: () => {},
  vertexAttribPointer: () => {},
  drawArrays: () => {},
  createTexture: () => ({}),
  bindTexture: () => {},
  texImage2D: () => {},
  texParameteri: () => {},
  generateMipmap: () => {},
  viewport: () => {},
  clearColor: () => {},
  clear: () => {},
  enable: () => {},
  disable: () => {},
  blendFunc: () => {},
  getUniformLocation: () => ({}),
  uniform1f: () => {},
  uniform2f: () => {},
  uniform3f: () => {},
  uniform4f: () => {},
  uniform1i: () => {},
  uniformMatrix4fv: () => {},
};

// Mock HTMLCanvasElement getContext method
HTMLCanvasElement.prototype.getContext = jest.fn(() => mockWebGLContext);

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve(''))
  },
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Suppress console.warn for known warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') ||
       args[0].includes('componentWillUpdate') ||
       args[0].includes('React.createFactory'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

// Global test utilities
global.testUtils = {
  // Helper to create mock projects
  createMockProject: (overrides = {}) => ({
    id: 'test-project-1',
    title: 'Test Project',
    studio: 'text',
    content: 'Test prompt',
    generated_text: 'Test response',
    created_by: 'test@example.com',
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString(),
    status: 'draft',
    tags: [],
    metadata: {},
    ...overrides
  }),

  // Helper to create mock user
  createMockUser: (overrides = {}) => ({
    id: 'test-user-1',
    email: 'test@example.com',
    name: 'Test User',
    avatar: '',
    createdAt: new Date().toISOString(),
    preferences: {
      theme: 'light',
      defaultStudio: 'text',
      notifications: true
    },
    ...overrides
  })
};