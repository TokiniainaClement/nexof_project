# MERN to Symfony Migration Documentation

## Overview

This document outlines the migration of the Nexof social AI app from a MERN stack (MongoDB, Express.js, React, Node.js) to a React-Symphony stack, where the backend is rebuilt using Symfony PHP framework while maintaining the React frontend.

## Project Structure

### Current State
```
social-ai-app/
├── backend/                          # Original MERN backend (Node.js/Express)
│   ├── server.js                     # Express server with routes
│   ├── models/                       # Mongoose models
│   ├── routes/                       # API route handlers
│   ├── middleware/                   # Authentication middleware
│   ├── uploads/                      # File uploads directory
│   └── symfony-backend/              # NEW: Symfony backend (in progress)
│       ├── src/
│       │   ├── Controller/
│       │   │   └── AuthController.php
│       │   ├── Entity/
│       │   │   ├── User.php
│       │   │   ├── Conversation.php
│       │   │   └── Message.php
│       │   └── Repository/
│       │       ├── UserRepository.php
│       │       ├── ConversationRepository.php
│       │       └── MessageRepository.php
│       ├── config/
│       ├── public/
│       └── vendor/
├── src/                              # React frontend
│   ├── components/
│   │   ├── chat/                     # Chat UI components
│   │   ├── LoginForm.js
│   │   ├── SignUpForm.js
│   │   └── FaceCapture.js
│   ├── hooks/
│   └── App.js
└── package.json
```

## Migration Progress

### ✅ Completed
1. **Project Analysis**: Analyzed existing MERN backend structure and dependencies
2. **Symfony Setup**: Created new Symfony skeleton project
3. **Entity Migration**: Migrated Mongoose models to Doctrine MongoDB ODM entities
   - User entity with authentication fields and face descriptors
   - Conversation entity with participant management
   - Message entity with reactions and metadata
4. **Repository Layer**: Created MongoDB-specific repositories with custom queries
5. **Basic Controllers**: Implemented AuthController with signup/login/face verification endpoints

### 🔄 In Progress
- MongoDB PHP extension installation
- Database configuration and service setup

### ❌ Still To Complete
1. **System Dependencies**
2. **Database Configuration**
3. **Security Setup**
4. **Controller Completion**
5. **Face Recognition Implementation**
6. **File Upload Handling**
7. **Frontend Integration**
8. **Testing & Deployment**

## System Requirements

### Prerequisites
- PHP 8.4+
- Composer
- MongoDB
- Node.js 16+
- npm/yarn

### Required PHP Extensions
```bash
sudo apt-get install php8.4-mongodb
```

## Backend Architecture (Symfony)

### Entities

#### User Entity
```php
#[ODM\Document]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    private ?string $id;
    private ?string $email;
    private ?string $password;
    private ?string $displayName;
    private array $faceDescriptors = [];
    // ... additional fields
}
```

#### Conversation Entity
```php
#[ODM\Document]
class Conversation
{
    private ?string $id;
    private ?string $type; // 'direct' or 'group'
    private ?string $name;
    private array $participants = [];
    private ?array $lastMessage;
    // ... additional fields
}
```

#### Message Entity
```php
#[ODM\Document]
class Message
{
    private ?string $id;
    private ?string $conversationId;
    private ?User $senderId;
    private ?string $content;
    private ?string $messageType;
    private array $reactions = [];
    // ... additional fields
}
```

### Controllers

#### AuthController
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login with optional face verification
- `POST /api/auth/face-register` - Facial recognition registration
- `POST /api/auth/face-verify` - Facial recognition verification
- `GET /api/user/profile` - Get user profile

#### Planned Controllers
- **ConversationController**: CRUD operations for conversations
- **MessageController**: Message management and real-time features
- **IntegrationController**: External service integrations (Slack, GitHub, etc.)
- **FileController**: File upload and management

## Frontend Architecture (React - Unchanged)

### Key Components
- **LoginForm/SignUpForm**: Authentication UI
- **FaceCapture**: Facial recognition interface
- **Chat Components**: Real-time messaging UI
- **Integration Modals**: External service connections

### API Integration
The frontend currently calls:
- `/api/auth/*` endpoints
- `/api/conversations/*` endpoints
- `/api/messages/*` endpoints
- `/api/integrations/*` endpoints

## Missing Components & Implementation Steps

### 1. Database Configuration
```yaml
# config/packages/doctrine_mongodb.yaml
doctrine_mongodb:
    connections:
        default:
            server: mongodb://localhost:27017
            options: {}
    default_database: nexof_db
    document_managers:
        default:
            mappings:
                App:
                    type: annotation
                    dir: '%kernel.project_dir%/src/Entity'
                    prefix: 'App\Entity'
                    is_bundle: false
```

### 2. Security Configuration
```yaml
# config/packages/security.yaml
security:
    providers:
        mongodb:
            mongodb: { class: App\Entity\User, property: email }
    firewalls:
        main:
            stateless: true
            provider: mongodb
            jwt: ~
    access_control:
        - { path: ^/api/auth, roles: PUBLIC_ACCESS }
        - { path: ^/api, roles: IS_AUTHENTICATED_FULLY }
```

### 3. JWT Configuration
```yaml
# config/packages/lexik_jwt_authentication.yaml
lexik_jwt_authentication:
    secret_key: '%env(resolve:JWT_SECRET_KEY)%'
    public_key: '%env(resolve:JWT_PUBLIC_KEY)%'
    pass_phrase: '%env(JWT_PASSPHRASE)%'
```

### 4. CORS Configuration
```yaml
# config/packages/nelmio_cors.yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['%env(CORS_ALLOW_ORIGIN)%']
        allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
        allow_headers: ['Content-Type', 'Authorization']
        expose_headers: ['Link']
        max_age: 3600
    paths:
        '^/api/':
            allow_origin: ['*']
            allow_headers: ['*']
            allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
            max_age: 3600
```

### 5. Face Recognition Implementation
Replace placeholder implementations with actual face recognition:

**Options:**
1. **PHP-ML with OpenCV**: Use PHP-ML library with OpenCV extension
2. **Face Recognition API**: Integrate with external face recognition service
3. **Python Bridge**: Call Python face_recognition library via exec()

**Recommended Approach:**
```php
// Use a PHP face recognition library or API
class FaceRecognitionService
{
    public function extractDescriptors(UploadedFile $image): array
    {
        // Implement actual face descriptor extraction
        // Return array of float values representing face features
    }

    public function compareFaces(array $storedDescriptors, array $inputDescriptors): float
    {
        // Implement face comparison algorithm
        // Return similarity score (0.0 to 1.0)
    }
}
```

### 6. File Upload Handling
```php
#[Route('/api/upload', name: 'api_upload', methods: ['POST'])]
public function upload(Request $request): JsonResponse
{
    $file = $request->files->get('file');
    // Implement file validation and storage
    // Support images, videos, documents
}
```

### 7. Real-time Features (WebSocket)
Symfony doesn't have built-in WebSocket support like Socket.io. Options:
1. **Mercure Hub**: Symfony's official real-time solution
2. **Ratchet**: PHP WebSocket library
3. **External Service**: Redis pub/sub with separate WebSocket server

### 8. External Service Integrations
Implement webhook handlers for:
- **Slack**: Message synchronization
- **GitHub**: Commit and issue notifications
- **Trello**: Card updates
- **Google Calendar**: Event reminders
- **Gmail**: Email notifications

## Environment Configuration

### .env File
```env
# Database
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB=nexof_db

# JWT
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=your_secret_passphrase

# CORS
CORS_ALLOW_ORIGIN=http://localhost:3000

# File Uploads
UPLOAD_DIR=%kernel.project_dir%/public/uploads
MAX_FILE_SIZE=52428800
```

## Testing Strategy

### Unit Tests
```bash
php bin/phpunit
```

### API Testing
```bash
php bin/console debug:router
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Integration Tests
- Test complete authentication flow
- Test conversation creation and messaging
- Test file uploads
- Test external service integrations

## Deployment

### Development
```bash
cd backend/symfony-backend
composer install
php bin/console doctrine:mongodb:schema:create
php bin/console cache:clear
php bin/console debug:router
symfony serve
```

### Production
```bash
# Build assets
npm run build

# Deploy Symfony app
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Use web server (Apache/Nginx) with PHP-FPM
```

## Migration Checklist

- [x] Analyze current MERN structure
- [x] Set up Symfony project
- [x] Migrate entities to Doctrine ODM
- [x] Create basic controllers
- [ ] Install MongoDB PHP extension
- [ ] Configure database connections
- [ ] Set up security (JWT, CORS)
- [ ] Implement face recognition
- [ ] Complete conversation controllers
- [ ] Complete message controllers
- [ ] Implement file uploads
- [ ] Add external integrations
- [ ] Set up real-time features
- [ ] Update frontend API calls
- [ ] Test all functionality
- [ ] Deploy and verify

## Known Issues & Considerations

1. **Face Recognition**: Current implementation is placeholder - needs actual computer vision library
2. **Real-time Communication**: Socket.io functionality needs to be replaced with Symfony-compatible solution
3. **File Storage**: Need to implement proper file storage strategy
4. **Performance**: MongoDB queries need optimization for large datasets
5. **Security**: Implement proper rate limiting and input validation
6. **Scalability**: Consider Redis for session storage and caching

## Next Steps

1. Complete MongoDB extension installation
2. Configure database connections and services
3. Implement actual face recognition functionality
4. Complete remaining controllers
5. Test integration with existing frontend
6. Migrate data from current MERN setup
7. Deploy and monitor

This migration transforms the application from a JavaScript-only stack to a modern PHP backend with React frontend, providing better performance, security, and maintainability while preserving all existing functionality.