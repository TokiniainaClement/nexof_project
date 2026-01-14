import React, { useState, useEffect } from 'react';
import './RealtimeAnalysisDisplay.css';

const RealtimeAnalysisDisplay = () => {
    const [analysisData, setAnalysisData] = useState({
        faceCount: 0,
        faces: [],
        processingTime: 0,
        lastUpdate: null
    });
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Simulate receiving data from the mini camera analysis
        // In a real implementation, this would connect to the mini camera's analysis stream
        const interval = setInterval(() => {
            // Mock data - in real implementation, this would come from the mini camera
            const mockData = {
                faceCount: Math.floor(Math.random() * 2), // 0 or 1 face
                faces: Math.random() > 0.5 ? [{
                    faceId: 1,
                    detection: { score: 0.85 },
                    demographics: {
                        age: Math.floor(Math.random() * 40) + 20,
                        gender: Math.random() > 0.5 ? 'male' : 'female',
                        genderProbability: 0.92
                    },
                    emotions: {
                        'happy': Math.random() * 0.8,
                        'neutral': Math.random() * 0.6,
                        'sad': Math.random() * 0.3,
                        'angry': Math.random() * 0.2,
                        'surprised': Math.random() * 0.4,
                        'fearful': Math.random() * 0.1,
                        'disgusted': Math.random() * 0.1
                    }
                }] : [],
                processingTime: Math.floor(Math.random() * 200) + 50,
                lastUpdate: new Date().toLocaleTimeString()
            };

            setAnalysisData(mockData);
            setIsConnected(true);
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const getEmotionEmoji = (emotion) => {
        const emojis = {
            'happy': '😊',
            'sad': '😢',
            'angry': '😠',
            'fearful': '😨',
            'disgusted': '😖',
            'surprised': '😲',
            'neutral': '😐'
        };
        return emojis[emotion] || '🎭';
    };

    const getEmotionLabel = (emotion) => {
        const labels = {
            'happy': 'Joie',
            'sad': 'Tristesse',
            'angry': 'Colère',
            'fearful': 'Peur',
            'disgusted': 'Dégoût',
            'surprised': 'Surprise',
            'neutral': 'Neutre'
        };
        return labels[emotion] || emotion;
    };

    const EmotionChart = ({ emotions }) => {
        if (!emotions) return null;

        return (
            <div className="emotion-chart">
                <h5>📊 Analyse Émotionnelle</h5>
                <div className="emotion-bars">
                    {Object.entries(emotions)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 3) // Show top 3 emotions
                        .map(([emotion, score]) => (
                        <div key={emotion} className="emotion-bar">
                            <span className="emotion-label">
                                {getEmotionEmoji(emotion)} {getEmotionLabel(emotion)}
                            </span>
                            <div className="emotion-progress">
                                <div
                                    className="emotion-fill"
                                    style={{ width: `${score * 100}%` }}
                                ></div>
                            </div>
                            <span className="emotion-score">
                                {(score * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="realtime-analysis-display">
            <div className="analysis-header">
                <h3>🧠 Analyse IA Temps Réel</h3>
                <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                    <div className="status-dot"></div>
                    <span>{isConnected ? 'Connecté' : 'Déconnecté'}</span>
                </div>
            </div>

            <div className="analysis-content">
                {analysisData.faceCount > 0 ? (
                    <div className="analysis-active">
                        <div className="face-count">
                            <span className="count-number">{analysisData.faceCount}</span>
                            <span className="count-label">visage(s) détecté(s)</span>
                        </div>

                        <div className="faces-analysis">
                            {analysisData.faces.map((face, index) => (
                                <div key={index} className="face-card">
                                    <div className="face-header">
                                        <span className="face-id">👤 Visage {face.faceId}</span>
                                        <span className="detection-score">
                                            {(face.detection.score * 100).toFixed(1)}% confiance
                                        </span>
                                    </div>

                                    <div className="face-details">
                                        <div className="demographic-info">
                                            <div className="demo-item">
                                                <span className="demo-label">Âge estimé:</span>
                                                <span className="demo-value">{face.demographics.age} ans</span>
                                            </div>
                                            <div className="demo-item">
                                                <span className="demo-label">Genre:</span>
                                                <span className="demo-value">
                                                    {face.demographics.gender === 'male' ? '👨 Homme' : '👩 Femme'}
                                                </span>
                                            </div>
                                        </div>

                                        <EmotionChart emotions={face.emotions} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="analysis-meta">
                            <span className="processing-time">
                                ⏱️ {analysisData.processingTime}ms
                            </span>
                            <span className="last-update">
                                🔄 {analysisData.lastUpdate}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="analysis-inactive">
                        <div className="no-face-detected">
                            <div className="no-face-icon">👀</div>
                            <h4>Aucun visage détecté</h4>
                            <p>L'analyse temps réel est active mais aucun visage n'est actuellement visible.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealtimeAnalysisDisplay;