import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="text-gray-700 mb-4">An unexpected error occurred. Please reload the page or contact support.</p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
            onClick={() => window.location.reload()}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  onError: PropTypes.func
};

export default ErrorBoundary; 