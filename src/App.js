import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import FaceCapture from './components/FaceCapture';
import IntroCube from './components/IntroCube';
import HolographicCube from './components/HolographicCube';
import CanvasErrorBoundary from './components/CanvasErrorBoundary';
import ChatPage from './components/ChatPage';
import AgendaPage from './components/AgendaPage';
import FilesPage from './components/FilesPage';
import SettingsPage from './components/SettingsPage';
import nexofImage from './images/nexof-universe.png';
import './components/Home.css';
import EnhancedAICamera from './components/HomeAICamera';
import { ThemeProvider } from './hooks/useTheme';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userIdForScan, setUserIdForScan] = useState(null);
    const [showFaceVerify, setShowFaceVerify] = useState(false);
    const [faceVerifyUserId, setFaceVerifyUserId] = useState(null);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        // Store user ID for chat authentication
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            localStorage.setItem('userId', payload.id);
          } catch (error) {
            console.error('Error extracting user ID from token:', error);
          }
        }
    };

    const handleSignupSuccess = (userId) => {
        setUserIdForScan(userId);
    };


    // Nouvelle fonction pour gérer la demande de vérification faciale
    const handleFaceVerificationRequired = (userId) => {
    setFaceVerifyUserId(userId);
    setShowFaceVerify(true);
};

    const handleScanComplete = () => {
      setUserIdForScan(null);
      setShowFaceVerify(false);
      setFaceVerifyUserId(null);
      // Recharger l'authentification après vérification réussie
      const token = localStorage.getItem('token');
      if (token) {
          setIsAuthenticated(true);
          // Store user ID for chat authentication
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            localStorage.setItem('userId', payload.id);
          } catch (error) {
            console.error('Error extracting user ID from token:', error);
          }
          }
  };

   const handleIntroComplete = () => {
     setShowIntro(false);
   };

    // Remplacer votre HomePage actuelle par ce composant complet
const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        // Use mock authentication service
        const { MockAuthService } = await import('./services/mockData');
        const data = await MockAuthService.getUserProfile(token);
        setUserData(data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
   localStorage.removeItem('token');
   setIsAuthenticated(false);
   setShowIntro(true);
 };


  if (loading) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Chargement de votre espace NEXOF...</p>
    </div>
  );
}

  return (
    <div className="App">
      <img
        src={nexofImage}
        alt="Nexof Background"
        className="background-image"
      />
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.8, 4], fov: 35 }}
          shadows
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 2
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.0}
            color="#00ff88"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 0, 5]} intensity={0.7} color="#aa00ff" castShadow />
          <pointLight position={[0, 0, -5]} intensity={0.5} color="#00ff88" castShadow />

          {/* Holographic Cube */}
          <HolographicCube />

          {/* Environment */}
          <Environment preset="night" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </CanvasErrorBoundary>
      {/* Header de navigation */}
      <header className="home-header">
        <div className="header-left">
          <h1 className="app-name">NEXOF</h1>
          <span className="welcome-text">Bonjour, {userData?.email || 'Utilisateur'} 👋</span>
        </div>
        <div className="header-right">
          <div className="mini-camera-wrapper">
            <EnhancedAICamera miniMode={true} realTimeMode={true} />
          </div>

          <button className="nav-button profile-btn" onClick={() => console.log('Profil')}>
            👤 Profil
          </button>

          <div className="notifications-container">
            <button className="nav-button notifications-btn" onClick={() => console.log('Notifications')}>
              🔔 Notifications
            </button>
            <span className="notification-badge">3</span>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            🚪 Déconnexion
          </button>
        </div>
      </header>
    </div>
  );
};

    if (showIntro) {
        return <IntroCube onComplete={handleIntroComplete} />;
    }

    return (
        <ThemeProvider>
            <Router>
                <div className="App">
                    <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />

                    <Route path="/login" element={
                        isAuthenticated ? (
                            <HomePage />
                        ) : showFaceVerify ? (
                            <FaceCapture
                                userId={faceVerifyUserId}
                                onScanComplete={handleScanComplete}
                                isVerification={true}
                            />
                        ) : (
                            <LoginForm
                                onLoginSuccess={handleLoginSuccess}
                                onFaceVerificationRequired={handleFaceVerificationRequired}
                                isAuthenticated={isAuthenticated}
                            />
                        )
                    } />

                    <Route path="/signup" element={
                        userIdForScan ? (
                            <FaceCapture
                                userId={userIdForScan}
                                onScanComplete={handleScanComplete}
                                isVerification={false}
                            />
                        ) : (
                            <SignUpForm onSignupSuccess={handleSignupSuccess} />
                        )
                    } />

                    <Route path="/face-verify" element={
                        <FaceCapture
                            onScanComplete={handleScanComplete}
                            isVerification={true}
                        />
                    } />

                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/agenda" element={<AgendaPage />} />
                    <Route path="/files" element={<FilesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;