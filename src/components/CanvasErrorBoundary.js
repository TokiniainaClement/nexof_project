import React from 'react';

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#00ffff',
          fontFamily: 'Arial, sans-serif',
          zIndex: 10
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#ff4444' }}>
              3D Rendering Error
            </h2>
            <p style={{ marginBottom: '20px' }}>
              The holographic cube could not be displayed.
            </p>
            <p style={{ fontSize: '12px', color: '#888' }}>
              This might be due to WebGL not being supported or other rendering issues.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#00ffff',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CanvasErrorBoundary;