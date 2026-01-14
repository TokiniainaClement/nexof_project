const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// Mock external service integrations
const mockIntegrations = {
  slack: {
    name: 'Slack',
    webhooks: [],
    channels: ['general', 'random', 'dev']
  },
  github: {
    name: 'GitHub',
    webhooks: [],
    repos: ['nexof-chat', 'social-ai-app']
  },
  trello: {
    name: 'Trello',
    webhooks: [],
    boards: ['Development', 'Marketing', 'Support']
  },
  'google-calendar': {
    name: 'Google Calendar',
    webhooks: [],
    calendars: ['Personal', 'Work', 'Nexof']
  },
  gmail: {
    name: 'Gmail',
    webhooks: [],
    labels: ['Important', 'Work', 'Personal']
  },
  'google-drive': {
    name: 'Google Drive',
    webhooks: [],
    folders: ['Shared', 'Projects', 'Documents']
  },
  discord: {
    name: 'Discord',
    webhooks: [],
    servers: ['Nexof Community', 'Dev Team']
  },
  notion: {
    name: 'Notion',
    webhooks: [],
    workspaces: ['Personal', 'Work', 'Projects']
  }
};

// Get integration status for a conversation
router.get('/status/:conversationId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: { $elemMatch: { userId: req.user.id } }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Mock integration status - in real app, this would come from database
    const integrationStatus = {};
    Object.keys(mockIntegrations).forEach(serviceId => {
      integrationStatus[serviceId] = Math.random() > 0.7; // Random connection status
    });

    res.json(integrationStatus);
  } catch (error) {
    console.error('Error getting integration status:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Connect to external service
router.post('/connect', async (req, res) => {
  try {
    const { serviceId, conversationId, config = {} } = req.body;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: { $elemMatch: { userId: req.user.id } }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    if (!mockIntegrations[serviceId]) {
      return res.status(400).json({ message: 'Service non supporté' });
    }

    // Mock successful connection
    const connectionData = {
      serviceId,
      conversationId,
      userId: req.user.id,
      connectedAt: new Date(),
      config,
      status: 'connected'
    };

    // In real app, save to database
    console.log(`Connected ${serviceId} to conversation ${conversationId}`);

    // Simulate webhook registration
    if (mockIntegrations[serviceId].webhooks) {
      mockIntegrations[serviceId].webhooks.push({
        conversationId,
        url: `http://localhost:5000/api/integrations/webhook/${serviceId}/${conversationId}`,
        secret: generateWebhookSecret()
      });
    }

    res.json({
      message: `Connecté à ${mockIntegrations[serviceId].name}`,
      connection: connectionData
    });

  } catch (error) {
    console.error('Error connecting service:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

// Disconnect from external service
router.delete('/disconnect', async (req, res) => {
  try {
    const { serviceId, conversationId } = req.body;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: { $elemMatch: { userId: req.user.id } }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Mock disconnection
    console.log(`Disconnected ${serviceId} from conversation ${conversationId}`);

    // Remove webhook
    if (mockIntegrations[serviceId]?.webhooks) {
      mockIntegrations[serviceId].webhooks = mockIntegrations[serviceId].webhooks
        .filter(webhook => webhook.conversationId !== conversationId);
    }

    res.json({
      message: `Déconnecté de ${mockIntegrations[serviceId]?.name || serviceId}`
    });

  } catch (error) {
    console.error('Error disconnecting service:', error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
});

// Webhook endpoints for external services
router.post('/webhook/:serviceId/:conversationId', async (req, res) => {
  try {
    const { serviceId, conversationId } = req.params;
    const payload = req.body;

    // Verify webhook secret (in real app)
    const webhook = mockIntegrations[serviceId]?.webhooks
      .find(w => w.conversationId === conversationId);

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found' });
    }

    // Process webhook payload based on service
    const messageContent = processWebhookPayload(serviceId, payload);

    if (messageContent) {
      // Create integration message
      const message = new Message({
        conversationId,
        senderId: null, // System message
        content: messageContent,
        messageType: 'system',
        isAI: true
      });

      await message.save();

      // Update conversation last message
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: {
          messageId: message._id,
          content: message.content,
          senderId: message.senderId,
          timestamp: message.createdAt
        },
        messageCount: await Message.countDocuments({ conversationId })
      });

      // Broadcast to conversation
      const io = req.app.get('io');
      if (io) {
        io.to(conversationId).emit('new_message', {
          message: {
            _id: message._id,
            conversationId: message.conversationId,
            senderId: message.senderId,
            content: message.content,
            messageType: message.messageType,
            isAI: message.isAI,
            createdAt: message.createdAt
          },
          conversationId
        });
      }
    }

    res.json({ message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

// Get available services
router.get('/services', (req, res) => {
  const services = Object.keys(mockIntegrations).map(serviceId => ({
    id: serviceId,
    name: mockIntegrations[serviceId].name,
    description: getServiceDescription(serviceId),
    features: getServiceFeatures(serviceId)
  }));

  res.json(services);
});

// Helper functions
function generateWebhookSecret() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function processWebhookPayload(serviceId, payload) {
  switch (serviceId) {
    case 'slack':
      if (payload.type === 'message' && payload.text) {
        return `💬 **Slack**: ${payload.user} a dit: "${payload.text}"`;
      }
      break;

    case 'github':
      if (payload.action === 'push') {
        const commits = payload.commits?.length || 0;
        return `🔄 **GitHub**: ${payload.sender.login} a poussé ${commits} commit(s) vers ${payload.repository.name}`;
      } else if (payload.action === 'issues' && payload.issue) {
        return `🐛 **GitHub**: Nouvelle issue "${payload.issue.title}" dans ${payload.repository.name}`;
      } else if (payload.action === 'pull_request' && payload.pull_request) {
        return `🔀 **GitHub**: ${payload.action} "${payload.pull_request.title}" dans ${payload.repository.name}`;
      }
      break;

    case 'trello':
      if (payload.action?.type === 'addCard') {
        return `📋 **Trello**: Nouvelle carte "${payload.action.data.card.name}" ajoutée à ${payload.action.data.list.name}`;
      } else if (payload.action?.type === 'updateCard') {
        return `📋 **Trello**: Carte "${payload.action.data.card.name}" mise à jour`;
      }
      break;

    case 'google-calendar':
      if (payload.summary) {
        return `📅 **Calendar**: Rappel - "${payload.summary}" commence bientôt`;
      }
      break;

    case 'gmail':
      if (payload.subject) {
        return `📧 **Gmail**: Nouvel email - "${payload.subject}"`;
      }
      break;

    case 'discord':
      if (payload.content) {
        return `🎮 **Discord**: ${payload.author?.username || 'Utilisateur'}: "${payload.content}"`;
      }
      break;

    case 'notion':
      if (payload.type === 'page' && payload.properties?.title) {
        return `📝 **Notion**: Page "${payload.properties.title.title[0]?.plain_text}" mise à jour`;
      }
      break;
  }

  return null;
}

function getServiceDescription(serviceId) {
  const descriptions = {
    slack: 'Intégrer les messages Slack dans vos conversations',
    github: 'Recevoir les notifications GitHub et commits',
    trello: 'Synchroniser les cartes Trello et mises à jour',
    'google-calendar': 'Recevoir les rappels de calendrier et événements',
    gmail: 'Notifications d\'emails importants',
    'google-drive': 'Partage de fichiers depuis Google Drive',
    discord: 'Intégration avec les serveurs Discord',
    notion: 'Synchronisation avec les bases de données Notion'
  };
  return descriptions[serviceId] || 'Service externe';
}

function getServiceFeatures(serviceId) {
  const features = {
    slack: ['Messages synchronisés', 'Notifications temps réel', 'Canaux partagés'],
    github: ['Commits', 'Issues', 'Pull requests', 'Releases'],
    trello: ['Nouvelles cartes', 'Mises à jour', 'Échéances', 'Commentaires'],
    'google-calendar': ['Rappels d\'événements', 'Réunions', 'Échéances', 'Invitations'],
    gmail: ['Emails prioritaires', 'Rappels', 'Invitations', 'Alertes'],
    'google-drive': ['Partage de fichiers', 'Synchronisation', 'Versions', 'Commentaires'],
    discord: ['Messages', 'Événements', 'Rôles', 'Canaux'],
    notion: ['Pages mises à jour', 'Bases de données', 'Commentaires', 'Mentions']
  };
  return features[serviceId] || [];
}

module.exports = router;