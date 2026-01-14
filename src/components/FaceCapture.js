import React, { useRef, useState, useEffect } from 'react';
import { MockFaceService } from '../services/mockData';
import './FaceCapture.css';

const FaceCapture = ({ userId, onScanComplete, isVerification = false }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(isVerification
        ? "Vérification faciale requise. Positionnez votre visage."
        : "Veuillez positionner votre visage dans le cadre et cliquer sur 'Capturer'."
    );
    const [isCameraReady, setIsCameraReady] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const currentStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'user',
                        frameRate: { ideal: 30 }
                    }
                });
                streamRef.current = currentStream;
                if (videoRef.current) {
                    videoRef.current.srcObject = currentStream;

                    videoRef.current.onloadedmetadata = () => {
                        setIsCameraReady(true);
                        setMessage(isVerification 
                            ? "Caméra prête. Positionnez votre visage pour la vérification." 
                            : "Caméra prête. Positionnez votre visage."
                        );
                    };
                }
            } catch (err) {
                setMessage("Impossible d'accéder à la caméra. Veuillez autoriser l'accès.");
                console.error("Erreur d'accès à la caméra :", err);
            }
        };
        startCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [isVerification]);

    const handleCapture = async () => {
        if (!isCameraReady) {
            setMessage("La caméra n'est pas encore prête.");
            return;
        }

        if (isVerification && !userId) {
            setMessage("Erreur : ID utilisateur manquant pour la vérification.");
            return;
        }

        setLoading(true);
        setMessage(isVerification ? "Vérification en cours..." : "Capture en cours...");

        try {
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const captureWidth = videoRef.current.videoWidth;
            const captureHeight = videoRef.current.videoHeight;

            canvas.width = captureWidth;
            canvas.height = captureHeight;

            context.drawImage(videoRef.current, 0, 0, captureWidth, captureHeight);

            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/jpeg', 1.0);
            });

            if (!blob) {
                throw new Error('Échec de la création du blob');
            }

            setMessage(isVerification ? "Vérification..." : "Envoi au serveur...");

            const formData = new FormData();
            formData.append('image', blob, 'face.jpg');
            
            // Use mock face service
            let data;
            if (isVerification) {
                data = await MockFaceService.verifyFace(userId, blob);
            } else {
                data = await MockFaceService.registerFace(userId, blob);
            }
            
            if (isVerification && data.token) {
                // Si c'est une vérification et qu'on a reçu un token
                localStorage.setItem('token', data.token);
                setMessage("✅ Vérification faciale réussie !");
                setTimeout(() => {
                    onScanComplete();
                }, 1500);
            } else {
                setMessage("✅ " + (data.message || 'Opération réussie !'));
                setTimeout(() => {
                    onScanComplete();
                }, 1500);
            }

        } catch (err) {
            if (err.name === 'AbortError') {
                setMessage("❌ L'analyse a pris trop de temps. Veuillez réessayer.");
            } else {
                setMessage(`❌ Erreur : ${err.message}`);
            }
            console.error('Erreur détaillée:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="face-capture-container">
            <h2>{isVerification ? 'Vérification Faciale' : 'Enregistrement Facial'}</h2>
            <div className="video-wrapper">
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    style={{ 
                        width: '100%', 
                        height: '100%',
                        transform: 'scaleX(-1)'
                    }}
                />
                <div className="overlay"></div> 
            </div>
            
            {loading && (
                <div className="progress-indicator">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <p>{isVerification ? 'Vérification en cours...' : 'Analyse en cours...'}</p>
                </div>
            )}
            
            <p className="scan-message">{message}</p>
            
            <button 
                onClick={handleCapture} 
                disabled={loading || !isCameraReady} 
                className="capture-button"
            >
                {loading ? '⏳ Traitement...' : (isVerification ? '🔒 Vérifier' : '📸 Capturer')}
            </button>
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default FaceCapture;