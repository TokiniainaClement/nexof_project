// Mock data service for frontend-only functionality
export const mockUsers = [
  {
    _id: 'user1',
    email: 'demo@nexof.com',
    password: 'demo123',
    displayName: 'Demo User',
    faceRegistered: true,
    createdAt: new Date().toISOString(),
    status: 'online'
  },
  {
    _id: 'user2',
    email: 'alice@nexof.com',
    password: 'alice123',
    displayName: 'Alice Johnson',
    faceRegistered: true,
    createdAt: new Date().toISOString(),
    status: 'online'
  },
  {
    _id: 'user3',
    email: 'bob@nexof.com',
    password: 'bob123',
    displayName: 'Bob Smith',
    faceRegistered: false,
    createdAt: new Date().toISOString(),
    status: 'away'
  }
];

export const mockConversations = [
  {
    _id: 'group1',
    name: 'Salle principale NEXOF',
    type: 'group',
    participants: [
      { userId: mockUsers[0], role: 'admin' },
      { userId: mockUsers[1], role: 'member' },
      { userId: mockUsers[2], role: 'member' }
    ],
    createdAt: new Date().toISOString(),
    lastMessage: {
      content: 'Bienvenue dans NEXOF ! 🚀',
      senderId: mockUsers[0],
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  },
  {
    _id: 'user1-user2',
    type: 'direct',
    participants: [
      { userId: mockUsers[0], role: 'member' },
      { userId: mockUsers[1], role: 'member' }
    ],
    createdAt: new Date().toISOString(),
    lastMessage: {
      content: 'Salut ! Comment ça va ?',
      senderId: mockUsers[1],
      createdAt: new Date(Date.now() - 1800000).toISOString()
    }
  }
];

export const mockMessages = {
  group1: [
    {
      _id: 'msg1',
      content: 'Bienvenue dans NEXOF ! 🚀',
      senderId: mockUsers[0],
      conversationId: 'group1',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      messageType: 'text',
      readBy: [mockUsers[0]._id],
      reactions: []
    },
    {
      _id: 'msg2',
      content: 'Merci ! C\'est incroyable ici 😍',
      senderId: mockUsers[1],
      conversationId: 'group1',
      createdAt: new Date(Date.now() - 3300000).toISOString(),
      messageType: 'text',
      readBy: [mockUsers[0]._id, mockUsers[1]._id],
      reactions: [{ emoji: '❤️', users: [mockUsers[0]._id] }]
    },
    {
      _id: 'msg3',
      content: 'L\'IA intégrée est vraiment puissante ! 🤖',
      senderId: mockUsers[2],
      conversationId: 'group1',
      createdAt: new Date(Date.now() - 3000000).toISOString(),
      messageType: 'text',
      readBy: [mockUsers[0]._id, mockUsers[1]._id, mockUsers[2]._id],
      reactions: []
    }
  ],
  'user1-user2': [
    {
      _id: 'msg4',
      content: 'Salut ! Comment ça va ?',
      senderId: mockUsers[1],
      conversationId: 'user1-user2',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      messageType: 'text',
      readBy: [mockUsers[1]._id],
      reactions: []
    },
    {
      _id: 'msg5',
      content: 'Très bien merci ! Et toi ? Le projet avance bien 🚀',
      senderId: mockUsers[0],
      conversationId: 'user1-user2',
      createdAt: new Date(Date.now() - 1500000).toISOString(),
      messageType: 'text',
      readBy: [mockUsers[0]._id, mockUsers[1]._id],
      reactions: []
    }
  ]
};

// Mock face analysis data
export const mockFaceAnalysis = {
  faceCount: 1,
  analysis: [
    {
      faceId: 1,
      detection: {
        score: 0.95,
        box: { x: 100, y: 80, width: 120, height: 150 }
      },
      demographics: {
        age: 28,
        gender: 'male',
        genderProbability: 0.87,
        confidence: 0.92
      },
      emotions: {
        happy: 0.8,
        neutral: 0.15,
        surprised: 0.05
      },
      landmarks: {
        leftEye: [{ x: 130, y: 120 }],
        rightEye: [{ x: 180, y: 118 }],
        nose: [{ x: 155, y: 145 }]
      }
    }
  ],
  processingTime: 150
};

// Mock authentication service
export class MockAuthService {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const token = this.generateToken(user);
          resolve({
            token,
            user: { ...user, password: undefined },
            requireFaceScan: !user.faceRegistered
          });
        } else {
          reject(new Error('Email ou mot de passe incorrect'));
        }
      }, 1000);
    });
  }

  static signup(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          reject(new Error('Cet email est déjà utilisé'));
        } else {
          const newUser = {
            _id: `user${mockUsers.length + 1}`,
            email,
            password,
            displayName: email.split('@')[0],
            faceRegistered: false,
            createdAt: new Date().toISOString(),
            status: 'online'
          };
          mockUsers.push(newUser);
          resolve({ userId: newUser._id });
        }
      }, 1000);
    });
  }

  static verifyToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = mockUsers.find(u => u._id === payload.id);
      return user ? { ...user, password: undefined } : null;
    } catch {
      return null;
    }
  }

  static generateToken(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: user._id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }

  static getUserProfile(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.verifyToken(token);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Token invalide'));
        }
      }, 500);
    });
  }
}

// Mock chat service
export class MockChatService {
  static getConversations() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockConversations);
      }, 500);
    });
  }

  static getMessages(conversationId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const messages = mockMessages[conversationId] || [];
        resolve(messages);
      }, 300);
    });
  }

  static sendMessage(conversationId, content, senderId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newMessage = {
          _id: `msg${Date.now()}`,
          content,
          senderId: mockUsers.find(u => u._id === senderId),
          conversationId,
          createdAt: new Date().toISOString(),
          messageType: 'text',
          readBy: [senderId],
          reactions: []
        };

        if (!mockMessages[conversationId]) {
          mockMessages[conversationId] = [];
        }
        mockMessages[conversationId].push(newMessage);

        // Update last message in conversation
        const conversation = mockConversations.find(c => c._id === conversationId);
        if (conversation) {
          conversation.lastMessage = {
            content,
            senderId: newMessage.senderId,
            createdAt: newMessage.createdAt
          };
        }

        resolve(newMessage);
      }, 200);
    });
  }

  static getOnlineUsers() {
    return mockUsers.filter(u => u.status === 'online' || u.status === 'away');
  }
}

// Mock face service
export class MockFaceService {
  static registerFace(userId, imageBlob) {
    return new Promise(resolve => {
      setTimeout(() => {
        const user = mockUsers.find(u => u._id === userId);
        if (user) {
          user.faceRegistered = true;
          resolve({ success: true, message: 'Visage enregistré avec succès' });
        } else {
          throw new Error('Utilisateur non trouvé');
        }
      }, 2000);
    });
  }

  static verifyFace(userId, imageBlob) {
    return new Promise(resolve => {
      setTimeout(() => {
        const user = mockUsers.find(u => u._id === userId);
        if (user && user.faceRegistered) {
          const token = MockAuthService.generateToken(user);
          resolve({ success: true, token, message: 'Vérification réussie' });
        } else {
          throw new Error('Visage non reconnu');
        }
      }, 2000);
    });
  }

  static analyzeFace(imageBlob) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFaceAnalysis);
      }, 1000);
    });
  }
}

// Mock file upload service
export class MockFileService {
  static uploadFile(file, conversationId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          fileId: `file${Date.now()}`,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          url: `mock-url-${file.name}`
        });
      }, 1000);
    });
  }
}

// Utility functions
export const generateMockId = () => `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));