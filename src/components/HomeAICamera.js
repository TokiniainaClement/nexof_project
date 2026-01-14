import React, { useRef, useState, useEffect } from 'react';
import { MockFaceService } from '../services/mockData';
import './HomeAICamera.css';

const EnhancedAICamera = ({ onClose, realTimeMode = true, miniMode = false }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayCanvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisInterval, setAnalysisInterval] = useState(null);
    
    const [analysisData, setAnalysisData] = useState({
        faceCount: 0,
        faces: [],
        processingTime: 0,
        lastUpdate: null
    });

    // Camera quality settings
    const cameraConstraints = {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
            frameRate: { ideal: 30 },
            exposureMode: 'continuous',
            whiteBalance: 'continuous'
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const startCamera = async () => {
        try {
            const currentStream = await navigator.mediaDevices.getUserMedia(cameraConstraints);
            setStream(currentStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = currentStream;
                setIsCameraActive(true);
                
                videoRef.current.onloadedmetadata = async () => {
                    console.log('✅ Caméra optimisée et prête');
                    try {
                        await videoRef.current.play();
                        console.log('🎥 Vidéo démarrée');
                        if (realTimeMode) {
                            startRealTimeAnalysis();
                        }
                    } catch (playError) {
                        console.error('Erreur lors du démarrage de la vidéo:', playError);
                    }
                };
            }
        } catch (err) {
            console.error("Erreur d'accès à la caméra :", err);
        }
    };

    const stopCamera = () => {
        if (analysisInterval) {
            clearInterval(analysisInterval);
            setAnalysisInterval(null);
        }
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        
        setIsCameraActive(false);
        setIsAnalyzing(false);
        setAnalysisData({
            faceCount: 0,
            faces: [],
            processingTime: 0,
            lastUpdate: null
        });
        
        clearOverlay();
    };

    const captureFrame = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/jpeg', 1.0);
    };

    const dataURLToBlob = (dataURL) => {
        try {
            const parts = dataURL.split(',');
            const mimeMatch = parts[0].match(/:(.*?);/);
            const mimeType = mimeMatch[1];
            const byteString = atob(parts[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            
            return new Blob([ab], { type: mimeType });
        } catch (error) {
            console.error('Erreur conversion image:', error);
            return null;
        }
    };

    const analyzeFrame = async () => {
        if (!isAnalyzing || !videoRef.current || !isCameraActive) return;

        try {
            const dataURL = captureFrame();
            if (!dataURL) return;

            const blob = dataURLToBlob(dataURL);
            if (!blob) return;

            const formData = new FormData();
            formData.append('image', blob, 'analysis_frame.jpg');

            // Use mock face analysis service
            const result = await MockFaceService.analyzeFace(blob);
            setAnalysisData({
                faceCount: result.faceCount,
                faces: result.analysis || [],
                processingTime: result.processingTime,
                lastUpdate: new Date().toLocaleTimeString()
            });

            drawAnalysisOverlay(result.analysis);
        } catch (error) {
            console.error('Erreur analyse:', error);
        }
    };

    const drawAnalysisOverlay = (faces) => {
        const canvas = overlayCanvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video || !video.videoWidth || !video.videoHeight) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!faces || faces.length === 0) {
            drawNoFaceDetected(ctx, canvas);
            return;
        }

        faces.forEach((face, index) => {
            drawFaceBox(ctx, face, index);
            drawFaceLandmarks(ctx, face);
            drawFaceInfo(ctx, face, index);
        });
    };

    const drawNoFaceDetected = (ctx, canvas) => {
        ctx.fillStyle = 'rgba(255, 100, 100, 0.8)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🔍 Aucun visage détecté', canvas.width / 2, 50);
        ctx.font = '14px Arial';
        ctx.fillText('Ajustez votre position et l\'éclairage', canvas.width / 2, 80);
    };

    const drawFaceBox = (ctx, face, index) => {
        const box = face.detection.box;
        const confidence = face.detection.score;
        
        // Color based on confidence
        const color = confidence > 0.8 ? '#00ff00' : 
                     confidence > 0.6 ? '#ffff00' : '#ff4444';
        
        // Detection box
        ctx.strokeStyle = color;
        ctx.lineWidth = confidence > 0.7 ? 3 : 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        
        // Confidence indicator
        ctx.fillStyle = color;
        ctx.font = 'bold 14px Arial';
        ctx.fillText(
            `${(confidence * 100).toFixed(1)}%`, 
            box.x, 
            box.y - 10
        );
    };

    const drawFaceInfo = (ctx, face, index) => {
        const box = face.detection.box;
        const info = [
            `Visage ${index + 1}`,
            `Âge: ${face.demographics.age}`,
            `Genre: ${face.demographics.gender === 'male' ? '👨 Homme' : '👩 Femme'}`,
            `Confiance: ${(face.demographics.genderProbability * 100).toFixed(1)}%`
        ];
        
        // Background for text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        const textX = box.x;
        const textY = box.y + box.height + 5;
        const textHeight = info.length * 18 + 10;
        ctx.fillRect(textX, textY, 200, textHeight);
        
        // Info text
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        
        info.forEach((line, i) => {
            ctx.fillText(line, textX + 5, textY + 20 + (i * 18));
        });
    };

    const drawFaceLandmarks = (ctx, face) => {
        if (!face.landmarks) return;

        // Draw key facial points
        ctx.fillStyle = '#00f0ff';

        // Draw simplified landmarks for eyes and nose
        if (face.landmarks.leftEye && face.landmarks.leftEye.length > 0) {
            const leftEye = face.landmarks.leftEye[0];
            ctx.beginPath();
            ctx.arc(leftEye.x, leftEye.y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }

        if (face.landmarks.rightEye && face.landmarks.rightEye.length > 0) {
            const rightEye = face.landmarks.rightEye[0];
            ctx.beginPath();
            ctx.arc(rightEye.x, rightEye.y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }

        if (face.landmarks.nose && face.landmarks.nose.length > 0) {
            const nose = face.landmarks.nose[0];
            ctx.beginPath();
            ctx.arc(nose.x, nose.y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    };

    const clearOverlay = () => {
        if (overlayCanvasRef.current) {
            const ctx = overlayCanvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
        }
    };

    const startRealTimeAnalysis = () => {
        if (analysisInterval) {
            clearInterval(analysisInterval);
        }

        setIsAnalyzing(true);
        // Start analysis immediately, then every 1 second for faster feedback
        analyzeFrame();
        const interval = setInterval(analyzeFrame, 1000);
        setAnalysisInterval(interval);
    };

    const stopRealTimeAnalysis = () => {
        if (analysisInterval) {
            clearInterval(analysisInterval);
            setAnalysisInterval(null);
        }
        setIsAnalyzing(false);
        clearOverlay();
    };

    const EmotionChart = ({ emotions }) => {
        if (!emotions) return null;
        
        return (
            <div className="emotion-chart">
                <h5>📊 Analyse Émotionnelle</h5>
                <div className="emotion-bars">
                    {Object.entries(emotions)
                        .sort(([,a], [,b]) => b - a)
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

    return (
        <div className={`enhanced-ai-camera ${miniMode ? 'mini-mode' : ''}`}>
            {!miniMode && (
                <div className="camera-section">
                    <div className="camera-header">
                        <div className="header-controls">
                            <h3>🧠 IA Avancée - Analyse en Temps Réel</h3>
                            {onClose && (
                                <button onClick={onClose} className="close-camera-btn">
                                    ✕
                                </button>
                            )}
                        </div>
                        <p>Détection d'âge, genre, émotions avec précision améliorée</p>
                    </div>

                    <div className="camera-container">
                        <div className="video-wrapper">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                style={{ transform: 'scaleX(-1)' }}
                            />

                            <canvas
                                ref={overlayCanvasRef}
                                className="analysis-canvas"
                            />

                            {!isCameraActive && (
                                <div className="camera-overlay">
                                    <div className="overlay-content">
                                        <div className="camera-icon">📷</div>
                                        <p>Caméra inactive</p>
                                        <button
                                            onClick={startCamera}
                                            className="activate-camera-btn"
                                        >
                                            Activer l'Analyse IA
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="camera-controls">
                            {isCameraActive ? (
                                <div className="control-buttons">
                                    {!isAnalyzing ? (
                                        <button onClick={startRealTimeAnalysis} className="control-btn start">
                                            🎯 Démarrer l'analyse temps réel
                                        </button>
                                    ) : (
                                        <button onClick={stopRealTimeAnalysis} className="control-btn stop">
                                            ⏸️ Pause analyse
                                        </button>
                                    )}
                                    <button onClick={stopCamera} className="control-btn stop">
                                        🔴 Arrêter caméra
                                    </button>
                                </div>
                            ) : (
                                <button onClick={startCamera} className="control-btn start">
                                    📷 Activer la caméra IA
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mini mode camera display */}
            {miniMode && (
                <div className="mini-camera-container">
                    <div className="mini-video-wrapper">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ transform: 'scaleX(-1)' }}
                        />
                        <canvas
                            ref={overlayCanvasRef}
                            className="mini-analysis-canvas"
                        />
                        {!isCameraActive && (
                            <div className="mini-camera-overlay">
                                <div className="mini-overlay-content">
                                    <div className="mini-camera-icon">📷</div>
                                    <button
                                        onClick={startCamera}
                                        className="mini-activate-btn"
                                    >
                                        Activer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {isAnalyzing && (
                        <div className="mini-status">
                            <div className="mini-pulse-dot"></div>
                            <span>Analyse active</span>
                        </div>
                    )}
                </div>
            )}

            {/* Enhanced Analysis Results - only show in full mode */}
            {!miniMode && analysisData.faceCount > 0 && (
                <div className="analysis-results">
                    <h4>📊 Analyse Avancée - {analysisData.faceCount} visage(s) détecté(s)</h4>

                    <div className="analysis-status">
                        <div className={`status-indicator ${isAnalyzing ? 'active' : ''}`}>
                            <div className="pulse-dot"></div>
                            <span>
                                {isAnalyzing ? 'Analyse temps réel active' : 'Analyse en pause'}
                            </span>
                        </div>
                        {analysisData.lastUpdate && (
                            <small>Dernière mise à jour: {analysisData.lastUpdate}</small>
                        )}
                    </div>

                    <div className="faces-analysis">
                        {analysisData.faces.map((face, index) => (
                            <div key={index} className="face-analysis-card">
                                <h5>👤 Visage {face.faceId}</h5>

                                <div className="results-grid">
                                    {/* Demographic Information */}
                                    <div className="result-card">
                                        <div className="result-icon">🎂</div>
                                        <div className="result-content">
                                            <span className="result-label">Âge estimé</span>
                                            <span className="result-value">
                                                {face.demographics.age}
                                                <small> ({(face.demographics.confidence * 100).toFixed(0)}% confiance)</small>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="result-card">
                                        <div className="result-icon">
                                            {face.demographics.gender === 'male' ? '👨' : '👩'}
                                        </div>
                                        <div className="result-content">
                                            <span className="result-label">Genre</span>
                                            <span className="result-value">
                                                {face.demographics.gender === 'male' ? 'Homme' : 'Femme'}
                                                <small> ({(face.demographics.genderProbability * 100).toFixed(1)}%)</small>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Detection Confidence */}
                                    <div className="result-card">
                                        <div className="result-icon">📊</div>
                                        <div className="result-content">
                                            <span className="result-label">Confiance détection</span>
                                            <span className="result-value">
                                                {(face.detection.score * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Emotion Analysis */}
                                    <div className="result-card wide">
                                        <div className="result-icon">😊</div>
                                        <div className="result-content">
                                            <EmotionChart emotions={face.emotions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!miniMode && analysisData.faceCount === 0 && isAnalyzing && (
                <div className="analysis-results">
                    <h4>🔍 Recherche en cours...</h4>
                    <p>Aucun visage détecté. Ajustez votre position face à la caméra.</p>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default EnhancedAICamera;