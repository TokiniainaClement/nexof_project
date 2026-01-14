// SECTION 1: Importations des modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

// Importations pour la reconnaissance faciale
const faceapi = require('face-api.js');
const tf = require('@tensorflow/tfjs-node');
const { Canvas, Image, ImageData } = require('canvas');
const { createCanvas, loadImage } = require('canvas');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Set TensorFlow backend explicitly
tf.setBackend('tensorflow');

// SECTION 2: Initialisation et configuration du serveur
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const JWT_SECRET = 'votre_clé_secrète_très_forte_et_unique';

// SECTION 3: Connexion à la base de données et chargement des modèles de l'IA
const DB_URI = 'mongodb://localhost:27017/nexof_db';
const modelsPath = './models'; // Assurez-vous d'avoir un dossier 'models' avec les fichiers nécessaires

mongoose.connect(DB_URI)
    .then(async () => {
        console.log('✅ Connecté à la base de données MongoDB');
        // Ensure TensorFlow backend is ready
        await tf.ready();
        console.log('TensorFlow backend ready');
        // Charger les modèles de face-api.js après la connexion réussie
        return Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromDisk(modelsPath),
            faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath),
            faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath),
            faceapi.nets.faceExpressionNet.loadFromDisk(modelsPath),
            faceapi.nets.ageGenderNet.loadFromDisk(modelsPath)
        ]);
    })
    .then(async () => {
        console.log('🧠 Modèles de reconnaissance faciale chargés.');
    })
    .catch(err => console.error('❌ Erreur de connexion ou de chargement :', err));

// Middleware de vérification de l'authentification (si vous le souhaitez)
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Aucun token, autorisation refusée.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv',
      'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg',
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'text/csv'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  }
});

// Helper functions for enhanced facial analysis
const analyzeDemographics = async (faceCanvas) => {
    const predictions = await faceapi.net.ageGenderNet.predict(faceCanvas);
    return {
        age: predictions.age,
        confidence: predictions.ageConfidence,
        gender: predictions.gender,
        genderProbability: predictions.genderProbability
    };
};

const enhanceEmotionAnalysis = (expressions) => {
    // Normalize and enhance emotion scores
    const total = Object.values(expressions).reduce((sum, val) => sum + val, 0);
    const enhanced = {};
    for (const [emotion, score] of Object.entries(expressions)) {
        enhanced[emotion] = Math.round((score / total) * 100);
    }
    return enhanced;
};

const analyzeFacialLandmarks = (landmarks) => {
    // Extract key facial landmarks
    return {
        jawline: landmarks.getJawOutline(),
        leftEyebrow: landmarks.getLeftEyebrow(),
        rightEyebrow: landmarks.getRightEyebrow(),
        nose: landmarks.getNose(),
        leftEye: landmarks.getLeftEye(),
        rightEye: landmarks.getRightEye(),
        mouth: landmarks.getMouth()
    };
};

// SECTION 4: Définition des routes de l'API

// Route d'inscription - Renvoie l'ID de l'utilisateur
app.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
        return res.status(400).json({ message: 'Email et un mot de passe de 6 caractères minimum sont requis.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Cette adresse e-mail est déjà utilisée.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        console.log(`Nouvel utilisateur créé : ${newUser.email}`);
        res.status(201).json({ message: 'Compte créé avec succès !', userId: newUser._id });
    } catch (error) {
        console.error('Erreur lors de la création :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route de registration faciale - Optimisée
app.post('/api/auth/face-register', upload.single('image'), async (req, res) => {
    console.time('face-register'); // Mesure du temps
    
    try {
        const userId = req.body.userId;
        const imageBuffer = req.file.buffer;

        if (!imageBuffer || !userId) {
            return res.status(400).json({ message: 'Données manquantes.' });
        }

        // Vérification rapide de l'utilisateur
        const user = await User.findById(userId).select('faceDescriptors');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Chargement optimisé de l'image
        const img = new Image();
        img.onload = async () => {
            try {
                // Options de détection optimisées
                const detectionOptions = new faceapi.TinyFaceDetectorOptions({
                    inputSize: 512, // Taille augmentée pour plus de précision
                    scoreThreshold: 0.5 // Seuil plus strict pour meilleure qualité
                });

                console.time('face-detection');
                const detections = await faceapi.detectSingleFace(img, detectionOptions)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                console.timeEnd('face-detection');

                if (!detections) {
                    return res.status(400).json({ message: "Aucun visage détecté. Veuillez réessayer." });
                }
                
                // Sauvegarde optimisée
                user.faceDescriptors = Array.from(detections.descriptor);
                await user.save();
                
                console.timeEnd('face-register');
                res.status(200).json({ message: 'Reconnaissance faciale enregistrée avec succès !' });

            } catch (error) {
                console.timeEnd('face-register');
                console.error('Erreur lors de la détection faciale :', error);
                res.status(500).json({ message: 'Erreur lors de l\'analyse faciale.' });
            }
        };

        img.onerror = () => {
            console.timeEnd('face-register');
            res.status(400).json({ message: 'Image invalide.' });
        };

        img.src = imageBuffer;

    } catch (error) {
        console.timeEnd('face-register');
        console.error('Erreur générale :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route de connexion - Étape 1: vérification du mot de passe
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }
        // Si l'utilisateur n'a pas de descripteurs, on peut le connecter directement
        if (!user.faceDescriptors || user.faceDescriptors.length === 0) {
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Connexion réussie', token });
        }
        // Sinon, on demande une vérification faciale
        res.status(200).json({ message: 'Vérification faciale requise.', requireFaceScan: true, userId: user._id });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route de vérification faciale optimisée
app.post('/api/auth/face-verify', upload.single('image'), async (req, res) => {
    console.time('face-verify');
    
    try {
        const userId = req.body.userId;
        const imageBuffer = req.file.buffer;

        if (!imageBuffer || !userId) {
            return res.status(400).json({ message: 'Données manquantes.' });
        }

        // Vérification rapide de l'utilisateur
        const user = await User.findById(userId);
        if (!user || !user.faceDescriptors || user.faceDescriptors.length === 0) {
            return res.status(400).json({ message: 'Données faciales non enregistrées.' });
        }

        // Chargement et traitement optimisé
        const img = new Image();
        img.src = imageBuffer;
        
        // Options de détection optimisées pour la vérification
        const detectionOptions = new faceapi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.5
        });

        console.time('detection');
        const detections = await faceapi.detectSingleFace(img, detectionOptions)
            .withFaceLandmarks()
            .withFaceDescriptor();
        console.timeEnd('detection');

        if (!detections) {
            return res.status(400).json({ message: "Aucun visage détecté. Veuillez réessayer." });
        }

        // Comparaison avec seuil ajusté
        const storedDescriptor = new Float32Array(user.faceDescriptors);
        const distance = faceapi.euclideanDistance(storedDescriptor, detections.descriptor);

        console.log('Distance de similarité:', distance);

        // Seuil optimisé pour meilleure précision
        if (distance > 0.35) {
            return res.status(400).json({ message: "Échec de la vérification faciale. Visage non reconnu." });
        }

        // Succès - générer le token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        
        console.timeEnd('face-verify');
        res.status(200).json({ 
            message: 'Vérification faciale réussie', 
            token,
            similarity: (1 - distance).toFixed(2)
        });

    } catch (error) {
        console.timeEnd('face-verify');
        console.error('Erreur lors de la vérification faciale :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Enhanced face analysis route with age, gender, and emotion detection
app.post('/api/ai/analyze-face-enhanced', upload.single('image'), async (req, res) => {
    console.time('enhanced-face-analysis');
    
    try {
        const imageBuffer = req.file.buffer;
        
        if (!imageBuffer) {
            return res.status(400).json({ message: 'Aucune image fournie.' });
        }

        // Load and process image
        const img = await loadImage(imageBuffer);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Enhanced face detection with multiple models
        const detectionOptions = new faceapi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.4
        });

        console.time('full-detection');
        const detections = await faceapi
            .detectAllFaces(canvas, detectionOptions)
            .withFaceLandmarks()
            .withFaceDescriptors()
            .withFaceExpressions();
        console.timeEnd('full-detection');

        if (detections.length === 0) {
            return res.status(200).json({ 
                message: 'Aucun visage détecté', 
                faceCount: 0,
                analysis: [] 
            });
        }

        // Enhanced analysis for each detected face
        const analysis = await Promise.all(detections.map(async (detection, index) => {
            // Extract face region for detailed analysis
            const faceBox = detection.detection.box;
            const faceCanvas = createCanvas(faceBox.width, faceBox.height);
            const faceCtx = faceCanvas.getContext('2d');
            faceCtx.drawImage(
                canvas, 
                faceBox.x, faceBox.y, faceBox.width, faceBox.height,
                0, 0, faceBox.width, faceBox.height
            );

            // Enhanced demographic and emotion analysis
            const demographics = await analyzeDemographics(faceCanvas);
            const enhancedEmotions = enhanceEmotionAnalysis(detection.expressions);
            const landmarks = analyzeFacialLandmarks(detection.landmarks);

            return {
                faceId: index + 1,
                detection: {
                    score: detection.detection.score,
                    box: {
                        x: faceBox.x,
                        y: faceBox.y,
                        width: faceBox.width,
                        height: faceBox.height
                    }
                },
                demographics: {
                    age: demographics.age,
                    ageConfidence: demographics.confidence,
                    gender: demographics.gender,
                    genderProbability: demographics.genderProbability
                },
                emotions: enhancedEmotions,
                landmarks: landmarks,
                timestamp: new Date().toISOString()
            };
        }));

        console.timeEnd('enhanced-face-analysis');
        
        res.status(200).json({
            message: `${detections.length} visage(s) analysé(s)`,
            faceCount: detections.length,
            analysis: analysis,
            processingTime: console.timeEnd('enhanced-face-analysis')
        });

    } catch (error) {
        console.timeEnd('enhanced-face-analysis');
        console.error('Erreur analyse faciale avancée:', error);
        res.status(500).json({ message: 'Erreur lors de l\'analyse faciale avancée.' });
    }
});



// User profile route
app.get('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});




// SECTION 5: Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
    console.log(`📡 WebSocket server ready for real-time presence and messaging`);
});
