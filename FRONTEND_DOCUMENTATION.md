# NEXOF Frontend Documentation / Documentation Frontend NEXOF

This comprehensive documentation covers the React frontend architecture, components, hooks, and implementation details of the NEXOF social AI application.

Cette documentation complète couvre l'architecture frontend React, les composants, les hooks et les détails d'implémentation de l'application sociale IA NEXOF.

## 🏗️ Frontend Architecture / Architecture Frontend

### Technology Stack / Pile Technologique

#### Core Framework
- **React 18.3.1**: Modern React with concurrent features and hooks
- **React Router DOM 7.9.1**: Client-side routing with nested routes
- **Create React App**: Build tooling and development server

#### UI & Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Modern icon library
- **Framer Motion 12.23.12**: Animation library for smooth transitions
- **GSAP 3.13.0**: High-performance animation library

#### 3D Graphics & AI
- **Three.js 0.176.0**: 3D graphics library
- **React Three Fiber 8.18.0**: React renderer for Three.js
- **React Three Drei 9.122.0**: Useful helpers for React Three Fiber
- **TensorFlow.js 4.22.0**: Machine learning in the browser
- **@tensorflow-models/face-landmarks-detection 1.0.6**: Face detection and landmarks

#### State Management & Communication
- **Socket.io Client 4.8.1**: Real-time bidirectional communication
- **TanStack Query 5.84.2**: Powerful data synchronization for React
- **Context API**: React's built-in state management for theme

#### Additional Libraries
- **Material-UI 7.3.2**: React component library
- **Firebase 12.2.1**: Backend services and authentication
- **Phaser 3.90.0**: Game framework for interactive content
- **React Hook Form 7.62.0**: Form management
- **Date-fns 4.1.0**: Date utility library
- **Recharts 2.12.7**: Charting library

#### Development Tools
- **ESLint**: Code linting
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing
- **Testing Library**: Component testing utilities

### Dependencies / Dépendances

The project uses npm for package management. All dependencies are listed in `package.json`.

#### Core Dependencies / Dépendances Principales
- **React 18.3.1**: Core React library for building user interfaces
- **React DOM 18.3.1**: React rendering library for web
- **React Router DOM 7.9.1**: Declarative routing for React
- **React Scripts 5.0.1**: Build scripts and development server

#### UI & Styling / Interface Utilisateur & Style
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Radix UI Components**: Accessible UI primitives (accordion, dialog, dropdown-menu, etc.)
- **Lucide React 0.539.0**: Modern icon library
- **Framer Motion 12.23.12**: Animation library for smooth transitions
- **GSAP 3.13.0**: High-performance animation library
- **Material-UI 7.3.2**: React component library
- **Sonner 1.7.4**: Toast notification system
- **Class Variance Authority 0.7.1**: Utility for managing component variants
- **clsx 2.1.1**: Utility for constructing className strings
- **Tailwind Merge 2.6.0**: Utility for merging Tailwind CSS classes
- **Tailwind Animate 1.0.7**: Animation utilities for Tailwind CSS

#### State Management & Data / Gestion d'État & Données
- **TanStack Query 5.84.2**: Powerful data synchronization for React
- **Socket.io Client 4.8.1**: Real-time bidirectional communication
- **React Hook Form 7.62.0**: Form management library
- **Next Themes 0.4.6**: Theme management for React

#### 3D Graphics & AI / Graphismes 3D & IA
- **Three.js 0.176.0**: 3D graphics library
- **React Three Fiber 8.18.0**: React renderer for Three.js
- **React Three Drei 9.122.0**: Useful helpers for React Three Fiber
- **TensorFlow.js 4.22.0**: Machine learning in the browser
- **@tensorflow-models/face-landmarks-detection 1.0.6**: Face detection and landmarks

#### Additional Libraries / Bibliothèques Supplémentaires
- **Firebase 12.2.1**: Backend services and authentication
- **Phaser 3.90.0**: Game framework for interactive content
- **Date-fns 4.1.0**: Date utility library
- **Recharts 2.12.7**: Charting library
- **React Day Picker 9.11.1**: Date picker component
- **React Resizable Panels 3.0.4**: Resizable panel layouts
- **Input OTP 1.4.2**: One-time password input component
- **Embla Carousel React 8.6.0**: Carousel/slider component
- **Vaul 1.1.2**: Drawer component
- **CMDk 1.1.1**: Command palette component

#### Development Dependencies / Dépendances de Développement
- **TypeScript 4.9.5**: TypeScript language support
- **Testing Library**: Component testing utilities (@testing-library/react, @testing-library/jest-dom, etc.)
- **PostCSS 8.5.6**: CSS processing tool
- **Autoprefixer 10.4.21**: CSS vendor prefixing

#### Build Tools / Outils de Construction
- **Create React App**: Build tooling and development server
- **Webpack**: Module bundler (via CRA)
- **Babel**: JavaScript transpiler (via CRA)

### Project Structure / Structure du Projet

```
src/
├── components/                    # React Components / Composants React
│   ├── AgendaPage.js             # Agenda page component / Composant de page agenda
│   ├── CanvasErrorBoundary.js    # Error boundary for canvas / Limite d'erreur pour canvas
│   ├── ChatPage.js               # Chat page component / Composant de page chat
│   ├── ErrorBoundary.js          # General error boundary / Limite d'erreur générale
│   ├── FaceCapture.css           # Face capture styles / Styles de capture faciale
│   ├── FaceCapture.js            # Face capture component / Composant de capture faciale
│   ├── FilesPage.js              # Files page component / Composant de page fichiers
│   ├── HolographicCube.js        # 3D holographic cube / Cube holographique 3D
│   ├── Home.css                  # Home page styles / Styles de page d'accueil
│   ├── HomeAICamera.css          # AI camera styles / Styles de caméra IA
│   ├── HomeAICamera.js           # Home AI camera component / Composant caméra IA d'accueil
│   ├── IntroCube.css             # Intro cube styles / Styles de cube d'intro
│   ├── IntroCube.js              # Intro animation cube / Cube d'animation d'intro
│   ├── LoginForm.css             # Login form styles / Styles de formulaire de connexion
│   ├── LoginForm.js              # Login form component / Composant de formulaire de connexion
│   ├── NotificationSettings.jsx  # Notification settings / Paramètres de notifications
│   ├── RealtimeAnalysisDisplay.css # Real-time analysis styles / Styles d'analyse en temps réel
│   ├── RealtimeAnalysisDisplay.js # Real-time analysis display / Affichage d'analyse en temps réel
│   ├── SettingsPage.js           # Settings page component / Composant de page paramètres
│   ├── SignUpForm.css            # Sign up form styles / Styles de formulaire d'inscription
│   ├── SignUpForm.js             # Sign up form component / Composant de formulaire d'inscription
│   ├── ThemeToggle.jsx           # Theme toggle component / Composant de basculement de thème
│   ├── agenda/                   # Agenda-related components / Composants liés à l'agenda
│   │   ├── AgendaCalendar.js     # Calendar component / Composant calendrier
│   │   ├── AgendaDeviceStatus.js # Device sync status / Statut de synchronisation des appareils
│   │   ├── AgendaEventCard.js    # Event card component / Composant de carte d'événement
│   │   ├── AgendaHeader.js       # Agenda header / En-tête d'agenda
│   │   ├── AgendaLayout.js       # Agenda layout / Mise en page d'agenda
│   │   ├── AgendaNotificationPanel.js # Notification panel / Panneau de notifications
│   │   └── AgendaTaskCard.js     # Task card component / Composant de carte de tâche
│   ├── chat/                     # Chat-related components / Composants liés au chat
│   │   ├── ChatAnalyticsModal.jsx # Chat analytics modal / Modal d'analyses de chat
│   │   ├── ChatLayout.jsx        # Main chat layout / Mise en page principale du chat
│   │   ├── CloneIAPromo.jsx      # AI clone promotion / Promotion de clone IA
│   │   ├── CreateGroupModal.jsx  # Create group modal / Modal de création de groupe
│   │   ├── EmojiPicker.jsx       # Emoji picker / Sélecteur d'emoji
│   │   ├── ExternalServicesModal.jsx # External services modal / Modal de services externes
│   │   ├── GroupManagementModal.jsx # Group management modal / Modal de gestion de groupe
│   │   ├── Header.jsx            # Chat header / En-tête de chat
│   │   ├── LeftSidebar.jsx       # Left sidebar / Barre latérale gauche
│   │   ├── Message.jsx           # Message component / Composant de message
│   │   ├── MessageArea.jsx       # Message area / Zone de messages
│   │   ├── MessageSchedulerModal.jsx # Message scheduler modal / Modal de planification de messages
│   │   ├── RightSidebar.jsx      # Right sidebar / Barre latérale droite
│   │   ├── SearchModal.jsx       # Search modal / Modal de recherche
│   │   ├── VideoCallModal.jsx    # Video call modal / Modal d'appel vidéo
│   │   ├── VoiceMessage.jsx      # Voice message component / Composant de message vocal
│   │   └── VoiceRecorder.jsx     # Voice recorder / Enregistreur vocal
│   ├── files/                    # Files-related components / Composants liés aux fichiers
│   │   ├── FilesCard.js          # File card component / Composant de carte de fichier
│   │   ├── FilesGrid.js          # Files grid display / Affichage en grille des fichiers
│   │   ├── FilesHeader.js        # Files header / En-tête des fichiers
│   │   ├── FilesLayout.js        # Files layout / Mise en page des fichiers
│   │   ├── FilesLeftSidebar.js   # Files left sidebar / Barre latérale gauche des fichiers
│   │   ├── FilesPermissionsModal.js # Permissions modal / Modal de permissions
│   │   ├── FilesRightSidebar.js  # Files right sidebar / Barre latérale droite des fichiers
│   │   └── FilesUploadZone.js    # File upload zone / Zone de téléchargement de fichiers
│   ├── settings/                 # Settings-related components / Composants liés aux paramètres
│   │   ├── AISettings.js         # AI settings / Paramètres IA
│   │   ├── DataExport.js         # Data export component / Composant d'exportation de données
│   │   ├── LanguageSettings.js   # Language settings / Paramètres de langue
│   │   ├── NotificationSettings.js # Notification settings / Paramètres de notifications
│   │   ├── PrivacySettings.js    # Privacy settings / Paramètres de confidentialité
│   │   ├── ProfileSettings.js    # Profile settings / Paramètres de profil
│   │   ├── SecuritySettings.js   # Security settings / Paramètres de sécurité
│   │   ├── SettingsDashboard.js  # Settings dashboard / Tableau de bord des paramètres
│   │   ├── SettingsLayout.js     # Settings layout / Mise en page des paramètres
│   │   └── ThemeSettings.js      # Theme settings / Paramètres de thème
│   └── ui/                       # Reusable UI components / Composants UI réutilisables
│       ├── accordion.tsx         # Accordion component / Composant accordéon
│       ├── alert-dialog.tsx      # Alert dialog / Boîte de dialogue d'alerte
│       ├── alert.tsx             # Alert component / Composant d'alerte
│       ├── aspect-ratio.tsx      # Aspect ratio utility / Utilitaire de rapport d'aspect
│       ├── avatar.tsx            # Avatar component / Composant avatar
│       ├── badge.tsx             # Badge component / Composant badge
│       ├── breadcrumb.tsx        # Breadcrumb navigation / Navigation fil d'Ariane
│       ├── button.tsx            # Button component / Composant bouton
│       ├── calendar.tsx          # Calendar component / Composant calendrier
│       ├── card.tsx              # Card component / Composant carte
│       ├── carousel.tsx          # Carousel component / Composant carrousel
│       ├── chart.tsx             # Chart component / Composant graphique
│       ├── checkbox.tsx          # Checkbox component / Composant case à cocher
│       ├── collapsible.tsx       # Collapsible component / Composant repliable
│       ├── command.tsx           # Command component / Composant commande
│       ├── context-menu.tsx      # Context menu / Menu contextuel
│       ├── dialog.tsx            # Dialog component / Composant dialogue
│       ├── drawer.tsx            # Drawer component / Composant tiroir
│       ├── dropdown-menu.tsx     # Dropdown menu / Menu déroulant
│       ├── form.tsx              # Form component / Composant formulaire
│       ├── hover-card.tsx        # Hover card / Carte au survol
│       ├── input-otp.tsx         # OTP input / Entrée OTP
│       ├── input.tsx             # Input component / Composant entrée
│       ├── label.tsx             # Label component / Composant étiquette
│       ├── menubar.tsx           # Menu bar / Barre de menu
│       ├── navigation-menu.tsx   # Navigation menu / Menu de navigation
│       ├── pagination.tsx        # Pagination component / Composant pagination
│       ├── popover.tsx           # Popover component / Composant popover
│       ├── progress.tsx          # Progress component / Composant progression
│       ├── radio-group.tsx       # Radio group / Groupe radio
│       ├── resizable.tsx         # Resizable component / Composant redimensionnable
│       ├── scroll-area.tsx       # Scroll area / Zone de défilement
│       ├── select.tsx            # Select component / Composant sélection
│       ├── separator.tsx         # Separator component / Composant séparateur
│       ├── sheet.tsx             # Sheet component / Composant feuille
│       ├── sidebar.tsx           # Sidebar component / Composant barre latérale
│       ├── skeleton.tsx          # Skeleton component / Composant squelette
│       ├── slider.tsx            # Slider component / Composant curseur
│       ├── sonner.tsx            # Sonner component / Composant sonner
│       ├── switch.tsx            # Switch component / Composant interrupteur
│       ├── table.tsx             # Table component / Composant tableau
│       ├── tabs.tsx              # Tabs component / Composant onglets
│       ├── textarea.tsx          # Textarea component / Composant zone de texte
│       ├── toast.tsx             # Toast component / Composant toast
│       ├── toaster.tsx           # Toaster component / Composant toaster
│       ├── toggle-group.tsx      # Toggle group / Groupe de basculement
│       ├── toggle.tsx            # Toggle component / Composant basculement
│       ├── tooltip.tsx           # Tooltip component / Composant info-bulle
│       └── use-toast.ts          # Toast hook / Hook toast
├── hooks/                        # Custom React hooks / Hooks React personnalisés
│   ├── use-mobile.js             # Mobile detection hook / Hook de détection mobile
│   ├── use-toast.js              # Toast management hook / Hook de gestion des toasts
│   ├── useAgenda.js              # Agenda management hook / Hook de gestion d'agenda
│   ├── useChat.js                # Chat functionality hook / Hook de fonctionnalité chat
│   ├── useFileUpload.js          # File upload hook / Hook de téléchargement de fichiers
│   ├── useNotifications.js       # Notifications hook / Hook de notifications
│   ├── usePushNotifications.js   # Push notifications hook / Hook de notifications push
│   ├── useSettings.js            # Settings management hook / Hook de gestion des paramètres
│   ├── useSocket.js              # Socket.io hook / Hook Socket.io
│   ├── useTheme.js               # Theme management hook / Hook de gestion de thème
│   └── useVideoCall.js           # Video call hook / Hook d'appel vidéo
├── lib/                          # Utility functions / Fonctions utilitaires
│   └── utils.js                  # General utilities / Utilitaires généraux
├── images/                       # Static assets / Ressources statiques
│   └── nexof-universe.png        # NEXOF universe image / Image univers NEXOF
├── services/                     # Service layer / Couche de services
│   ├── mockData.js               # Mock data for development / Données fictives pour développement
│   └── settingsService.js        # Settings service / Service de paramètres
├── shared/                       # Shared utilities / Utilitaires partagés
│   └── api.ts                    # API configuration / Configuration API
├── styles/                       # Additional styles / Styles supplémentaires
│   └── cube.html                 # Cube HTML template / Modèle HTML cube
├── App.css                       # Main app styles / Styles principaux de l'app
├── App.js                        # Main application component / Composant principal de l'application
├── App.test.js                   # App component tests / Tests du composant app
├── index.css                     # Global styles / Styles globaux
├── index.js                      # Application entry point / Point d'entrée de l'application
├── logo.svg                      # React logo / Logo React
├── reportWebVitals.js            # Performance monitoring / Surveillance des performances
└── setupTests.js                 # Test configuration / Configuration des tests
```

## 🧩 Component Architecture / Architecture des Composants

### Main Application Component (`App.js`)

The root component manages authentication state, routing, and theme context.

#### Key Features:
- **Authentication Flow**: Login → Face Verification → Home
- **Route Protection**: Conditional rendering based on auth status
- **Theme Provider**: Global theme context for dark/light mode
- **Face Verification**: Handles biometric authentication flow

#### State Management:
```javascript
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userIdForScan, setUserIdForScan] = useState(null);
const [showFaceVerify, setShowFaceVerify] = useState(false);
const [faceVerifyUserId, setFaceVerifyUserId] = useState(null);
const [showIntro, setShowIntro] = useState(true);
```

#### Routing Structure:
```javascript
<Routes>
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={/* Conditional auth rendering */} />
  <Route path="/signup" element={/* Face registration flow */} />
  <Route path="/face-verify" element={<FaceCapture />} />
  <Route path="/chat" element={<ChatPage />} />
  <Route path="/agenda" element={<AgendaPage />} />
  <Route path="/files" element={<FilesPage />} />
  <Route path="/settings" element={<SettingsPage />} />
</Routes>
```

### Authentication Components

#### LoginForm (`components/LoginForm.js`)
- **Email/Password Authentication**: Traditional login method
- **Face Verification Trigger**: Automatic face scan requirement
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during authentication

#### SignUpForm (`components/SignUpForm.js`)
- **User Registration**: Account creation with validation
- **Password Requirements**: 6+ character minimum
- **Face Registration Flow**: Automatic transition to face capture

#### FaceCapture (`components/FaceCapture.js`)
- **Camera Access**: WebRTC camera integration
- **Face Detection**: Real-time face recognition using face-api.js
- **Progress Feedback**: Visual indicators for capture process
- **Dual Mode**: Registration vs. verification modes

### Home Components

#### Home Page (`App.js` - HomePage component)
- **3D Environment**: Three.js holographic cube display
- **AI Camera**: Real-time face analysis widget
- **User Profile**: Welcome message and profile access
- **Navigation**: Header with logout and notifications

#### IntroCube (`components/IntroCube.js`)
- **3D Animation**: Rotating geometric shapes
- **Welcome Sequence**: Initial user onboarding
- **Smooth Transitions**: GSAP-powered animations
- **Completion Callback**: Triggers main app display

#### HolographicCube (`components/HolographicCube.js`)
- **Three.js Scene**: Complex 3D geometry
- **Dynamic Lighting**: Multiple light sources with shadows
- **Material Effects**: Holographic visual appearance
- **Orbit Controls**: User interaction with 3D scene

#### HomeAICamera (`components/HomeAICamera.js`)
- **Real-time Analysis**: Live camera feed processing
- **Face Detection**: Age, gender, emotion recognition
- **Mini Mode**: Compact display in header
- **Performance Optimized**: Efficient frame processing

### Chat System Components / Composants du Système de Chat

#### ChatPage (`components/ChatPage.js`)
- **Full Chat Interface**: Complete messaging experience
- **Real-time Updates**: Socket.io integration
- **Authentication Check**: Token validation on mount

#### ChatAnalyticsModal (`components/chat/ChatAnalyticsModal.jsx`)
- **Chat Statistics**: Message counts, user activity metrics
- **Visual Analytics**: Charts and graphs for chat insights
- **Time-based Filtering**: Analytics for specific time periods

#### ChatLayout (`components/chat/ChatLayout.jsx`)
- **Responsive Design**: Mobile-first layout with collapsible sidebars
- **Three-Panel Layout**: Left sidebar, main chat, right sidebar
- **State Management**: Chat selection and mode switching
- **Mobile Optimization**: Touch-friendly interactions

#### CloneIAPromo (`components/chat/CloneIAPromo.jsx`)
- **AI Clone Promotion**: Promotional content for AI features
- **Interactive Elements**: Call-to-action buttons and links
- **Feature Highlights**: Showcase of AI capabilities

#### CreateGroupModal (`components/chat/CreateGroupModal.jsx`)
- **Group Creation**: Interface for creating new group chats
- **Member Selection**: Add participants to groups
- **Group Settings**: Initial configuration options

#### EmojiPicker (`components/chat/EmojiPicker.jsx`)
- **Emoji Selection**: Grid-based emoji picker
- **Search Functionality**: Find emojis by keywords
- **Recent Emojis**: Quick access to frequently used emojis

#### ExternalServicesModal (`components/chat/ExternalServicesModal.jsx`)
- **Service Integration**: Connect external services and APIs
- **Configuration Interface**: Setup and manage integrations
- **Permission Management**: Control access to external services

#### GroupManagementModal (`components/chat/GroupManagementModal.jsx`)
- **Group Administration**: Manage group settings and members
- **Member Roles**: Assign admin/moderator permissions
- **Group Actions**: Edit, leave, or delete groups

#### Header (`components/chat/Header.jsx`)
- **Chat Header**: Display current chat information
- **Navigation Controls**: Back buttons and menu access
- **Status Indicators**: Online status and typing indicators

#### LeftSidebar (`components/chat/LeftSidebar.jsx`)
- **Conversation List**: Available chat conversations
- **User Search**: Find and start new conversations
- **Online Status**: User presence indicators
- **Group Management**: Create and manage group chats

#### Message (`components/chat/Message.jsx`)
- **Message Types**: Text, image, file, voice messages
- **Reaction System**: Emoji reactions
- **Read Receipts**: Delivery and read status
- **Timestamp Display**: Message timing information

#### MessageArea (`components/chat/MessageArea.jsx`)
- **Message Display**: Scrollable message list
- **Real-time Updates**: Live message reception
- **Typing Indicators**: User activity feedback
- **Infinite Scroll**: Pagination for message history

#### MessageSchedulerModal (`components/chat/MessageSchedulerModal.jsx`)
- **Scheduled Messages**: Send messages at specific times
- **Calendar Integration**: Date and time selection
- **Draft Management**: Save and edit scheduled messages

#### RightSidebar (`components/chat/RightSidebar.jsx`)
- **Chat Information**: Participant details and settings
- **Media Gallery**: Shared images and files
- **Analytics**: Chat statistics and insights
- **Settings**: Notification preferences

#### SearchModal (`components/chat/SearchModal.jsx`)
- **Message Search**: Search through chat history
- **Advanced Filters**: Filter by date, user, or content type
- **Search Results**: Highlighted and paginated results

#### VideoCallModal (`components/chat/VideoCallModal.jsx`)
- **Video Calling**: WebRTC-based video calls
- **Screen Sharing**: Share screen during calls
- **Call Controls**: Mute, video toggle, hang up

#### VoiceMessage (`components/chat/VoiceMessage.jsx`)
- **Voice Recording**: Record and send voice messages
- **Playback Controls**: Play, pause, and volume adjustment
- **Waveform Display**: Visual representation of audio

#### VoiceRecorder (`components/chat/VoiceRecorder.jsx`)
- **Audio Recording**: Interface for recording voice messages
- **Real-time Feedback**: Visual level indicators
- **Recording Controls**: Start, stop, and cancel recording

## 📅 Agenda System Components / Composants du Système d'Agenda

### AgendaPage (`components/AgendaPage.js`)
- **Authentication Wrapper**: Checks token validity before rendering
- **Route Protection**: Redirects to login if not authenticated
- **Layout Rendering**: Displays AgendaLayout for calendar functionality

### AgendaLayout (`components/agenda/AgendaLayout.js`)
- **Calendar Interface**: Interactive date selection with event indicators
- **Event Management**: Display, filter, and manage scheduled events
- **Category Filtering**: Work, personal, social event categorization
- **Real-time Sync**: Device synchronization with sync status display
- **Responsive Design**: Mobile-optimized calendar layout

#### Sub-components:
- **AgendaHeader**: Sync controls and navigation
- **AgendaCalendar**: Date picker with event highlighting
- **AgendaDeviceStatus**: Connected device information
- **AgendaEventCard**: Individual event display with actions
- **AgendaNotificationPanel**: Upcoming event notifications

## 📁 Files System Components / Composants du Système de Fichiers

### FilesPage (`components/FilesPage.js`)
- **Authentication Check**: Token validation for secure access
- **File Management Interface**: Upload, share, and organize files
- **Permission System**: Role-based access control for files

### FilesLayout (`components/files/FilesLayout.js`)
- **File Upload Zone**: Drag-and-drop file uploading
- **File Grid Display**: Visual file browser with metadata
- **Permission Management**: Granular access controls (view, edit, admin)
- **Statistics Dashboard**: File sharing metrics and user counts

#### Sub-components:
- **FilesHeader**: Navigation and branding
- **FilesUploadZone**: Multi-file upload interface
- **FilesGrid**: File listing with sorting and filtering
- **FilesPermissionsModal**: Access control configuration

## ⚙️ Settings System Components / Composants du Système de Paramètres

### SettingsPage (`components/SettingsPage.js`)
- **Authentication Guard**: Protected settings access
- **Tabbed Interface**: Organized settings categories
- **User Preferences**: Comprehensive customization options

### SettingsLayout (`components/settings/SettingsLayout.js`)
- **Multi-tab Navigation**: Profile, Privacy, Notifications, Theme, AI, Security, Language, Export
- **Responsive Tabs**: Mobile-friendly settings interface
- **Back Navigation**: Return to main application

#### Settings Sub-components:
- **ProfileSettings**: User profile management
- **PrivacySettings**: Data privacy controls
- **NotificationSettings**: Alert preferences
- **ThemeSettings**: UI theme customization
- **AISettings**: AI feature configuration
- **SecuritySettings**: Account security options
- **LanguageSettings**: Interface language selection
- **DataExport**: User data export functionality

### UI Components Library (`components/ui/`)

#### Design System
- **Consistent Styling**: Tailwind-based design tokens
- **Accessibility**: WCAG compliant components
- **Theme Support**: Dark/light mode compatibility
- **Responsive**: Mobile-first responsive design

#### Available Components:
- **Accordion**: Collapsible content sections with smooth animations
- **Alert Dialog**: Modal dialogs for important confirmations and alerts
- **Alert**: Non-intrusive notification banners
- **Aspect Ratio**: Maintain consistent aspect ratios for media content
- **Avatar**: User profile images with fallback initials
- **Badge**: Small status indicators and labels
- **Breadcrumb**: Navigation breadcrumbs for page hierarchy
- **Button**: Multiple variants (primary, secondary, outline, ghost, link)
- **Calendar**: Interactive date picker with month/year navigation
- **Card**: Content containers with shadows and hover effects
- **Carousel**: Image/content sliders with navigation controls
- **Chart**: Data visualization components for analytics
- **Checkbox**: Form checkboxes with custom styling
- **Collapsible**: Expandable/collapsible content areas
- **Command**: Searchable command palette interface
- **Context Menu**: Right-click context menus
- **Dialog**: Modal dialogs and overlays with backdrop
- **Drawer**: Slide-out panels from screen edges
- **Dropdown Menu**: Dropdown menus with submenus
- **Form**: Form management with validation
- **Hover Card**: Cards that appear on hover
- **Input OTP**: One-time password input fields
- **Input**: Form inputs with validation states and icons
- **Label**: Form labels with proper accessibility
- **Menubar**: Desktop-style menu bars
- **Navigation Menu**: Responsive navigation menus
- **Pagination**: Page navigation controls
- **Popover**: Floating content containers
- **Progress**: Progress bars and indicators
- **Radio Group**: Radio button groups
- **Resizable**: Resizable panel layouts
- **Scroll Area**: Custom scrollbars with smooth scrolling
- **Select**: Dropdown select components
- **Separator**: Visual separators and dividers
- **Sheet**: Slide-out sheets from screen edges
- **Sidebar**: Collapsible side navigation
- **Skeleton**: Loading state placeholders
- **Slider**: Range input sliders
- **Sonner**: Toast notification system
- **Switch**: Toggle switches
- **Table**: Data tables with sorting and pagination
- **Tabs**: Tabbed interface navigation
- **Textarea**: Multi-line text inputs
- **Toast**: Notification messages with auto-dismiss
- **Toaster**: Toast container and provider
- **Toggle Group**: Grouped toggle buttons
- **Toggle**: Individual toggle buttons
- **Tooltip**: Hover tooltips with rich content

## 🎣 Custom Hooks

### useAgenda (`hooks/useAgenda.js`)
Manages agenda-related state and calendar functionality, including event creation, editing, and synchronization across devices.

### useChat (`hooks/useChat.js`)

#### Purpose
Manages all chat-related state and real-time communication.

#### Key Features:
- **Conversation Management**: Fetch, create, and manage conversations
- **Message Handling**: Send, receive, and paginate messages
- **Real-time Updates**: Socket.io event handling
- **Typing Indicators**: User activity tracking
- **Message Status**: Delivery and read receipts
- **Reaction System**: Emoji reactions on messages

#### State Management:
```javascript
const [conversations, setConversations] = useState([]);
const [messages, setMessages] = useState({});
const [onlineUsers, setOnlineUsers] = useState([]);
const [typingUsers, setTypingUsers] = useState({});
const [messageStatuses, setMessageStatuses] = useState({});
```

#### API Methods:
- `fetchConversations()`: Load user's conversations
- `fetchMessages(conversationId, page, limit)`: Load paginated messages
- `sendMessage(conversationId, content, type)`: Send new message
- `startTyping/stopTyping(conversationId)`: Typing indicators
- `addReaction(messageId, emoji)`: Add emoji reactions
- `markAsRead(conversationId, messageId)`: Mark messages as read

### useFileUpload (`hooks/useFileUpload.js`)

#### Purpose
Handles file uploads with progress tracking and validation.

#### Key Features:
- **Multi-format Support**: Images, videos, audio, documents
- **Progress Tracking**: Upload progress indicators
- **File Validation**: Size and type restrictions
- **Error Handling**: Upload failure recovery
- **Preview Generation**: Image and video thumbnails

#### Supported Formats:
```javascript
const allowedTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'video/mp4', 'video/avi', 'video/mov',
  'audio/mp3', 'audio/wav', 'audio/m4a',
  'application/pdf', 'text/plain'
];
```

### use-mobile (`hooks/use-mobile.js`)
Detects mobile device usage for responsive behavior and touch interactions.

### useNotifications (`hooks/useNotifications.js`)

#### Purpose
Manages browser notifications and in-app notification preferences.

#### Key Features:
- **Push Notifications**: Browser-based push notifications
- **Permission Management**: Notification permission handling
- **Settings Management**: User notification preferences
- **Mute Controls**: Per-conversation mute settings

#### Notification Types:
- **Message Notifications**: New message alerts
- **Mention Notifications**: @ mentions in messages
- **Group Notifications**: Group activity updates
- **System Notifications**: App-related announcements

### usePushNotifications (`hooks/usePushNotifications.js`)
Handles push notification subscriptions and delivery for real-time alerts.

### useSettings (`hooks/useSettings.js`)
Manages user settings state and persistence across the application.

### useSocket (`hooks/useSocket.js`)

#### Purpose
Manages WebSocket connection and real-time communication.

#### Key Features:
- **Connection Management**: Automatic connection handling
- **Authentication**: Token-based socket authentication
- **Presence Tracking**: User online/offline status
- **Error Handling**: Connection error recovery
- **Lifecycle Management**: Proper cleanup on unmount

#### Connection Setup:
```javascript
const newSocket = io('http://localhost:8000', {
  auth: { token },
  transports: ['websocket', 'polling']
});
```

#### Event Handling:
- **connect/disconnect**: Connection state management
- **user_online/user_offline**: Presence updates
- **visibilitychange**: Browser tab visibility handling

### useTheme (`hooks/useTheme.js`)

#### Purpose
Manages application theme (dark/light mode) with persistence.

#### Key Features:
- **Theme Persistence**: Local storage theme preference
- **System Preference**: Respects OS theme setting
- **Smooth Transitions**: CSS transition animations
- **Context Provider**: Global theme state management

#### Theme Structure:
```javascript
const themes = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    // ... other theme variables
  },
  dark: {
    background: '#000000',
    foreground: '#ffffff',
    // ... other theme variables
  }
};
```

### use-toast (`hooks/use-toast.js`)
Provides toast notification functionality for user feedback and alerts.

### useVideoCall (`hooks/useVideoCall.js`)

#### Purpose
Manages WebRTC video calling functionality.

#### Key Features:
- **Peer Connection**: WebRTC peer-to-peer connections
- **Media Stream**: Camera and microphone access
- **Call Management**: Initiate, accept, end calls
- **Screen Sharing**: Desktop sharing capability
- **Quality Control**: Adaptive video quality

#### WebRTC Implementation:
```javascript
const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
});
```

## 🎨 Styling & Theming

### Tailwind CSS Configuration

#### Custom Design Tokens:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... theme-aware colors
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        // ... custom animations
      }
    }
  }
};
```

#### CSS Variables for Theming:
```css
/* CSS custom properties for theme switching */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --border: 214.3 31.8% 91.4%;
  /* ... additional theme variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --border: 217.2 32.6% 17.5%;
  /* ... dark theme overrides */
}
```

### Component Styling Patterns

#### Utility-First Approach:
```jsx
<div className="flex h-screen w-screen bg-background text-foreground">
  <div className="flex-1 p-4 rounded-lg border border-border shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Component Title</h2>
    <p className="text-muted-foreground">Component content</p>
  </div>
</div>
```

#### Responsive Design:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid that adapts to screen size */}
</div>
```

## 🔄 State Management Patterns

### Local Component State
- **useState**: Simple state management for component-specific data
- **useReducer**: Complex state logic with actions and reducers
- **useRef**: Direct DOM manipulation and mutable references

### Global State Management
- **Context API**: Theme and authentication context
- **Custom Hooks**: Encapsulated stateful logic
- **Local Storage**: Persistent user preferences

### Real-time State Synchronization
- **Socket.io**: Server-state synchronization
- **Optimistic Updates**: Immediate UI updates with server confirmation
- **Conflict Resolution**: Handling concurrent state changes

## 🚀 Performance Optimizations

### React Performance
- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Expensive computation memoization
- **Code Splitting**: Lazy loading of components
- **Suspense**: Loading state management

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Dynamic Imports**: Load components on demand
- **Image Optimization**: WebP format and responsive images
- **Caching Strategies**: Service worker caching

### Rendering Optimizations
- **Virtual Scrolling**: Efficient large list rendering
- **Debounced Updates**: Reduce excessive re-renders
- **Frame Rate Management**: 60fps animations
- **Memory Management**: Proper cleanup of resources

## 🧪 Testing Strategy

### Component Testing
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatLayout } from './ChatLayout';

test('renders chat layout with sidebars', () => {
  render(<ChatLayout />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
```

### Hook Testing
```javascript
import { renderHook, act } from '@testing-library/react';
import useChat from './useChat';

test('sends message via socket', () => {
  const { result } = renderHook(() => useChat('token'));
  
  act(() => {
    result.current.sendMessage('conv1', 'Hello');
  });
  
  expect(result.current.messages).toContain('Hello');
});
```

### Integration Testing
- **User Flows**: Complete authentication and chat workflows
- **API Integration**: Mock API responses for testing
- **WebSocket Testing**: Real-time feature testing

## 📱 Responsive Design

### Breakpoint Strategy
```javascript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X large devices
};
```

### Mobile-First Components
- **Touch Targets**: Minimum 44px touch targets
- **Swipe Gestures**: Mobile navigation gestures
- **Responsive Images**: Adaptive image loading
- **Performance**: Optimized for mobile networks

### Progressive Enhancement
- **Core Functionality**: Works without JavaScript
- **Enhanced Features**: Progressive addition of advanced features
- **Graceful Degradation**: Fallbacks for unsupported features

## 🔒 Security Considerations

### Client-Side Security
- **Token Management**: Secure JWT token storage
- **Input Validation**: Client-side input sanitization
- **XSS Prevention**: Safe HTML rendering
- **CSRF Protection**: Token-based request validation

### Privacy & Permissions
- **Camera Access**: User permission for camera/microphone
- **Data Minimization**: Only collect necessary user data
- **Consent Management**: Clear user permission requests
- **Data Encryption**: End-to-end encryption for sensitive data

## 🚀 Deployment & Build Process

### Build Configuration
```javascript
// package.json build scripts
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Environment Configuration
```javascript
// Environment variables
REACT_APP_API_URL=https://api.nexof.com
REACT_APP_SOCKET_URL=wss://ws.nexof.com
REACT_APP_VERSION=$npm_package_version
```

### Production Optimizations
- **Code Minification**: Terser for JavaScript minification
- **CSS Optimization**: PostCSS with cssnano
- **Asset Optimization**: Image compression and WebP conversion
- **Bundle Analysis**: Webpack bundle analyzer

## 🔗 Backend Integration / Intégration Backend

### Mock Services Architecture / Architecture des Services Mock

The frontend currently uses mock services in `src/services/mockData.js` for development and testing. These services simulate backend API responses and should be replaced with actual API calls when integrating with the backend.

#### MockAuthService
- **login(email, password)**: Simulates user authentication
- **signup(email, password)**: Simulates user registration
- **verifyToken(token)**: Validates JWT tokens
- **getUserProfile(token)**: Returns user profile data

#### MockChatService
- **getConversations()**: Returns user's chat conversations
- **getMessages(conversationId)**: Fetches messages for a conversation
- **sendMessage(conversationId, content, senderId)**: Sends new messages

#### MockFaceService
- **registerFace(userId, imageBlob)**: Simulates face registration
- **verifyFace(userId, imageBlob)**: Simulates face verification
- **analyzeFace(imageBlob)**: Returns mock face analysis data

#### MockFileService
- **uploadFile(file, conversationId)**: Simulates file uploads

### API Integration Steps

1. **Replace Mock Imports**: Update component imports from mock services to real API services
2. **Environment Variables**: Configure API endpoints via environment variables
3. **Error Handling**: Implement proper error handling for API failures
4. **Loading States**: Add loading indicators for API calls
5. **Authentication**: Integrate JWT token management with API requests

### Socket.io Integration

Real-time features use Socket.io for bidirectional communication:

```javascript
// Connection setup
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  auth: { token: localStorage.getItem('token') },
  transports: ['websocket', 'polling']
});

// Event handlers
socket.on('connect', () => console.log('Connected to server'));
socket.on('message', (data) => handleNewMessage(data));
socket.on('user_online', (userId) => updateUserStatus(userId, 'online'));
```

### TanStack Query Integration

Data fetching uses TanStack Query for caching and synchronization:

```javascript
import { useQuery, useMutation } from '@tanstack/react-query';

const { data: conversations, isLoading } = useQuery({
  queryKey: ['conversations'],
  queryFn: fetchConversations,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Backend API Endpoints

Expected API endpoints for full integration:

- **Authentication**: `/api/auth/login`, `/api/auth/signup`, `/api/auth/verify`
- **Users**: `/api/users/profile`, `/api/users/update`
- **Chat**: `/api/chat/conversations`, `/api/chat/messages`
- **Files**: `/api/files/upload`, `/api/files/list`
- **Agenda**: `/api/agenda/events`, `/api/agenda/sync`
- **Settings**: `/api/settings/profile`, `/api/settings/preferences`

### Future PHP Symfony Backend Integration / Intégration Future du Backend PHP Symfony

The NEXOF frontend is designed to integrate seamlessly with a PHP Symfony backend. The following outlines the planned architecture and integration strategy.

#### Symfony Project Structure / Structure du Projet Symfony

```
backend/
├── config/                    # Configuration files / Fichiers de configuration
│   ├── packages/             # Package configurations / Configurations des paquets
│   ├── routes/               # Route definitions / Définitions des routes
│   └── services.yaml         # Service container config / Config du conteneur de services
├── src/                      # Source code / Code source
│   ├── Controller/           # API Controllers / Contrôleurs API
│   │   ├── AuthController.php
│   │   ├── ChatController.php
│   │   ├── FileController.php
│   │   ├── AgendaController.php
│   │   └── UserController.php
│   ├── Entity/               # Doctrine entities / Entités Doctrine
│   │   ├── User.php
│   │   ├── Conversation.php
│   │   ├── Message.php
│   │   ├── File.php
│   │   └── Event.php
│   ├── Repository/           # Doctrine repositories / Dépôts Doctrine
│   ├── Service/              # Business logic services / Services de logique métier
│   │   ├── AuthService.php
│   │   ├── ChatService.php
│   │   ├── FileService.php
│   │   ├── AIService.php
│   │   └── NotificationService.php
│   ├── EventSubscriber/      # Event subscribers / Abonnés aux événements
│   └── Security/             # Security components / Composants de sécurité
├── templates/                # Twig templates (if needed) / Templates Twig (si nécessaire)
├── public/                   # Public assets / Ressources publiques
├── var/                      # Cache, logs, sessions / Cache, logs, sessions
├── vendor/                   # Composer dependencies / Dépendances Composer
├── composer.json
├── symfony.lock
└── .env
```

#### Key Symfony Components / Composants Symfony Clés

##### API Platform / Plateforme API
For building the REST API with automatic OpenAPI documentation:
```php
// src/Entity/User.php
#[ApiResource(
    operations: [
        new Get(),
        new Put(security: "is_granted('ROLE_USER') and object == user"),
        new Patch(security: "is_granted('ROLE_USER') and object == user"),
    ]
)]
#[ORM\Entity]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\Email]
    private ?string $email = null;

    // ... other properties
}
```

##### JWT Authentication / Authentification JWT
Using LexikJWTAuthenticationBundle for token-based auth:
```yaml
# config/packages/lexik_jwt_authentication.yaml
lexik_jwt_authentication:
    secret_key: '%env(resolve:JWT_SECRET_KEY)%'
    public_key: '%env(resolve:JWT_PUBLIC_KEY)%'
    pass_phrase: '%env(JWT_PASSPHRASE)%'
    token_ttl: 3600
```

##### Doctrine ORM / ORM Doctrine
For database abstraction and entity management:
```php
// src/Service/ChatService.php
class ChatService
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private MessageRepository $messageRepository
    ) {}

    public function sendMessage(User $sender, Conversation $conversation, string $content): Message
    {
        $message = new Message();
        $message->setSender($sender);
        $message->setConversation($conversation);
        $message->setContent($content);
        $message->setCreatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($message);
        $this->entityManager->flush();

        return $message;
    }
}
```

##### Mercure Hub / Hub Mercure
For real-time updates using Server-Sent Events:
```php
// src/Controller/ChatController.php
#[Route('/api/chat/messages', name: 'chat_messages', methods: ['POST'])]
public function sendMessage(Request $request, ChatService $chatService, HubInterface $hub): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    $message = $chatService->sendMessage(
        $this->getUser(),
        $conversation,
        $data['content']
    );

    // Publish real-time update
    $update = new Update(
        'chat/conversation/' . $conversation->getId(),
        json_encode(['type' => 'message', 'data' => $message])
    );
    $hub->publish($update);

    return $this->json($message, Response::HTTP_CREATED);
}
```

##### File Upload Handling / Gestion des Téléchargements de Fichiers
Using VichUploaderBundle for file uploads:
```php
// src/Entity/File.php
#[ORM\Entity]
#[Vich\Uploadable]
class File
{
    #[Vich\UploadableField(mapping: 'files', fileNameProperty: 'fileName')]
    private ?File $fileFile = null;

    #[ORM\Column(nullable: true)]
    private ?string $fileName = null;

    // ... other properties
}
```

#### AI Integration / Intégration IA
Symfony services for AI features:
```php
// src/Service/AIService.php
class AIService
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private string $openaiApiKey
    ) {}

    public function analyzeFace(string $imageData): array
    {
        // Call OpenAI Vision API or similar
        $response = $this->httpClient->request('POST', 'https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->openaiApiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4-vision-preview',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => [
                            ['type' => 'text', 'text' => 'Analyze this face image'],
                            ['type' => 'image_url', 'image_url' => ['url' => 'data:image/jpeg;base64,' . $imageData]]
                        ]
                    ]
                ]
            ]
        ]);

        return $response->toArray();
    }
}
```

#### Database Schema / Schéma de Base de Données

The application will use **MongoDB** as the primary database, integrated with Symfony through Doctrine MongoDB ODM for seamless object-document mapping.

##### MongoDB Collections / Collections MongoDB

```javascript
// users collection
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password": "$argon2id$...",
  "faceEmbedding": [0.1, 0.2, 0.3, ...], // Array of floats for face recognition
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "path/to/avatar.jpg",
    "bio": "User bio..."
  },
  "settings": {
    "theme": "dark",
    "notifications": true,
    "language": "en"
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z"),
  "lastLoginAt": ISODate("2024-01-01T00:00:00Z")
}

// conversations collection
{
  "_id": ObjectId("..."),
  "name": "Group Chat", // null for direct messages
  "type": "group", // "direct" or "group"
  "participants": [
    ObjectId("user_id_1"),
    ObjectId("user_id_2"),
    ObjectId("user_id_3")
  ],
  "admins": [ObjectId("user_id_1")], // For group chats
  "settings": {
    "isPrivate": false,
    "allowInvites": true
  },
  "lastMessageAt": ISODate("2024-01-01T00:00:00Z"),
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}

// messages collection
{
  "_id": ObjectId("..."),
  "conversationId": ObjectId("..."),
  "senderId": ObjectId("..."),
  "content": "Hello, world!",
  "type": "text", // "text", "image", "file", "voice"
  "metadata": {
    "fileUrl": "path/to/file.jpg",
    "fileName": "image.jpg",
    "fileSize": 1024000,
    "mimeType": "image/jpeg",
    "duration": 30 // for voice messages
  },
  "reactions": [
    {
      "emoji": "👍",
      "userId": ObjectId("..."),
      "createdAt": ISODate("2024-01-01T00:00:00Z")
    }
  ],
  "replyTo": ObjectId("message_id"), // For replies
  "editedAt": ISODate("2024-01-01T00:00:00Z"), // null if not edited
  "createdAt": ISODate("2024-01-01T00:00:00Z")
}

// files collection
{
  "_id": ObjectId("..."),
  "name": "document.pdf",
  "originalName": "My Document.pdf",
  "path": "/uploads/documents/document.pdf",
  "size": 2048000,
  "mimeType": "application/pdf",
  "uploadedBy": ObjectId("..."),
  "conversationId": ObjectId("..."), // null for private files
  "permissions": {
    "isPublic": false,
    "allowedUsers": [ObjectId("...")]
  },
  "metadata": {
    "width": 1920, // for images
    "height": 1080,
    "duration": 120 // for videos/audio
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z")
}

// events collection (for agenda)
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "startDate": ISODate("2024-01-01T10:00:00Z"),
  "endDate": ISODate("2024-01-01T11:00:00Z"),
  "isAllDay": false,
  "recurrence": {
    "type": "weekly", // "none", "daily", "weekly", "monthly"
    "interval": 1,
    "endDate": ISODate("2024-12-31T00:00:00Z")
  },
  "location": "Conference Room A",
  "attendees": [
    {
      "userId": ObjectId("..."),
      "status": "accepted" // "pending", "accepted", "declined"
    }
  ],
  "category": "work", // "work", "personal", "social"
  "reminders": [
    {
      "minutes": 15,
      "method": "notification" // "notification", "email"
    }
  ],
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

##### Doctrine MongoDB ODM Entities / Entités Doctrine MongoDB ODM

```php
// src/Document/User.php
#[Document(collection: 'users')]
#[UniqueIndex(keys: ['email' => 1])]
class User
{
    #[Id]
    private ?string $id = null;

    #[Field(type: 'string')]
    #[Assert\Email]
    private string $email;

    #[Field(type: 'string')]
    private string $password;

    #[Field(type: 'hash')] // Array of floats
    private ?array $faceEmbedding = null;

    #[EmbedOne(targetDocument: Profile::class)]
    private ?Profile $profile = null;

    #[Field(type: 'date')]
    private \DateTimeImmutable $createdAt;

    #[Field(type: 'date')]
    private \DateTimeImmutable $updatedAt;

    // ... getters and setters
}

// src/Document/Message.php
#[Document(collection: 'messages')]
#[Index(keys: ['conversationId' => 1, 'createdAt' => -1])]
class Message
{
    #[Id]
    private ?string $id = null;

    #[ReferenceOne(targetDocument: Conversation::class)]
    private Conversation $conversation;

    #[ReferenceOne(targetDocument: User::class)]
    private User $sender;

    #[Field(type: 'string')]
    private string $content;

    #[Field(type: 'string')]
    private string $type = 'text';

    #[Field(type: 'hash')]
    private ?array $metadata = null;

    #[EmbedMany(targetDocument: Reaction::class)]
    private Collection $reactions;

    #[Field(type: 'date')]
    private \DateTimeImmutable $createdAt;

    // ... getters and setters
}
```

#### Integration Steps / Étapes d'Intégration

1. **Set up Symfony project** / **Configurer le projet Symfony**:
   ```bash
   composer create-project symfony/skeleton backend
   cd backend
   composer require api-platform/core
   composer require doctrine/mongodb-odm-bundle
   composer require lexik/jwt-authentication-bundle
   composer require mercure
   composer require vich/uploader-bundle
   ```

2. **Configure environment** / **Configurer l'environnement**:
   ```env
   # .env
   DATABASE_URL=mongodb://localhost:27017/nexof
   JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
   JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
   MERCURE_JWT_SECRET=your_mercure_secret
   ```

3. **Create entities and API endpoints** / **Créer les entités et points de terminaison API**

4. **Implement authentication** / **Implémenter l'authentification**:
   - JWT token generation
   - Face verification endpoints
   - Password hashing with Argon2

5. **Set up real-time communication** / **Configurer la communication en temps réel**:
   - Mercure hub for SSE
   - WebSocket fallback with Socket.io

6. **Implement file upload** / **Implémenter le téléchargement de fichiers**:
   - VichUploaderBundle configuration
   - Cloud storage integration (AWS S3, etc.)

7. **Add AI services** / **Ajouter les services IA**:
   - OpenAI API integration
   - Face recognition services
   - Content moderation

8. **Configure CORS** / **Configurer CORS**:
   ```yaml
   # config/packages/nelmio_cors.yaml
   nelmio_cors:
       defaults:
           allow_origin: ['%env(CORS_ALLOW_ORIGIN)%']
           allow_headers: ['Content-Type', 'Authorization']
           allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
   ```

9. **Deploy and connect** / **Déployer et connecter**:
   - Update frontend environment variables
   - Test API integration
   - Set up CI/CD pipelines

#### Benefits of Symfony Integration / Avantages de l'Intégration Symfony

- **Robust Framework**: Enterprise-grade PHP framework with excellent security features
- **API Platform**: Automatic API generation with OpenAPI documentation
- **MongoDB Integration**: NoSQL database with Doctrine MongoDB ODM for flexible, scalable data storage
- **Real-time Features**: Built-in support for WebSockets and Server-Sent Events via Mercure
- **Scalability**: Horizontal scaling capabilities with proper caching and queuing
- **Ecosystem**: Rich ecosystem of bundles and community support
- **Flexibility**: MongoDB's document-based structure perfectly suits complex, nested data like chat messages with metadata and user profiles

## 🚀 Installation & Testing / Installation & Test

### Prerequisites / Prérequis
- **Node.js 16+**: JavaScript runtime
- **npm or yarn**: Package manager
- **Git**: Version control system

### Installation Steps / Étapes d'Installation

1. **Clone the repository** / **Cloner le dépôt**:
```bash
git clone <repository-url>
cd social-ai-app
```

2. **Install dependencies** / **Installer les dépendances**:
```bash
npm install
# or
yarn install
```

3. **Environment Setup** / **Configuration de l'environnement**:
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_SOCKET_URL=http://localhost:8000
REACT_APP_VERSION=$npm_package_version
```

4. **Start the development server** / **Démarrer le serveur de développement**:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

### Testing / Tests

#### Testing Prerequisites / Prérequis de Test
Before running tests, ensure all dependencies are installed:
```bash
npm install
```

#### Run Tests / Exécuter les Tests
```bash
npm test
# or
yarn test
```

This command runs Jest in interactive watch mode, allowing you to:
- Run all tests
- Run specific test files
- Update snapshots
- View test coverage

#### Test Scripts Available / Scripts de Test Disponibles
- `npm test`: Run all tests in interactive watch mode
- `npm run build`: Create production build (includes type checking)
- `npm run eject`: Eject from Create React App (irreversible)

#### Testing Strategy / Stratégie de Test

##### Unit Tests / Tests Unitaires
Test individual components and hooks in isolation:
```javascript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

##### Component Testing / Tests de Composants
Test component behavior and interactions:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

test('handles form submission', () => {
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password123' }
  });
  fireEvent.click(screen.getByText('Login'));

  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

##### Hook Testing / Tests de Hooks
Test custom hooks using `renderHook`:
```javascript
import { renderHook, act } from '@testing-library/react';
import useChat from './useChat';

test('sends message via socket', () => {
  const { result } = renderHook(() => useChat('token'));

  act(() => {
    result.current.sendMessage('conv1', 'Hello');
  });

  expect(result.current.messages).toContain('Hello');
});
```

##### Integration Tests / Tests d'Intégration
Test complete user flows across multiple components:
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

test('complete authentication flow', async () => {
  render(<App />);

  // Navigate to login
  expect(screen.getByText('Login')).toBeInTheDocument();

  // Fill login form
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'user@example.com' }
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password' }
  });
  fireEvent.click(screen.getByText('Login'));

  // Wait for authentication and navigation
  await waitFor(() => {
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
```

##### E2E Tests / Tests de Bout en Bout
For end-to-end testing, consider using Cypress:
```javascript
// cypress/integration/auth.spec.js
describe('Authentication', () => {
  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('[data-cy=email]').type('user@example.com');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/chat');
  });
});
```

#### Test Coverage / Couverture de Test
To generate test coverage reports:
```bash
npm test -- --coverage --watchAll=false
```

#### Mocking Strategy / Stratégie de Mock
The application uses mock services for development and testing:
- **API Mocks**: Mock backend responses in `src/services/mockData.js`
- **Socket Mocks**: Mock WebSocket connections for real-time features
- **Browser APIs**: Mock camera, geolocation, and other browser APIs

#### Continuous Integration / Intégration Continue
Set up CI/CD pipelines to run tests automatically:
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test -- --watchAll=false --coverage
```

### Build for Production / Construction pour la Production
```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## 🔧 Development Workflow / Flux de Développement

### Code Organization / Organisation du Code
- **Feature-Based Structure**: Components grouped by feature
- **Shared Components**: Reusable UI components in separate directory
- **Utility Functions**: Helper functions in lib directory
- **Type Safety**: PropTypes for component prop validation

### Development Tools
- **Hot Reload**: Fast development with live updates
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Storybook**: Component development and testing

### Version Control
- **Git Flow**: Feature branches and pull requests
- **Conventional Commits**: Standardized commit messages
- **Code Reviews**: Peer review process for quality assurance

This comprehensive frontend documentation provides developers with the knowledge needed to understand, maintain, and extend the NEXOF React application effectively.

Cette documentation complète du frontend fournit aux développeurs les connaissances nécessaires pour comprendre, maintenir et étendre efficacement l'application React NEXOF.