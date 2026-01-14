# Feuille de Route du Projet NEXOF

## Vue d'ensemble

NEXOF est une application sociale IA de pointe qui révolutionne les interactions sociales grâce à une reconnaissance faciale avancée, une communication en temps réel et des fonctionnalités immersives alimentées par l'IA. La plateforme combine des technologies web modernes avec l'intelligence artificielle pour créer une expérience de réseautage social unique mettant en vedette des interfaces holographiques 3D, des systèmes de chat en temps réel et une analyse de caméra intelligente.

**Statut actuel** : En développement actif avec une architecture backend Symfony PHP, intégration MongoDB en cours et frontend React avec des composants UI avancés.

---

## 🎯 Vision du Projet

NEXOF vise à créer la prochaine génération de plateformes sociales en intégrant :
- **Authentification biométrique** : Reconnaissance faciale pour une connexion sécurisée et transparente
- **Fonctionnalités sociales alimentées par l'IA** : Analyse de contenu intelligente, recommandations et automatisation
- **Interface 3D immersive** : Environnements holographiques alimentés par Three.js
- **Communication en temps réel** : Chat basé sur WebSocket avec fonctionnalités avancées
- **Conception axée sur la confidentialité** : Données contrôlées par l'utilisateur et traitement IA

---

## 📊 Statut d'Implémentation Actuel

### ✅ Fonctionnalités Terminées

#### Système d'Authentification Core
- Inscription et connexion par email/mot de passe
- Enregistrement et vérification de reconnaissance faciale utilisant TensorFlow.js
- Stockage et algorithmes de comparaison de descripteurs faciaux
- Authentification multi-modale (traditionnelle + biométrique)

#### Architecture Frontend (React)
- React moderne 18.3.1 avec hooks et fonctionnalités concurrentes
- Conception responsive avec Tailwind CSS et composants Radix UI
- Intégration graphique 3D avec Three.js et React Three Fiber
- Système de thème (mode sombre/clair) avec transitions fluides
- Capacités d'application web progressive

#### Interface Utilisateur 3D
- Animations de cube holographique pour l'intégration
- Environnements 3D interactifs avec contrôles orbitaux
- Transitions et animations alimentées par GSAP
- Séquences d'accueil immersives

#### Fonctionnalités de Caméra IA
- Détection et analyse faciale en temps réel
- Reconnaissance d'âge, de genre et d'émotion
- Détection de repères faciaux
- Traitement de flux de caméra en direct avec optimisation des performances

#### Fondation de Communication en Temps Réel
- Intégration Socket.io pour une communication bidirectionnelle
- Infrastructure de chat de base avec envoi/réception de messages
- Suivi de présence utilisateur (statut en ligne/hors ligne)
- Fondation WebRTC pour les appels vidéo futurs

### 🔄 En Cours (Phase 2 : Implémentation Backend Symfony Complète)

#### Configuration d'Architecture Backend Symfony
- Migration complète vers Symfony 7.3 avec PHP 8.4
- Intégration MongoDB avec Doctrine ODM
- Authentification JWT avec Lexik JWT Bundle
- Architecture API RESTful avec API Platform
- Implémentation de serveur WebSocket avec ReactPHP ou Symfony WebSocket Bundle

#### Implémentation d'Entités et Services Core
- Entité utilisateur avec stockage de descripteurs faciaux
- Entités de conversation et de message pour le système de chat
- Entité de fichier pour la gestion de médias
- Couche de service pour la logique métier (services Auth, Chat, IA, Fichier)
- Pattern repository pour l'accès aux données

#### Configuration de Communication Temps Réel
- Serveur WebSocket pour la messagerie en temps réel
- Système de présence pour le statut en ligne/hors ligne
- Indicateurs de saisie et statut de message
- Fonctionnalité de chat de groupe
- Capacités de partage de fichiers

---

## 🚀 Fonctionnalités Core en Détail

### 🤖 Fonctionnalités IA

#### Reconnaissance et Analyse Faciale
- **Enregistrement Facial** : Capture faciale multi-angles avec validation de qualité
- **Vérification Faciale** : Authentification en temps réel avec objectif de précision >95%
- **Analyse Avancée** : Estimation d'âge, détection de genre, reconnaissance d'émotion
- **Repères Faciaux** : Cartographie de 68 points de caractéristiques faciales pour une analyse détaillée
- **Score de Similarité** : Algorithmes de comparaison faciale pour l'appariement utilisateur

#### Caméra Alimentée par l'IA
- **Traitement en Temps Réel** : Analyse de flux vidéo en direct à 30+ FPS
- **Détection d'Émotion** : 7 catégories d'émotion (heureux, triste, en colère, etc.)
- **Analyse Démographique** : Plage d'âge et score de probabilité de genre
- **Suivi d'Expression** : Surveillance continue des émotions
- **Optimisation des Performances** : Traitement de frame efficace avec accélération WebGL

#### Améliorations IA Futures
- **Analyse de Sentiment** : Analyse émotionnelle du contenu des messages
- **Modération de Contenu** : Détection automatisée de contenu inapproprié
- **Recommandations Intelligentes** : Suggestions d'amis basées sur les patterns d'interaction
- **Voix vers Texte** : Reconnaissance vocale pour les messages vocaux
- **Reconnaissance d'Image** : Détection d'objets et de scènes dans les photos

### 💬 Système de Chat

#### Fonctionnalités de Chat Actuelles
- **Messagerie en Temps Réel** : Livraison instantanée de messages alimentée par WebSocket
- **Types de Messages** : Support texte, image, fichier et message vocal
- **Présence Utilisateur** : Indicateurs de statut en ligne/hors ligne
- **Indicateurs de Saisie** : Affichage de statut de saisie en temps réel
- **Statut de Message** : Accusés de réception envoyés, livrés, lus

#### Fonctionnalités de Chat Avancées (Planifiées)
- **Chats de Groupe** : Support de conversation multi-utilisateur
- **Réactions de Messages** : Réactions emoji sur les messages
- **Planification de Messages** : Envoi de messages à des heures spécifiées
- **Partage de Fichiers** : Téléchargements par glisser-déposer avec suivi de progression
- **Messages Vocaux** : Enregistrement et lecture audio
- **Appels Vidéo** : Communication vidéo peer-to-peer basée sur WebRTC
- **Partage d'Écran** : Partage de bureau pendant les appels
- **Analyses de Chat** : Statistiques et insights de messages

#### Composants UI de Chat
- **Mise en Page Responsive** : Conception à trois panneaux (barre latérale, chat, détails)
- **Optimisation Mobile** : Interactions tactiles et gestes
- **Fonctionnalité de Recherche** : Recherche de messages et d'utilisateurs
- **Système de Notification** : Notifications push du navigateur pour les nouveaux messages
- **Intégration de Thème** : Thématisation cohérente dans l'interface de chat

### 📅 Fonctionnalités d'Agenda et de Planification

#### Planification de Messages
- **Livraison de Messages Futurs** : Planifier des messages pour un envoi ultérieur
- **Messages Récurrents** : Envoi périodique automatisé de messages
- **Système de Rappels** : Rappels personnels et de groupe
- **Intégration Calendrier** : Synchronisation avec des services de calendrier externes

#### Gestion d'Événements (Futur)
- **Événements de Groupe** : Planifier et gérer des événements sociaux
- **Coordination de Réunions** : Vote sur les créneaux horaires et vérification de disponibilité
- **Invitations d'Événements** : Système d'invitation automatisé
- **Suivi RSVP** : Collecte et gestion des réponses

### 🎮 Jeux et Fonctionnalités Interactives

#### Fonctionnalités de Jeux Planifiées
- **Mini-Jeux** : Jeux occasionnels intégrés dans le chat
- **Jeux Alimentés par l'IA** : Jeux qui s'adaptent au comportement de l'utilisateur
- **Jeux Sociaux** : Jeux multijoueurs avec des amis
- **Système de Réalisations** : Éléments de gamification et récompenses
- **Création de Jeux Personnalisés** : Outils de contenu généré par l'utilisateur

#### Éléments Interactifs
- **Sondages et Enquêtes** : Vote en temps réel dans les conversations
- **Jeux Trivia** : Questions trivia générées par l'IA
- **Brise-Glace** : Activités de démarrage de conversation
- **Quiz de Personnalité** : Évaluations de personnalité alimentées par l'IA

### ⚙️ Paramètres et Options de Personnalisation

#### Paramètres Utilisateur
- **Gestion de Profil** : Avatar, bio et informations personnelles
- **Contrôles de Confidentialité** : Paramètres de confidentialité granulaires pour le partage de données
- **Préférences de Notification** : Paramètres de notification personnalisables
- **Personnalisation de Thème** : Mode sombre/clair avec options de couleur d'accent
- **Paramètres de Langue** : Support multi-langue

#### Paramètres de Chat
- **Préférences de Conversation** : Paramètres de notification par chat
- **Paramètres Média** : Préférences de téléchargement automatique
- **Paramètres de Sécurité** : Options de chiffrement de bout en bout
- **Gestion du Stockage** : Paramètres de rétention de l'historique des messages

#### Paramètres IA
- **Reconnaissance Faciale** : Préférences de sensibilité et de précision
- **Permissions Caméra** : Contrôles d'accès à la caméra granulaires
- **Utilisation des Données** : Contrôles d'opt-in/opt-out pour le traitement IA
- **Personnalisation** : Préférences de recommandation IA

---

## 🎨 Aspects Frontend

### Pile Technologique

#### Dépendances Frontend (70+ paquets)
Le frontend React utilise un ensemble complet de dépendances organisées par catégorie :

**Framework Core & Routage**
- **React 18.3.1** : React moderne avec fonctionnalités concurrentes
- **React DOM 18.3.1** : Rendu React pour le web
- **React Router DOM 7.9.1** : Routage côté client
- **React Scripts 5.0.1** : Outils de construction et serveur de développement

**Interface Utilisateur & Style (20+ paquets)**
- **Tailwind CSS 3.4.17** : Framework CSS utility-first
- **Composants Radix UI** : Primitives UI accessibles (accordion, dialog, dropdown-menu, etc.)
- **Lucide React 0.539.0** : Bibliothèque d'icônes moderne
- **Framer Motion 12.23.12** : Bibliothèque d'animation
- **GSAP 3.13.0** : Animations haute performance
- **Material-UI 7.3.2** : Bibliothèque de composants supplémentaire

**Gestion d'État & Données**
- **TanStack Query 5.84.2** : Synchronisation de données puissante
- **Socket.io Client 4.8.1** : Communication en temps réel
- **React Hook Form 7.62.0** : Gestion de formulaires
- **Next Themes 0.4.6** : Gestion de thèmes

**Graphismes 3D & IA**
- **Three.js 0.176.0** : Bibliothèque de graphismes 3D
- **React Three Fiber 8.18.0** : Rendu React Three.js
- **React Three Drei 9.122.0** : Assistants Three.js
- **TensorFlow.js 4.22.0** : Apprentissage automatique dans le navigateur
- **@tensorflow-models/face-landmarks-detection 1.0.6** : Détection de visages

**Bibliothèques Supplémentaires**
- **Firebase 12.2.1** : Services backend
- **Phaser 3.90.0** : Framework de jeu
- **Date-fns 4.1.0** : Utilitaires de dates
- **Recharts 2.12.7** : Bibliothèque de graphiques
- **Sonner 1.7.4** : Notifications toast

**Développement & Tests**
- **TypeScript 4.9.5** : Vérification de types
- **Testing Library** : Utilitaires de test de composants
- **PostCSS 8.5.6** : Traitement CSS
- **Autoprefixer 10.4.21** : Préfixes CSS vendor

### Architecture de Composants
- **Conception Modulaire** : Organisation de composants basée sur les fonctionnalités
- **Hooks Personnalisés** : Logique stateful encapsulée (useChat, useSocket, etc.)
- **Bibliothèque de Composants UI** : Système de conception cohérent avec 20+ composants
- **Mise en Page Responsive** : Conception mobile-first avec points d'arrêt adaptatifs
- **Optimisé pour les Performances** : Fractionnement de code, chargement paresseux et mémorisation

### Focus sur l'Expérience Utilisateur
- **Navigation Intuitive** : Hiérarchie d'informations claire
- **Animations Fluides** : Animations 60fps avec accélération matérielle
- **Accessibilité** : Conforme WCAG avec navigation clavier
- **Amélioration Progressive** : Fonctionnalité core sans JavaScript
- **Support Hors Ligne** : Mise en cache service worker et capacités hors ligne

### Stratégie de Test

#### Prérequis de Test
```bash
npm install  # Installer toutes les dépendances incluant les bibliothèques de test
```

#### Exécution des Tests
```bash
# Exécuter tous les tests en mode watch interactif
npm test

# Exécuter les tests une fois avec couverture
npm test -- --watchAll=false --coverage

# Exécuter un fichier de test spécifique
npm test -- --testPathPattern=LoginForm.test.js
```

#### Types de Tests

**Tests Unitaires**
Tester des composants et hooks individuels :
```javascript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('affiche le bouton avec le texte', () => {
  render(<Button>Cliquez-moi</Button>);
  expect(screen.getByText('Cliquez-moi')).toBeInTheDocument();
});
```

**Tests de Composants**
Tester le comportement des composants et les interactions utilisateur :
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

test('gère la soumission du formulaire', () => {
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.click(screen.getByText('Connexion'));

  expect(mockSubmit).toHaveBeenCalled();
});
```

**Tests de Hooks**
Tester les hooks personnalisés avec `renderHook` :
```javascript
import { renderHook, act } from '@testing-library/react';
import useChat from './useChat';

test('envoie un message via socket', () => {
  const { result } = renderHook(() => useChat('token'));

  act(() => {
    result.current.sendMessage('conv1', 'Bonjour');
  });

  expect(result.current.messages).toContain('Bonjour');
});
```

**Tests d'Intégration**
Tester des flux utilisateur complets à travers plusieurs composants.

**Tests E2E**
Utiliser Cypress pour les tests de bout en bout (lorsqu'ils sont configurés).

#### Couverture de Test
Générer des rapports de couverture pour assurer la qualité du code :
```bash
npm test -- --coverage --watchAll=false
```

#### Stratégie de Mock
- **Mocks API** : `src/services/mockData.js` pour les réponses backend
- **Mocks Socket** : Connexions WebSocket simulées
- **APIs Navigateur** : Simuler la caméra, la géolocalisation et d'autres APIs navigateur

---

## 🔧 Aspects Backend

### Architecture Backend Double

#### Backend Principal : Symfony PHP (Actuel)
- **Framework** : Symfony 7.3 avec PHP 8.4
- **Base de Données** : MongoDB avec Doctrine ODM
- **Authentification** : Bundle d'Authentification JWT Lexik
- **API** : API RESTful avec réponses JSON
- **Sécurité** : Bundle Nelmio CORS et meilleures pratiques de sécurité

#### Backend Legacy : Node.js Express
- **Runtime** : Node.js avec framework Express.js
- **Base de Données** : MongoDB avec ODM Mongoose
- **Authentification** : JWT avec bcryptjs
- **IA/ML** : TensorFlow.js avec intégration face-api.js
- **Temps Réel** : Implémentation serveur Socket.io

### Architecture API
- **Conception RESTful** : Points de terminaison API basés sur les ressources
- **Versioning** : Versioning API pour la compatibilité ascendante
- **Limitation de Taux** : Limitation et prévention des abus de requêtes
- **Mise en Cache** : Intégration Redis pour l'optimisation des performances
- **Documentation** : Documentation OpenAPI/Swagger

### Implémentation de Sécurité
- **Authentification JWT** : Authentification stateless avec jetons de rafraîchissement
- **Sécurité de Reconnaissance Faciale** : Stockage sécurisé de descripteurs faciaux
- **Chiffrement des Données** : Chiffrement de bout en bout pour les communications sensibles
- **Configuration CORS** : Partage de ressources cross-origin approprié
- **Validation d'Entrée** : Validation et assainissement côté serveur

### Intégration Backend Future (Symfony + MongoDB)

#### Structure du Projet Symfony
```
backend/symfony-backend/
├── config/
│   ├── packages/          # Configuration des bundles Symfony
│   ├── routes/           # Définitions des routes API
│   └── services.yaml     # Conteneur d'injection de dépendances
├── src/
│   ├── Controller/       # Contrôleurs API
│   │   ├── AuthController.php
│   │   ├── ChatController.php
│   │   ├── FileController.php
│   │   └── UserController.php
│   ├── Document/         # Documents Doctrine MongoDB ODM
│   │   ├── User.php
│   │   ├── Message.php
│   │   ├── Conversation.php
│   │   └── File.php
│   ├── Service/          # Services de logique métier
│   │   ├── AuthService.php
│   │   ├── ChatService.php
│   │   └── AIService.php
│   └── Security/         # Composants de sécurité
├── public/               # Actifs publics
├── var/                  # Cache, logs, sessions
└── vendor/               # Dépendances Composer
```

#### Composants Symfony Clés
- **API Platform** : Génération automatique d'API REST avec docs OpenAPI
- **Doctrine MongoDB ODM** : Mapping objet-document pour MongoDB
- **Lexik JWT Authentication** : Authentification par jeton sécurisée
- **Mercure** : Mises à jour en temps réel via Server-Sent Events
- **VichUploaderBundle** : Gestion des téléchargements de fichiers

#### Schéma des Collections MongoDB
```javascript
// collection users
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password": "$argon2id$...",
  "faceEmbedding": [0.1, 0.2, 0.3, ...],
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "path/to/avatar.jpg"
  },
  "settings": {
    "theme": "dark",
    "notifications": true
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z")
}

// collection messages
{
  "_id": ObjectId("..."),
  "conversationId": ObjectId("..."),
  "senderId": ObjectId("..."),
  "content": "Bonjour, monde !",
  "type": "text",
  "metadata": {
    "fileUrl": "path/to/file.jpg",
    "fileSize": 1024000
  },
  "reactions": [
    { "emoji": "👍", "userId": ObjectId("...") }
  ],
  "createdAt": ISODate("2024-01-01T00:00:00Z")
}
```

#### Avantages d'Intégration
- **Flexibilité MongoDB** : Stockage de documents NoSQL parfait pour les données complexes et imbriquées
- **Robustesse Symfony** : Framework PHP de niveau entreprise avec excellente sécurité
- **Fonctionnalités Temps Réel** : Support intégré pour WebSockets et Server-Sent Events
- **Évolutivité** : Mise à l'échelle horizontale avec mise en cache et file d'attente appropriées
- **Documentation API** : Génération automatique de documentation OpenAPI/Swagger

#### Étapes de Configuration (Implémentation Future)
1. Créer un projet Symfony : `composer create-project symfony/skeleton backend/symfony-backend`
2. Installer les dépendances : `composer require api-platform/core doctrine/mongodb-odm-bundle lexik/jwt-authentication-bundle mercure`
3. Configurer MongoDB : Mettre à jour `DATABASE_URL=mongodb://localhost:27017/nexof` dans `.env`
4. Créer des entités et des points de terminaison API
5. Implémenter l'authentification et les fonctionnalités temps réel
6. Déployer et connecter au frontend React

---

## 📈 Feuille de Route de Développement

### Phase 2 : Implémentation Backend Symfony Complète 
- [ ] Configuration complète du projet Symfony 7.3 avec MongoDB
- [ ] Implémentation des entités User, Conversation, Message et File avec Doctrine ODM
- [ ] Création des services AuthService, ChatService, AIService, FileService, NotificationService
- [ ] Configuration de l'authentification JWT avec le bundle Lexik
- [ ] Implémentation du serveur WebSocket pour les fonctionnalités temps réel
- [ ] Création des points de terminaison API REST pour toutes les fonctionnalités
- [ ] Configuration du système de téléchargement de fichiers avec validation
- [ ] Implémentation des services de reconnaissance faciale et traitement IA
- [ ] Création des migrations de base de données et seeders
- [ ] Configuration du framework de tests et écriture des tests unitaires

### Phase 3 : Implémentation des Fonctionnalités Core 

#### Système d'Analyse IA
- [ ] Implémentation des algorithmes de détection et reconnaissance faciale
- [ ] Création du service de détection d'émotion (7 catégories d'émotion)
- [ ] Développement de la fonctionnalité d'estimation d'âge et de genre
- [ ] Construction du système de cartographie de repères faciaux (68 points)
- [ ] Implémentation du score de similarité faciale et d'appariement
- [ ] Création du pipeline de traitement de caméra en temps réel
- [ ] Ajout de mise en cache de modèles IA et optimisation des performances
- [ ] Construction du système de stockage et récupération de descripteurs faciaux

#### Système de Chat Développement
- [ ] Implémentation de la messagerie en temps réel avec WebSocket
- [ ] Création de la gestion de conversations (direct et groupe)
- [ ] Construction des types de messages (texte, image, fichier, voix, vidéo)
- [ ] Ajout d'indicateurs de saisie et système de présence
- [ ] Implémentation des réactions de messages et statuts (envoyé/livré/lu)
- [ ] Création du partage de fichiers avec suivi de progression
- [ ] Construction de la recherche de messages et filtrage
- [ ] Ajout de la planification de messages et rappels
- [ ] Implémentation des analyses de chat et statistiques

#### Paramètres et Personnalisation
- [ ] Création du système de gestion de profil utilisateur
- [ ] Implémentation des paramètres de thème (mode sombre/clair)
- [ ] Construction des préférences de notification
- [ ] Ajout de contrôles de confidentialité et paramètres de partage de données
- [ ] Création de contrôles de sensibilité et permission IA
- [ ] Implémentation de la sélection de langue et localisation
- [ ] Construction des paramètres de sécurité de compte
- [ ] Ajout d'exportation de données et suppression de compte

#### Système d'Agenda et Planification
- [ ] Implémentation de la fonctionnalité de planification de messages
- [ ] Création du système de messages récurrents
- [ ] Construction du système de rappels et notifications
- [ ] Ajout d'intégration calendrier
- [ ] Implémentation de création et gestion d'événements
- [ ] Construction du système RSVP et invitations

### Phase 4 : Jeux et Fonctionnalités Interactives 

#### Système de Mini-Jeux
- [ ] Création du framework de jeu et classes de base
- [ ] Implémentation du jeu trivia avec questions générées par IA
- [ ] Construction d'activités brise-glace et démarreurs de conversation
- [ ] Ajout de quiz de personnalité
- [ ] Création de jeux de dessin collaboratif
- [ ] Implémentation de jeux de mots et puzzles
- [ ] Construction de mini-jeux de temps de réaction
- [ ] Ajout du système de réalisations et scores

#### Fonctionnalités de Jeux Sociaux
- [ ] Implémentation de sessions de jeu multijoueur
- [ ] Création d'invitations de jeu et matchmaking
- [ ] Construction de statistiques de jeu et classements
- [ ] Ajout de partage social des résultats de jeu
- [ ] Implémentation de défis de jeu et compétitions
- [ ] Création d'outils de création de jeu personnalisé
- [ ] Construction d'historique de jeu et relecture

#### Éléments Interactifs
- [ ] Implémentation de sondages et enquêtes dans les chats
- [ ] Création de systèmes de vote pour les décisions
- [ ] Construction d'outils de brainstorming collaboratif
- [ ] Ajout de quiz interactifs et évaluations
- [ ] Implémentation de tableaux blancs collaboratifs
- [ ] Création de tableaux d'humeur et partage d'idées

### Phase 5 : Fonctionnalités Avancées et Mobile 

#### Application Mobile (React Native)
- [ ] Configuration du projet React Native
- [ ] Implémentation du flux d'authentification pour mobile
- [ ] Création d'interface de chat optimisée mobile
- [ ] Construction d'intégration caméra pour fonctionnalités IA
- [ ] Ajout de notifications push pour mobile
- [ ] Implémentation de mise en file d'attente de messages hors ligne
- [ ] Création de composants UI spécifiques mobile
- [ ] Ajout d'authentification biométrique (empreinte digitale/visage ID)

#### Fonctionnalités de Réseautage Social
- [ ] Implémentation du système d'amis (demandes, accepter/refuser)
- [ ] Création de découverte et appariement utilisateur
- [ ] Construction de flux d'activités et chronologies
- [ ] Ajout de mises à jour de statut et stories
- [ ] Implémentation de fonctionnalités de partage social
- [ ] Création de formation de groupes et communautés
- [ ] Construction d'analyses sociales et insights

#### Intégrations Tierces
- [ ] Intégration avec plateformes de médias sociaux
- [ ] Ajout de services de stockage cloud (Google Drive, Dropbox)
- [ ] Implémentation d'intégrations calendrier
- [ ] Création de synchronisation email et contacts
- [ ] Construction de système de paiement
- [ ] Ajout de plateformes d'analyses (Google Analytics)
- [ ] Implémentation de système webhook pour services externes

#### IA et Analyses Avancées
- [ ] Construction du moteur de recommandation pour contenu
- [ ] Implémentation d'analyse de sentiment avancée
- [ ] Création d'analyses comportementales et insights
- [ ] Ajout de modération de contenu et sécurité
- [ ] Construction d'assistants IA personnalisés
- [ ] Implémentation de suggestions de contenu intelligent
- [ ] Création de tableau de bord d'analyses d'utilisation

---

## 🎯 Métriques de Succès

### Métriques Techniques
- **Performance** : <100ms temps de réponse API, <3s chargement initial
- **Fiabilité** : 99,9% de disponibilité, garantie de livraison de 100% des messages
- **Sécurité** : >95% précision de reconnaissance faciale, gestion sécurisée des données
- **Évolutivité** : Support de 10 000+ utilisateurs simultanés

### Métriques d'Expérience Utilisateur
- **Engagement** : 70% de rétention d'utilisateurs actifs mensuels
- **Satisfaction** : Note 4,5+ étoiles sur l'App Store
- **Adoption** : 50% des utilisateurs utilisant régulièrement la reconnaissance faciale
- **Utilisation des Fonctionnalités** : 80% d'engagement avec les fonctionnalités de caméra IA

---

## 🔮 Innovations Futures

### Intégration de Technologies Émergentes
- **Fonctionnalités Web3** : Vérification d'identité basée sur blockchain
- **Améliorations AR/VR** : Filtres faciaux en réalité augmentée
- **IA Edge** : Traitement IA sur appareil pour la confidentialité
- **IA Vocale** : Synthèse et reconnaissance vocale avancées

### Fonctionnalités Sociales Avancées
- **Appariement Intelligent** : Recommandations d'amis et de groupes alimentées par l'IA
- **Création de Contenu** : Génération de contenu assistée par l'IA
- **Construction de Communauté** : Formation de groupes basée sur les intérêts
- **Monétisation** : Fonctionnalités premium et économie créateur

### Recherche et Développement
- **IA Émotionnelle** : Reconnaissance émotionnelle multi-modale avancée
- **Analyses Comportementales** : Prédiction et insights du comportement utilisateur
- **IA Respectueuse de la Confidentialité** : Approches d'apprentissage fédéré
- **Synchronisation Cross-Platform** : Expérience transparente sur tous les appareils

---

## 👥 Équipe et Ressources

### Équipe de Développement
- **Développeurs Frontend** : Spécialistes React avec expérience en graphismes 3D
- **Développeurs Backend** : Experts Symfony PHP avec expérience MongoDB
- **Ingénieurs IA/ML** : Spécialistes en vision par ordinateur et apprentissage automatique
- **Concepteurs UI/UX** : Experts en expérience utilisateur et conception d'interface
- **Ingénieurs DevOps** : Spécialistes en infrastructure cloud et déploiement

### Partenaires Technologiques
- **Frameworks IA** : TensorFlow.js, face-api.js
- **Graphismes 3D** : Three.js, React Three Fiber
- **Communication Temps Réel** : Socket.io, WebRTC
- **Base de Données** : MongoDB avec Doctrine ODM
- **Services Cloud** : AWS, DigitalOcean, MongoDB Atlas

---

## 📞 Support et Communauté

### Ressources Développeur
- **Documentation** : Documentation complète d'API et de composants
- **Exemples de Code** : Implémentations d'exemple et meilleures pratiques
- **Forum Communautaire** : Discussion et support pour développeurs
- **Suivi des Problèmes** : Issues GitHub pour rapports de bugs et demandes de fonctionnalités

### Support Utilisateur
- **Centre d'Aide** : Guides utilisateur et ressources de dépannage
- **Système de Feedback** : Collecte et analyse de feedback utilisateur
- **Tests Bêta** : Programmes d'accès anticipé pour les nouvelles fonctionnalités
- **Construction de Communauté** : Communautés utilisateur et fonctionnalités sociales

---

## 🏗️ Structure de l'Application

### Structure Actuelle

```
social-ai-app/
├── public/                 # Actifs statiques
├── src/                    # Frontend React
│   ├── components/         # Composants React
│   │   ├── chat/          # Composants liés au chat
│   │   ├── ui/            # Composants UI réutilisables
│   │   └── ...            # Composants spécifiques aux fonctionnalités
│   ├── hooks/              # Hooks React personnalisés
│   ├── lib/                # Fonctions utilitaires
│   ├── images/             # Actifs statiques
│   ├── styles/             # Feuilles de style supplémentaires
│   ├── App.js              # Composant d'application principal
│   ├── index.js            # Point d'entrée de l'application
│   └── reportWebVitals.js   # Surveillance des performances
├── backend/                # Services backend
│   ├── symfony-backend/    # Backend Symfony PHP
│   ├── routes/             # Routes Node.js
│   ├── middleware/         # Middleware Node.js
│   └── uploads/            # Téléchargements de fichiers
├── package.json            # Dépendances frontend
└── README.md              # Ce fichier
```

### Structure Future (Phase 3-5)

#### Améliorations Frontend
- **Composants IA Avancés** : Modules pour l'analyse faciale en temps réel
- **Bibliothèque de Jeux** : Composants pour les mini-jeux intégrés
- **Système de Notifications** : Interface pour les notifications push
- **Gestionnaire de Fichiers** : Composants de téléchargement avec aperçu

#### Architecture Backend Étendue
- **Services Micro** : Décomposition en services spécialisés (auth, chat, IA)
- **API GraphQL** : Couche API flexible pour les requêtes complexes
- **Mise en Cache** : Couche Redis pour les données fréquemment consultées
- **Traitement Asynchrone** : Files d'attente pour les tâches lourdes (analyse IA)

#### Infrastructure Cloud
- **Conteneurs Docker** : Images pour tous les services
- **Orchestration Kubernetes** : Gestion des conteneurs en production
- **CDN** : Distribution de contenu pour les actifs statiques
- **Base de Données Distribuée** : Clusters MongoDB pour l'évolutivité

---

## 🏗️ Structure et Architecture de l'Application

### Structure Actuelle du Projet (Détaillée)

Le projet NEXOF suit une architecture full-stack moderne avec des répertoires frontend et backend séparés, supportant des implémentations backend doubles pour la flexibilité de migration.

```
social-ai-app/
├── public/                          # Actifs web statiques servis directement
│   ├── index.html                   # Template HTML principal avec racine React
│   ├── favicon.ico                  # Icône d'onglet navigateur
│   ├── logo192.png & logo512.png    # Icônes PWA pour différentes tailles
│   ├── manifest.json                # Configuration et métadonnées PWA
│   └── robots.txt                   # Instructions d'exploration des moteurs de recherche
│
├── src/                             # Source d'application frontend React
│   ├── components/                  # Composants React réutilisables
│   │   ├── auth/                    # Composants d'authentification
│   │   │   ├── LoginForm.js         # Interface de connexion utilisateur
│   │   │   ├── SignUpForm.js        # Interface d'inscription utilisateur
│   │   │   ├── FaceCapture.js       # Configuration de reconnaissance faciale
│   │   │   ├── FaceVerify.js        # Vérification faciale pour connexion
│   │   │   └── PasswordReset.js     # Récupération de mot de passe
│   │   ├── chat/                    # Composants système de chat
│   │   │   ├── ChatLayout.jsx       # Mise en page d'interface de chat principal
│   │   │   ├── MessageArea.jsx      # Affichage et saisie de messages
│   │   │   ├── LeftSidebar.jsx      # Liste de conversations et recherche
│   │   │   ├── RightSidebar.jsx     # Détails et paramètres de chat
│   │   │   ├── Message.jsx          # Composant de message individuel
│   │   │   ├── MessageInput.jsx     # Interface de composition de messages
│   │   │   ├── FileUpload.jsx       # Interface de pièce jointe
│   │   │   ├── VoiceRecorder.jsx    # Enregistrement de messages vocaux
│   │   │   ├── EmojiPicker.jsx      # Sélection d'emoji
│   │   │   └── TypingIndicator.jsx  # Affichage de saisie en temps réel
│   │   ├── ai/                      # Composants alimentés par IA
│   │   │   ├── AICamera.js          # Analyse de caméra en temps réel
│   │   │   ├── FaceAnalysis.js      # Résultats de détection faciale
│   │   │   ├── EmotionDisplay.js    # Interface de reconnaissance d'émotion
│   │   │   ├── AgeGenderWidget.js   # Affichage d'analyse démographique
│   │   │   └── LandmarkOverlay.js   # Visualisation de repères faciaux
│   │   ├── games/                   # Composants de jeu
│   │   │   ├── GameLobby.jsx        # Sélection et configuration de jeu
│   │   │   ├── TriviaGame.jsx       # Interface de questions trivia
│   │   │   ├── PollCreator.jsx      # Création et vote de sondages
│   │   │   ├── QuizBuilder.jsx      # Outils de création de quiz
│   │   │   ├── DrawingCanvas.jsx    # Dessin collaboratif
│   │   │   └── Leaderboard.jsx      # Statistiques et classements de jeu
│   │   ├── settings/                # Composants paramètres et préférences
│   │   │   ├── ProfileSettings.jsx  # Gestion de profil utilisateur
│   │   │   ├── PrivacySettings.jsx  # Contrôles confidentialité et données
│   │   │   ├── NotificationSettings.jsx # Préférences de notification
│   │   │   ├── ThemeSettings.jsx    # Personnalisation de thème
│   │   │   ├── AISettings.jsx       # Contrôles de fonctionnalités IA
│   │   │   └── SecuritySettings.jsx # Options de sécurité de compte
│   │   ├── agenda/                  # Composants de planification
│   │   │   ├── MessageScheduler.jsx # Planification d'envoi de messages
│   │   │   ├── ReminderCreator.jsx  # Création de rappels
│   │   │   ├── EventPlanner.jsx     # Création et gestion d'événements
│   │   │   ├── CalendarView.jsx     # Intégration calendrier
│   │   │   └── RSVPManager.jsx      # Gestion des réponses d'événement
│   │   ├── ui/                      # Bibliothèque de composants UI réutilisables
│   │   │   ├── button.tsx           # Variantes de boutons personnalisables
│   │   │   ├── input.tsx            # Saisie de formulaire avec validation
│   │   │   ├── card.tsx             # Conteneurs de contenu
│   │   │   ├── dialog.tsx           # Modales et superpositions
│   │   │   ├── tabs.tsx             # Navigation par onglets
│   │   │   ├── avatar.tsx           # Composant d'avatar utilisateur
│   │   │   ├── badge.tsx            # Badges de statut et notification
│   │   │   └── ...                  # Plus de 25 primitives UI supplémentaires
│   │   ├── Home.js                  # Composant de tableau de bord principal
│   │   ├── IntroCube.js             # Animation d'intégration 3D
│   │   ├── HolographicCube.js       # Environnement 3D interactif
│   │   └── ErrorBoundary.js         # Composant de gestion d'erreurs
│   │
│   ├── hooks/                       # Hooks React personnalisés pour logique d'état
│   │   ├── useAuth.js               # Gestion d'état d'authentification
│   │   ├── useChat.js               # État de chat et mises à jour en temps réel
│   │   ├── useSocket.js             # Gestion de connexion WebSocket
│   │   ├── useNotifications.js      # Gestion des notifications push
│   │   ├── useFileUpload.js         # Téléchargement de fichiers avec suivi de progression
│   │   ├── useTheme.js              # Gestion de thème sombre/clair
│   │   ├── useVideoCall.js          # Logique d'appels vidéo WebRTC
│   │   ├── useAIAnalysis.js         # Hook de traitement de caméra IA
│   │   ├── useGames.js              # Gestion d'état de jeu
│   │   ├── useSettings.js           # Gestion des préférences utilisateur
│   │   └── useAgenda.js             # Intégration planification et calendrier
│   │
│   ├── contexts/                    # Fournisseurs de contexte React
│   │   ├── AuthContext.jsx          # Contexte d'authentification
│   │   ├── ThemeContext.jsx         # Contexte de gestion de thème
│   │   ├── ChatContext.jsx          # Contexte d'état de chat
│   │   └── NotificationContext.jsx  # Contexte de notification
│   │
│   ├── lib/                         # Fonctions utilitaires et aides
│   │   ├── api.js                   # Client et points de terminaison API
│   │   ├── utils.js                 # Fonctions utilitaires communes
│   │   ├── ai.js                    # Utilitaires de traitement IA
│   │   ├── file.js                  # Utilitaires de gestion de fichiers
│   │   ├── game.js                  # Utilitaires de logique de jeu
│   │   └── validation.js            # Aides de validation de formulaire
│   │
│   ├── images/                      # Actifs d'images statiques
│   │   ├── nexof-universe.png       # Graphismes de marque et UI
│   │   ├── avatars/                 # Images d'avatar par défaut
│   │   └── icons/                   # Icônes et graphismes UI
│   │
│   ├── styles/                      # Feuilles de style CSS supplémentaires
│   │   ├── cube.html                # Template HTML pour éléments 3D
│   │   ├── themes.css               # Styles spécifiques au thème
│   │   └── animations.css           # Animations personnalisées
│   │
│   ├── App.js                       # Composant React racine avec routage
│   ├── index.js                     # Point d'entrée d'application React
│   ├── App.css                      # Styles d'application globaux
│   ├── index.css                    # Réinitialisations CSS de base et variables
│   └── reportWebVitals.js           # Utilitaire de surveillance des performances
│
├── backend/                         # Services backend Symfony PHP
│   ├── bin/console                  # Exécuteur de commandes CLI Symfony
│   ├── composer.json                # Configuration des dépendances PHP
│   ├── composer.lock                # Versions de dépendances verrouillées
│   ├── config/                      # Fichiers de configuration Symfony
│   │   ├── packages/                # Configurations de bundles
│   │   ├── routes/                  # Définitions de routes
│   │   ├── services.yaml            # Configuration du conteneur de services
│   │   └── bundles.php              # Enregistrements de bundles
│   ├── migrations/                  # Scripts de migration Doctrine
│   ├── public/                      # Actifs web publics
│   │   ├── index.php                # Point d'entrée contrôleur frontend
│   │   └── uploads/                 # Répertoire de stockage de téléchargement de fichiers
│   │       ├── avatars/             # Images de profil utilisateur
│   │       ├── chat-files/          # Pièces jointes de chat
│   │       └── ai-processed/        # Contenu généré par IA
│   ├── src/                         # Source d'application Symfony
│   │   ├── Command/                 # Commandes console
│   │   │   ├── CreateGameCommand.php    # Commandes de création de jeu
│   │   │   ├── ProcessAIModelCommand.php # Traitement de modèles IA
│   │   │   └── SendScheduledMessageCommand.php # Planification de messages
│   │   ├── Controller/              # Contrôleurs de points de terminaison API
│   │   │   ├── Api/                 # Contrôleurs API REST
│   │   │   │   ├── AuthController.php        # Points de terminaison d'authentification
│   │   │   │   ├── ChatController.php        # Fonctionnalité de chat
│   │   │   │   ├── UserController.php        # Gestion utilisateur
│   │   │   │   ├── FileController.php        # Opérations de fichiers
│   │   │   │   ├── AIServiceController.php   # Points de terminaison de traitement IA
│   │   │   │   ├── GameController.php        # Fonctionnalités de jeu
│   │   │   │   ├── SettingsController.php    # Préférences utilisateur
│   │   │   │   └── AgendaController.php      # Fonctionnalités de planification
│   │   │   └── WebSocket/           # Contrôleurs WebSocket
│   │   │       └── ChatWebSocketController.php # Chat en temps réel
│   │   ├── Entity/                  # Entités ODM Doctrine
│   │   │   ├── User.php             # Document utilisateur avec descripteurs faciaux
│   │   │   ├── Conversation.php     # Conversation de chat (direct/groupe)
│   │   │   ├── Message.php          # Message de chat avec réactions
│   │   │   ├── File.php             # Métadonnées et stockage de fichier
│   │   │   ├── Game.php             # Sessions et résultats de jeu
│   │   │   ├── GameParticipant.php  # Données de joueur de jeu
│   │   │   ├── ScheduledMessage.php # Planification de messages
│   │   │   ├── Event.php            # Événements et rappels de calendrier
│   │   │   ├── Notification.php     # Données de notifications push
│   │   │   └── Setting.php          # Stockage des préférences utilisateur
│   │   ├── Repository/              # Couche d'accès aux données
│   │   │   ├── UserRepository.php
│   │   │   ├── ConversationRepository.php
│   │   │   ├── MessageRepository.php
│   │   │   ├── GameRepository.php
│   │   │   ├── EventRepository.php
│   │   │   └── NotificationRepository.php
│   │   ├── Service/                 # Services de logique métier
│   │   │   ├── AuthService.php          # Authentification et reconnaissance faciale
│   │   │   ├── ChatService.php          # Opérations et temps réel de chat
│   │   │   ├── AIService.php            # Traitement IA et vision par ordinateur
│   │   │   ├── FileService.php          # Téléchargement et gestion de fichiers
│   │   │   ├── GameService.php          # Logique et scoring de jeu
│   │   │   ├── NotificationService.php  # Notifications push
│   │   │   ├── AgendaService.php        # Planification et calendrier
│   │   │   ├── SettingsService.php      # Préférences utilisateur
│   │   │   └── WebSocketService.php     # Communication en temps réel
│   │   ├── Event/                   # Événements de domaine
│   │   │   ├── MessageSentEvent.php
│   │   │   ├── UserJoinedEvent.php
│   │   │   ├── GameCompletedEvent.php
│   │   │   └── FileUploadedEvent.php
│   │   ├── EventSubscriber/         # Écouteurs d'événements
│   │   │   ├── NotificationSubscriber.php
│   │   │   ├── ChatSubscriber.php
│   │   │   └── GameSubscriber.php
│   │   ├── Message/                 # Messages Messenger asynchrones
│   │   │   ├── ProcessAIImageMessage.php
│   │   │   ├── SendScheduledMessage.php
│   │   │   └── SendNotificationMessage.php
│   │   ├── MessageHandler/          # Gestionnaires de messages asynchrones
│   │   │   ├── ProcessAIImageHandler.php
│   │   │   ├── SendScheduledMessageHandler.php
│   │   │   └── SendNotificationHandler.php
│   │   ├── Form/                    # Types de formulaire pour API
│   │   │   ├── UserSettingsType.php
│   │   │   ├── GameCreationType.php
│   │   │   └── EventCreationType.php
│   │   ├── Security/                # Composants de sécurité
│   │   │   ├── JWTAuthenticator.php
│   │   │   └── FaceVerificationAuthenticator.php
│   │   ├── Validator/               # Validateurs personnalisés
│   │   │   ├── FaceDescriptorValidator.php
│   │   │   └── FileUploadValidator.php
│   ├── templates/                   # Templates de vues Twig (minimaux pour API)
│   ├── .env.local                   # Configuration d'environnement local
│   ├── docker-compose.yml           # Configuration des services Docker
│   ├── Dockerfile                   # Instructions de construction de conteneur
│   └── phpunit.xml.dist             # Configuration de tests
│
├── .gitignore                       # Patterns d'ignorance Git
├── package.json                     # Dépendances et scripts frontend
├── package-lock.json                # Versions de dépendances frontend verrouillées
├── README.md                        # Documentation du projet
├── FRONTEND_DOCUMENTATION.md        # Docs d'architecture frontend détaillées
├── FUTURE_IMPLEMENTATIONS.md        # Feuille de route et fonctionnalités planifiées
├── MIGRATION_DOCUMENTATION.md       # Guides de migration backend
└── postcss.config.js                # Configuration de traitement CSS
```

### Composants Architecturaux Clés Expliqués

#### Architecture Frontend (React)
- **Basée sur les Composants** : Composants modulaires et réutilisables organisés par fonctionnalité
- **État Piloté par Hooks** : Hooks personnalisés encapsulent une logique d'état complexe
- **Conception Responsive** : Approche mobile-first avec Tailwind CSS
- **Intégration Temps Réel** : Socket.io pour mises à jour en direct et WebRTC pour vidéo
- **Capacités 3D** : Intégration Three.js pour éléments UI immersifs

#### Architecture Backend (Symfony PHP)
- **Symfony 7.3** : Framework PHP moderne avec architecture robuste
- **Doctrine ODM** : Mappeur objet document MongoDB pour la persistance des données
- **API Platform** : Framework API REST et GraphQL pour Symfony
- **Lexik JWT** : Bundle d'authentification JWT pour gestion sécurisée des jetons
- **Support WebSocket** : ReactPHP ou Symfony WebSocket Bundle pour fonctionnalités temps réel
- **Composant Messenger** : Traitement asynchrone et gestion de files d'attente

#### Couche Base de Données (Symfony + MongoDB)
- **MongoDB** : Base de données de documents NoSQL pour modèles de données flexibles
- **Doctrine ODM** : Mappeur objet document MongoDB de Symfony
- **Support de Migration** : Migrations Doctrine pour évolution de schéma
- **Indexation** : Index composés optimisés pour requêtes complexes
- **Documents Embarqués** : Relations de données efficaces et dénormalisation

### Implémentations de Structure Future (Phase 3-5)

#### Améliorations Frontend
- **Composants IA Avancés** : Modules spécialisés pour analyse faciale en temps réel, détection d'émotion et fonctionnalités alimentées par IA
- **Bibliothèque de Jeux** : Composants de mini-jeux intégrés avec adaptation IA et capacités multijoueur sociales
- **Système de Notifications** : Interface complète de notifications push avec planification et gestion des préférences
- **Gestionnaire de Fichiers** : Composants de téléchargement avancés avec glisser-déposer, suivi de progression et aperçu média

#### Évolution Backend Symfony
- **Architecture Modulaire** : Organiser le code en bundles basés sur les fonctionnalités :
  - `NexofAuthBundle` : Authentification et gestion utilisateur
  - `NexofChatBundle` : Messagerie en temps réel et conversations
  - `NexofAIBundle` : Traitement IA et vision par ordinateur
  - `NexofFileBundle` : Téléchargement et gestion de médias
  - `NexofNotificationBundle` : Notifications push et alertes
- **Intégration API Platform** : APIs REST et GraphQL avec documentation automatique
- **Composant Messenger** : Traitement asynchrone avec files de messages pour tâches IA
- **Intégration Cache** : Redis/Cache Symfony pour optimisation des performances
- **Serveur WebSocket** : Serveur de communication temps réel basé sur ReactPHP

#### Infrastructure Cloud et DevOps
- **Conteneurisation Docker** : Conteneurs individuels pour chaque service avec images de base optimisées
- **Orchestration Kubernetes** : Gestion de conteneurs, auto-scaling et déploiements roulants
- **Intégration CDN** : Distribution de contenu globale pour actifs statiques, téléchargements utilisateur et modèles IA
- **Base de Données Distribuée** : Sharding et réplication MongoDB pour mise à l'échelle horizontale
- **Pile de Surveillance** : Métriques Prometheus, tableaux de bord Grafana, logging ELK et suivi d'erreurs Sentry
- **Pipeline CI/CD** : Tests automatisés, construction et déploiement avec GitHub Actions ou Jenkins
- **Équilibrage de Charge** : Nginx/Traefik pour distribution de requêtes et terminaison SSL

---

## 📁 Documentation Détaillée de la Structure du Projet

### Vue d'ensemble

Cette section fournit une description complète de la structure complète du projet NEXOF, incluant tous les répertoires, fichiers et leurs objectifs spécifiques. L'architecture suit une approche full-stack moderne avec backend Symfony PHP et frontend React, conçue pour l'évolutivité et la maintenabilité.

### Structure au Niveau Racine

```
nexof-social-ai-app/
├── .gitignore                          # Patterns d'ignorance Git pour sécurité et optimisation
├── README.md                          # Documentation principale du projet
├── PROJECT_ROADMAP.md                 # Feuille de route et planification de développement
├── FRONTEND_DOCUMENTATION.md          # Docs d'architecture frontend détaillées
├── FUTURE_IMPLEMENTATIONS.md          # Fonctionnalités et améliorations planifiées
├── MIGRATION_DOCUMENTATION.md         # Guides de migration backend
├── docker-compose.yml                 # Orchestration de conteneurs multi-services
├── Dockerfile                         # Instructions de construction de conteneur backend
├── package.json                       # Dépendances et scripts frontend
├── package-lock.json                  # Versions de dépendances frontend verrouillées
├── postcss.config.js                  # Configuration de traitement CSS
├── tailwind.config.js                 # Configuration du framework Tailwind CSS
├── tsconfig.json                      # Configuration TypeScript pour composants UI
├── .env.example                       # Template de variables d'environnement
└── .github/                           # Actions GitHub et templates
    ├── workflows/                     # Définitions de pipeline CI/CD
    └── ISSUE_TEMPLATE/                # Templates d'issues et PR
```

### Structure Frontend (React)

#### Répertoire Source Principal
```
src/
├── components/                        # Bibliothèque de composants React réutilisables
│   ├── auth/                          # Composants liés à l'authentification
│   │   ├── LoginForm.js               # Interface de connexion utilisateur avec validation
│   │   ├── SignUpForm.js              # Inscription utilisateur avec capture faciale
│   │   ├── FaceCapture.js             # Composant de configuration de reconnaissance faciale
│   │   ├── FaceVerify.js              # Vérification faciale pour connexion
│   │   ├── PasswordReset.js           # Flux de récupération de mot de passe
│   │   └── AuthGuard.js               # Composant de protection de route
│   │
│   ├── chat/                          # Composants système de chat temps réel
│   │   ├── ChatLayout.jsx             # Conteneur d'interface de chat principal
│   │   ├── MessageArea.jsx            # Zone d'affichage et de saisie de messages
│   │   ├── LeftSidebar.jsx            # Liste de conversations et navigation
│   │   ├── RightSidebar.jsx           # Détails de chat et infos participants
│   │   ├── Message.jsx                # Composant de message individuel
│   │   ├── MessageInput.jsx           # Interface de composition de messages
│   │   ├── FileUpload.jsx             # Composant de pièce jointe
│   │   ├── VoiceRecorder.jsx          # Enregistrement de messages vocaux
│   │   ├── EmojiPicker.jsx            # Interface de sélection d'emoji
│   │   ├── TypingIndicator.jsx        # Statut de saisie en temps réel
│   │   ├── MessageReactions.jsx       # Système de réactions emoji
│   │   ├── MessageScheduler.jsx       # Planification d'envoi de messages
│   │   └── ChatSearch.jsx             # Recherche de messages et utilisateurs
│   │
│   ├── ai/                            # Composants alimentés par IA
│   │   ├── AICamera.js                # Interface d'analyse de caméra en temps réel
│   │   ├── FaceAnalysis.js            # Affichage des résultats de détection faciale
│   │   ├── EmotionDisplay.js          # Visualisation de reconnaissance d'émotion
│   │   ├── AgeGenderWidget.js         # Affichage d'analyse démographique
│   │   ├── LandmarkOverlay.js         # Visualisation de repères faciaux
│   │   ├── AIProcessingIndicator.js   # Indicateur de statut de traitement IA
│   │   └── AIModelStatus.jsx          # Chargement et statut de modèle IA
│   │
│   ├── games/                         # Jeux et fonctionnalités interactives
│   │   ├── GameLobby.jsx              # Sélection et configuration de jeu
│   │   ├── TriviaGame.jsx             # Interface de questions trivia
│   │   ├── PollCreator.jsx            # Création et vote de sondages
│   │   ├── QuizBuilder.jsx            # Outils de création de quiz
│   │   ├── DrawingCanvas.jsx          # Tableau de dessin collaboratif
│   │   ├── Leaderboard.jsx            # Statistiques et classements de jeu
│   │   ├── GameInvite.jsx             # Système d'invitation de jeu
│   │   ├── AchievementSystem.jsx      # Éléments de gamification
│   │   └── GameHistory.jsx            # Résultats de jeux passés
│   │
│   ├── settings/                      # Paramètres et préférences utilisateur
│   │   ├── ProfileSettings.jsx        # Gestion de profil utilisateur
│   │   ├── PrivacySettings.jsx        # Contrôles de confidentialité et partage de données
│   │   ├── NotificationSettings.jsx   # Préférences de notification
│   │   ├── ThemeSettings.jsx          # Personnalisation de thème
│   │   ├── AISettings.jsx             # Contrôles de fonctionnalités IA
│   │   ├── SecuritySettings.jsx       # Options de sécurité de compte
│   │   ├── LanguageSettings.jsx       # Préférences de localisation
│   │   └── DataExport.jsx             # Exportation de données de compte
│   │
│   ├── agenda/                        # Fonctionnalités de planification et calendrier
│   │   ├── MessageScheduler.jsx       # Planification de livraison de messages
│   │   ├── ReminderCreator.jsx        # Création de rappels personnels
│   │   ├── EventPlanner.jsx           # Création et gestion d'événements
│   │   ├── CalendarView.jsx           # Affichage d'intégration calendrier
│   │   ├── RSVPManager.jsx            # Gestion des réponses d'événement
│   │   ├── RecurringScheduler.jsx     # Configuration de messages récurrents
│   │   └── CalendarSync.jsx           # Intégration calendrier externe
│   │
│   ├── ui/                            # Bibliothèque de composants UI réutilisables
│   │   ├── button.tsx                 # Variantes de boutons personnalisables
│   │   ├── input.tsx                  # Entrées de formulaire avec validation
│   │   ├── card.tsx                   # Conteneurs de contenu
│   │   ├── dialog.tsx                 # Composants modaux et superpositions
│   │   ├── tabs.tsx                   # Navigation par onglets
│   │   ├── avatar.tsx                 # Composant d'avatar utilisateur
│   │   ├── badge.tsx                  # Badges de statut et notification
│   │   ├── tooltip.tsx                # Info-bulles d'information
│   │   ├── dropdown.tsx               # Menus déroulants
│   │   ├── select.tsx                 # Composants de sélection
│   │   ├── checkbox.tsx               # Entrées de case à cocher
│   │   ├── radio.tsx                  # Boutons radio
│   │   ├── slider.tsx                 # Curseurs d'entrée de plage
│   │   ├── progress.tsx               # Indicateurs de progression
│   │   ├── skeleton.tsx               # Espaces réservés d'état de chargement
│   │   ├── toast.tsx                  # Toasts de notification
│   │   ├── alert.tsx                  # Messages d'alerte et de statut
│   │   ├── accordion.tsx              # Sections de contenu repliables
│   │   ├── carousel.tsx               # Carrousels d'images/contenu
│   │   ├── pagination.tsx             # Navigation de page
│   │   ├── table.tsx                  # Composants de tableau de données
│   │   ├── form.tsx                   # Mise en page et validation de formulaire
│   │   ├── label.tsx                  # Étiquettes de formulaire
│   │   ├── textarea.tsx               # Entrées de texte multi-lignes
│   │   ├── calendar.tsx               # Sélecteur de date calendrier
│   │   ├── popover.tsx                # Conteneurs de contenu flottant
│   │   ├── hover-card.tsx             # Contenu déclenché par survol
│   │   ├── context-menu.tsx           # Menus contextuels clic droit
│   │   ├── scroll-area.tsx            # Zones défilables personnalisées
│   │   ├── separator.tsx              # Séparateurs visuels
│   │   ├── aspect-ratio.tsx           # Conteneurs de rapport d'aspect
│   │   ├── collapsible.tsx            # Contenu extensible/rétractable
│   │   ├── resizable.tsx              # Composants de panneau redimensionnable
│   │   ├── command.tsx                # Interface de palette de commandes
│   │   ├── breadcrumb.tsx             # Fil d'Ariane de navigation
│   │   ├── navigation-menu.tsx        # Menus de navigation complexes
│   │   └── ...                        # Primitives UI supplémentaires
│   │
│   ├── Home.js                        # Composant de tableau de bord principal
│   ├── IntroCube.js                   # Animation d'intégration 3D
│   ├── HolographicCube.js             # Environnement 3D interactif
│   ├── ErrorBoundary.js               # Composant de gestion d'erreurs
│   └── LoadingSpinner.js              # Indicateur de chargement global
│
├── hooks/                             # Hooks React personnalisés
│   ├── useAuth.js                     # Gestion d'état d'authentification
│   ├── useChat.js                     # Fonctionnalité de chat et mises à jour temps réel
│   ├── useSocket.js                   # Gestion de connexion WebSocket
│   ├── useNotifications.js            # Gestion des notifications push
│   ├── useFileUpload.js               # Téléchargement de fichiers avec suivi de progression
│   ├── useTheme.js                    # Gestion de thème (mode sombre/clair)
│   ├── useVideoCall.js                # Logique d'appels vidéo WebRTC
│   ├── useAIAnalysis.js               # Traitement et résultats de caméra IA
│   ├── useGames.js                    # État et interactions de jeu
│   ├── useSettings.js                 # Gestion des préférences utilisateur
│   ├── useAgenda.js                   # Intégration calendrier et planification
│   ├── useLocalStorage.js             # Persistance de stockage local
│   ├── useDebounce.js                 # Utilitaire d'anti-rebond d'entrée
│   ├── useInfiniteScroll.js           # Défilement infini pour listes
│   └── useIntersectionObserver.js     # Détection de visibilité d'élément
│
├── contexts/                          # Fournisseurs de contexte React
│   ├── AuthContext.jsx                # État d'authentification global
│   ├── ThemeContext.jsx               # Contexte de gestion de thème
│   ├── ChatContext.jsx                # État et actions de chat
│   ├── NotificationContext.jsx        # Contexte de système de notification
│   ├── GameContext.jsx                # Contexte d'état de jeu
│   └── SettingsContext.jsx            # Contexte de paramètres utilisateur
│
├── lib/                               # Fonctions utilitaires et services
│   ├── api.js                         # Client API et définitions de points de terminaison
│   ├── utils.js                       # Fonctions utilitaires communes
│   ├── ai.js                          # Utilitaires de traitement IA
│   ├── file.js                        # Utilitaires de gestion de fichiers
│   ├── game.js                        # Utilitaires de logique de jeu
│   ├── validation.js                  # Aides de validation de formulaire
│   ├── date.js                        # Formatage et manipulation de dates
│   ├── crypto.js                      # Utilitaires de chiffrement et sécurité
│   └── constants.js                   # Constantes d'application
│
├── images/                            # Actifs d'images statiques
│   ├── nexof-universe.png             # Logo de marque principal
│   ├── avatars/                       # Avatars utilisateur par défaut
│   │   ├── default-avatar-1.png
│   │   ├── default-avatar-2.png
│   │   └── ...                        # Collection d'avatars
│   ├── icons/                         # Icônes et graphismes UI
│   │   ├── chat-icons/
│   │   ├── game-icons/
│   │   ├── ai-icons/
│   │   └── ui-icons/
│   ├── backgrounds/                   # Images d'arrière-plan
│   └── illustrations/                 # Graphismes illustratifs
│
├── styles/                            # Fichiers CSS et de style
│   ├── index.css                      # Réinitialisations CSS globales et variables
│   ├── App.css                        # Styles d'application principaux
│   ├── themes.css                     # Styles spécifiques au thème
│   ├── animations.css                 # Animations et transitions personnalisées
│   ├── cube.html                      # Template HTML pour éléments 3D
│   └── components.css                 # Styles spécifiques aux composants
│
├── App.js                             # Composant React racine avec routage
├── index.js                           # Point d'entrée d'application React
├── App.test.js                        # Tests d'application principaux
├── reportWebVitals.js                 # Surveillance des performances
└── setupTests.js                      # Configuration de tests
```

### Structure Backend (Symfony PHP)

#### Structure d'Application Principale
```
backend/
├── bin/                               # Scripts exécutables
│   └── console                        # Exécuteur de commandes CLI Symfony
│
├── config/                            # Fichiers de configuration
│   ├── packages/                      # Configurations de bundles
│   │   ├── framework.yaml             # Paramètres de framework Symfony
│   │   ├── doctrine_mongodb.yaml      # Configuration ODM MongoDB
│   │   ├── lexik_jwt_authentication.yaml # Configuration d'authentification JWT
│   │   ├── api_platform.yaml          # Paramètres API Platform
│   │   ├── nelmio_cors.yaml           # Configuration CORS
│   │   ├── messenger.yaml             # Configuration de messagerie asynchrone
│   │   └── twig.yaml                  # Configuration de moteur de templates
│   ├── routes/                        # Définitions de routes
│   │   ├── api.yaml                   # Configuration de routes API
│   │   ├── websocket.yaml             # Routes WebSocket
│   │   └── annotations.yaml           # Routes basées sur annotations
│   ├── services.yaml                  # Conteneur d'injection de dépendances
│   ├── bundles.php                    # Enregistrements de bundles
│   └── parameters.yaml                # Paramètres d'application
│
├── migrations/                        # Scripts de migration de base de données
│   ├── Version20240101000000.php      # Migration de schéma initial
│   ├── Version20240102000000.php      # Migration d'entité utilisateur
│   └── ...                            # Migrations supplémentaires
│
├── public/                            # Actifs web publics
│   ├── index.php                      # Point d'entrée contrôleur frontend
│   ├── uploads/                       # Stockage de téléchargement de fichiers
│   │   ├── avatars/                   # Images de profil utilisateur
│   │   ├── chat-files/                # Pièces jointes de messages de chat
│   │   └── ai-processed/              # Contenu généré par IA
│   ├── .htaccess                      # Configuration Apache
│   └── robots.txt                     # Directives de moteurs de recherche
│
├── src/                               # Code source d'application
│   ├── Command/                       # Commandes console
│   │   ├── CreateGameCommand.php      # Utilitaires de création de jeu
│   │   ├── ProcessAIModelCommand.php  # Traitement de modèles IA
│   │   ├── SendScheduledMessageCommand.php # Planification de messages
│   │   ├── CleanupExpiredFilesCommand.php # Maintenance de fichiers
│   │   └── GenerateAnalyticsReportCommand.php # Génération d'analyses
│   │
│   ├── Controller/                    # Contrôleurs de requêtes HTTP
│   │   ├── Api/                       # Contrôleurs API REST
│   │   │   ├── AuthController.php     # Points de terminaison d'authentification
│   │   │   │   ├── login()            # Connexion utilisateur
│   │   │   │   ├── register()         # Inscription utilisateur
│   │   │   │   ├── faceRegister()     # Enregistrement de descripteurs faciaux
│   │   │   │   ├── faceVerify()       # Vérification faciale
│   │   │   │   ├── refreshToken()     # Actualisation de jeton JWT
│   │   │   │   └── logout()           # Déconnexion utilisateur
│   │   │   ├── ChatController.php     # Fonctionnalité de chat
│   │   │   │   ├── getConversations() # Lister les conversations utilisateur
│   │   │   │   ├── createConversation() # Démarrer nouvelle conversation
│   │   │   │   ├── sendMessage()      # Envoyer message de chat
│   │   │   │   ├── getMessages()      # Récupérer les messages
│   │   │   │   ├── addReaction()      # Ajouter réaction de message
│   │   │   │   └── markAsRead()       # Marquer messages comme lus
│   │   │   ├── UserController.php     # Gestion utilisateur
│   │   │   │   ├── getProfile()       # Obtenir profil utilisateur
│   │   │   │   ├── updateProfile()    # Mettre à jour infos utilisateur
│   │   │   │   ├── getUsers()         # Découverte d'utilisateurs
│   │   │   │   └── uploadAvatar()     # Téléchargement de photo de profil
│   │   │   ├── FileController.php     # Opérations de fichiers
│   │   │   │   ├── uploadFile()       # Téléchargement de fichier
│   │   │   │   ├── getFile()          # Récupération de fichier
│   │   │   │   ├── deleteFile()       # Suppression de fichier
│   │   │   │   └── getFileUrl()       # Générer URLs sécurisées
│   │   │   ├── AIServiceController.php # Points de terminaison de traitement IA
│   │   │   │   ├── analyzeFace()      # Analyse faciale
│   │   │   │   ├── processImage()     # Traitement d'image
│   │   │   │   └── getAIStatus()      # Statut de service IA
│   │   │   ├── GameController.php     # Fonctionnalités de jeu
│   │   │   │   ├── createGame()       # Démarrer nouveau jeu
│   │   │   │   ├── joinGame()         # Rejoindre jeu existant
│   │   │   │   ├── submitAnswer()     # Interactions de jeu
│   │   │   │   └── getLeaderboard()   # Statistiques de jeu
│   │   │   ├── SettingsController.php # Préférences utilisateur
│   │   │   │   ├── getSettings()      # Récupérer paramètres
│   │   │   │   ├── updateSettings()   # Mettre à jour préférences
│   │   │   │   └── resetSettings()    # Réinitialiser aux valeurs par défaut
│   │   │   └── AgendaController.php   # Fonctionnalités de planification
│   │   │       ├── scheduleMessage()  # Planifier message
│   │   │       ├── createEvent()      # Créer événement calendrier
│   │   │       ├── getEvents()        # Récupérer événements
│   │   │       └── updateEvent()      # Modifier événements
│   │   │
│   │   └── WebSocket/                 # Contrôleurs WebSocket
│   │       └── ChatWebSocketController.php # Gestion de chat temps réel
│   │
│   ├── Entity/                        # Entités ODM Doctrine
│   │   ├── User.php                   # Document utilisateur
│   │   │   ├── Propriétés: id, email, password, faceDescriptors[]
│   │   │   ├── Relations: conversations, sentMessages
│   │   │   └── Index: email (unique), faceDescriptors
│   │   ├── Conversation.php           # Conversation de chat
│   │   │   ├── Propriétés: id, type, name, participants[], createdAt
│   │   │   ├── Relations: messages, creator
│   │   │   └── Index: participants, createdAt
│   │   ├── Message.php                # Message de chat
│   │   │   ├── Propriétés: id, content, type, metadata, createdAt
│   │   │   ├── Relations: conversation, sender, reactions[]
│   │   │   └── Index: conversation, createdAt, sender
│   │   ├── File.php                   # Métadonnées de fichier
│   │   │   ├── Propriétés: id, filename, path, size, mimeType, uploadedAt
│   │   │   ├── Relations: uploader, messages[]
│   │   │   └── Index: uploader, uploadedAt
│   │   ├── Game.php                   # Sessions de jeu
│   │   │   ├── Propriétés: id, type, status, settings, createdAt
│   │   │   ├── Relations: participants, creator
│   │   │   └── Index: status, createdAt, type
│   │   ├── GameParticipant.php        # Données de joueur de jeu
│   │   │   ├── Propriétés: id, score, answers[], joinedAt
│   │   │   ├── Relations: game, user
│   │   │   └── Index: game, user
│   │   ├── ScheduledMessage.php       # Planification de messages
│   │   │   ├── Propriétés: id, content, scheduledAt, status
│   │   │   ├── Relations: sender, conversation
│   │   │   └── Index: scheduledAt, status
│   │   ├── Event.php                  # Événements calendrier
│   │   │   ├── Propriétés: id, title, description, startTime, endTime
│   │   │   ├── Relations: creator, participants
│   │   │   └── Index: startTime, creator
│   │   ├── Notification.php           # Notifications push
│   │   │   ├── Propriétés: id, title, body, type, read, createdAt
│   │   │   ├── Relations: recipient
│   │   │   └── Index: recipient, read, createdAt
│   │   └── Setting.php                # Préférences utilisateur
│   │       ├── Propriétés: id, category, key, value
│   │       ├── Relations: user
│   │       └── Index: user, category, key
│   │
│   ├── Repository/                    # Couche d'accès aux données
│   │   ├── UserRepository.php         # Opérations de données utilisateur
│   │   ├── ConversationRepository.php # Requêtes de conversation
│   │   ├── MessageRepository.php      # Récupération et recherche de messages
│   │   ├── GameRepository.php         # Gestion de données de jeu
│   │   ├── EventRepository.php        # Opérations d'événements calendrier
│   │   └── NotificationRepository.php # Gestion de notifications
│   │
│   ├── Service/                       # Services de logique métier
│   │   ├── AuthService.php            # Authentification et reconnaissance faciale
│   │   ├── ChatService.php            # Opérations de chat et fonctionnalités temps réel
│   │   ├── AIService.php              # Traitement IA et vision par ordinateur
│   │   ├── FileService.php            # Téléchargement et gestion de fichiers
│   │   ├── GameService.php            # Logique et scoring de jeu
│   │   ├── NotificationService.php    # Notifications push et alertes
│   │   ├── AgendaService.php          # Planification et intégration calendrier
│   │   ├── SettingsService.php        # Gestion des préférences utilisateur
│   │   └── WebSocketService.php       # Communication temps réel
│   │
│   ├── Event/                         # Événements de domaine
│   │   ├── MessageSentEvent.php       # Notifications d'envoi de messages
│   │   ├── UserJoinedEvent.php        # Événements d'activité utilisateur
│   │   ├── GameCompletedEvent.php     # Événements de fin de jeu
│   │   ├── FileUploadedEvent.php      # Événements de téléchargement de fichiers
│   │   └── UserOnlineEvent.php        # Événements de présence
│   │
│   ├── EventSubscriber/               # Écouteurs d'événements
│   │   ├── NotificationSubscriber.php # Gestion des événements de notification
│   │   ├── ChatSubscriber.php         # Gestion d'événements liés au chat
│   │   ├── GameSubscriber.php         # Traitement d'événements de jeu
│   │   └── ActivitySubscriber.php     # Journalisation d'activité utilisateur
│   │
│   ├── Message/                       # Classes de messages asynchrones
│   │   ├── ProcessAIImageMessage.php  # Tâches de traitement d'images IA
│   │   ├── SendScheduledMessage.php   # Livraison de messages planifiés
│   │   ├── SendNotificationMessage.php # Livraison de notifications
│   │   └── CleanupExpiredFilesMessage.php # Maintenance de fichiers
│   │
│   ├── MessageHandler/                # Processeurs de messages asynchrones
│   │   ├── ProcessAIImageHandler.php  # Worker de traitement IA
│   │   ├── SendScheduledMessageHandler.php # Planificateur de messages
│   │   ├── SendNotificationHandler.php # Expéditeur de notifications
│   │   └── CleanupExpiredFilesHandler.php # Worker de nettoyage de fichiers
│   │
│   ├── Form/                          # Types de formulaire pour API
│   │   ├── UserRegistrationType.php   # Formulaire d'inscription utilisateur
│   │   ├── MessageSendType.php        # Formulaire d'envoi de messages
│   │   ├── GameCreationType.php       # Formulaire de configuration de jeu
│   │   ├── EventCreationType.php      # Formulaire de création d'événements
│   │   └── SettingsUpdateType.php     # Formulaire de modification de paramètres
│   │
│   ├── Security/                      # Composants de sécurité
│   │   ├── JWTAuthenticator.php       # Authentification par jeton JWT
│   │   ├── FaceVerificationAuthenticator.php # Authentification basée sur visage
│   │   ├── ApiKeyAuthenticator.php    # Authentification par clé API
│   │   └── RateLimitListener.php      # Limitation de taux API
│   │
│   ├── Validator/                     # Validateurs personnalisés
│   │   ├── FaceDescriptorValidator.php # Validation de données faciales
│   │   ├── FileUploadValidator.php    # Validation de téléchargement de fichiers
│   │   ├── PasswordStrengthValidator.php # Exigences de mot de passe
│   │   └── MessageContentValidator.php # Validation de contenu de messages
│   │
│   └── Kernel.php                     # Noyau Symfony
│
├── templates/                         # Templates Twig (minimaux pour API)
│   ├── base.html.twig                 # Template de base
│   ├── error/                         # Templates de pages d'erreur
│   │   ├── 404.html.twig
│   │   ├── 500.html.twig
│   │   └── maintenance.html.twig
│   └── email/                         # Templates d'emails
│       ├── welcome.html.twig
│       ├── password_reset.html.twig
│       └── notification.html.twig
│
├── tests/                             # Suites de tests
│   ├── Unit/                          # Tests unitaires
│   ├── Functional/                    # Tests fonctionnels
│   ├── Integration/                   # Tests d'intégration
│   └── fixtures/                      # Données de test fixtures
│
├── .env.local                         # Configuration d'environnement local
├── composer.json                      # Dépendances PHP
├── composer.lock                      # Versions PHP verrouillées
├── symfony.lock                       # Versions de composants Symfony
├── phpunit.xml.dist                   # Configuration de tests
└── docker-compose.yml                 # Services de développement local
```

### Détail des Fichiers de Configuration

#### Configuration d'Environnement (.env.local)
```bash
# Application
APP_ENV=dev
APP_SECRET=votre-clé-secrète
APP_DEBUG=true

# Base de données
MONGODB_URL=mongodb://localhost:27017/nexof_db
MONGODB_DB=nexof_db

# Authentification JWT
JWT_SECRET_KEY=votre-secret-jwt
JWT_PUBLIC_KEY=votre-clé-publique-jwt
JWT_PASSPHRASE=votre-phrase-de-passe

# Téléchargement de fichiers
UPLOAD_PATH=/var/www/uploads
MAX_FILE_SIZE=10485760
ALLOWED_MIME_TYPES=image/*,audio/*,video/*,application/pdf,text/*

# Services IA
AI_MODEL_PATH=/var/www/models
FACE_API_TINY_FACE_DETECTOR=tiny_face_detector_model-weights_manifest.json
FACE_API_FACE_LANDMARK_68=face_landmark_68_model-weights_manifest.json

# WebSocket
WEBSOCKET_HOST=0.0.0.0
WEBSOCKET_PORT=8080

# Email (pour notifications)
MAILER_DSN=smtp://user:pass@smtp.example.com:587

# Redis (mise en cache et sessions)
REDIS_URL=redis://localhost:6379

# APIs externes
GOOGLE_CALENDAR_CLIENT_ID=votre-id-client
GOOGLE_CALENDAR_CLIENT_SECRET=votre-secret-client
```

#### Configuration Docker (docker-compose.yml)
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=dev
    depends_on:
      - mongodb
      - redis
    volumes:
      - .:/var/www
      - ./public/uploads:/var/www/public/uploads

  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=nexof_db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  websocket:
    build:
      context: .
      dockerfile: Dockerfile.websocket
    ports:
      - "8080:8080"
    depends_on:
      - app

volumes:
  mongodb_data:
```

### Flux de Travail de Développement

#### Configuration de Développement Local
1. **Cloner le Dépôt** : `git clone <url-dépôt>`
2. **Installer les Dépendances** :
   - Frontend : `npm install`
   - Backend : `composer install`
3. **Configuration d'Environnement** : Copier `.env.example` vers `.env.local`
4. **Base de Données** : Démarrer les services MongoDB et Redis
5. **Exécuter les Migrations** : `php bin/console doctrine:mongodb:schema:create`
6. **Démarrer les Services** :
   - Backend : `php bin/console cache:clear && symfony server:start`
   - Frontend : `npm start`
   - WebSocket : `php bin/console websocket:server`

#### Outils de Qualité de Code
- **PHPStan** : Analyse statique pour code PHP
- **PHP CS Fixer** : Application de style de code
- **ESLint** : Linting JavaScript/TypeScript
- **Prettier** : Formatage de code
- **PHPUnit** : Tests unitaires et d'intégration

#### Structure de Déploiement
```
production/
├── app/                               # Application Symfony
├── web/                               # Serveur web Nginx
├── websocket/                         # Serveur WebSocket
├── mongodb/                           # Serveur de base de données
├── redis/                             # Serveur de cache
├── cdn/                               # Livraison d'actifs statiques
└── monitoring/                        # Surveillance d'application
```

---

## 🎉 Conclusion

NEXOF représente l'avenir des applications sociales IA, combinant une technologie de pointe avec des expériences utilisateur intuitives. La feuille de route du projet démontre un engagement envers l'innovation, la sécurité et la conception centrée sur l'utilisateur. Au fur et à mesure que nous progressons dans chaque phase, NEXOF évoluera d'un prototype prometteur vers une plateforme sociale complète qui redéfinit la façon dont les gens se connectent et interagissent à l'ère numérique.

L'architecture backend double, les fonctionnalités IA avancées et l'interface 3D immersive positionnent NEXOF comme un leader dans la prochaine génération d'applications sociales. Avec une planification et une exécution soigneuses, NEXOF a le potentiel de devenir une pierre angulaire de l'interaction sociale moderne.

---

*Cette feuille de route est un document vivant qui sera mis à jour régulièrement en fonction des progrès de développement, des retours utilisateurs et des avancées technologiques. Dernière mise à jour : Novembre 2025*