import React, { useEffect, useState } from 'react';
import { FilesLayout } from './files/FilesLayout';
import { Navigate } from 'react-router-dom';

const FilesPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (storedToken && userId) {
      // Verify token is still valid using mock service
      const { MockAuthService } = require('../services/mockData');
      MockAuthService.getUserProfile(storedToken)
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <FilesLayout />;
};

export default FilesPage;