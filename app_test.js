import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

// Mock the Three.js Scene component to avoid WebGL issues in tests
jest.mock('./components/three/Scene', () => {
  return function MockScene() {
    return <div data-testid="mock-scene">3D Scene</div>;
  };
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the API integration
jest.mock('./integrations/Core', () => ({
  InvokeLLM: jest.fn(() => Promise.resolve('Mock AI response')),
}));

// Mock entities
jest.mock('./entities/User', () => ({
  User: {
    me: jest.fn(() => Promise.resolve({
      id: 'test-user',
      email: 'test@example.com',
      name: 'Test User'
    }))
  }
}));

jest.mock('./entities/CreativeProject', () => ({
  CreativeProject: {
    list: jest.fn(() => Promise.resolve([])),
    create: jest.fn(() => Promise.resolve({ id: 'test-project' }))
  }
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });

  test('renders navigation elements', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText('Cerebras Studio')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Studios')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  test('renders hero section on dashboard', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText(/Unleash Your/)).toBeInTheDocument();
    expect(screen.getByText(/Creative Potential/)).toBeInTheDocument();
  });

  test('renders studio cards', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText('Text Generation')).toBeInTheDocument();
    expect(screen.getByText('Code Generation')).toBeInTheDocument();
    expect(screen.getByText('Document AI')).toBeInTheDocument();
    expect(screen.getByText('Creative Writing')).toBeInTheDocument();
  });

  test('renders 3D scene component', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByTestId('mock-scene')).toBeInTheDocument();
  });
});