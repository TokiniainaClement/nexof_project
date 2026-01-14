const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// Middleware to check conversation access
const checkConversationAccess = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: { $elemMatch: { userId: req.user.id } }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé à cette conversation' });
    }

    req.conversation = conversation;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Get conversation analytics
router.get('/conversations/:conversationId', checkConversationAccess, async (req, res) => {
  try {
    const { range = 'week' } = req.query;
    const conversationId = req.params.conversationId;

    // Calculate date range
    const now = new Date();
    let startDate;

    switch (range) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get messages within date range
    const messages = await Message.find({
      conversationId,
      createdAt: { $gte: startDate }
    }).populate('senderId', 'email displayName');

    // Calculate basic metrics
    const totalMessages = messages.length;
    const activeParticipants = new Set(messages.map(m => m.senderId._id.toString())).size;

    // Calculate messages per day
    const daysDiff = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));
    const messagesPerDay = Math.round(totalMessages / daysDiff);

    // Calculate message types distribution
    const messageTypes = messages.reduce((acc, msg) => {
      acc[msg.messageType] = (acc[msg.messageType] || 0) + 1;
      return acc;
    }, {});

    // Calculate activity timeline (last 7 days)
    const activityTimeline = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayMessages = messages.filter(msg =>
        msg.createdAt >= dayStart && msg.createdAt < dayEnd
      ).length;

      activityTimeline.push({
        date: dayStart.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
        messages: dayMessages
      });
    }

    // Calculate top contributors
    const contributorStats = messages.reduce((acc, msg) => {
      const userId = msg.senderId._id.toString();
      if (!acc[userId]) {
        acc[userId] = {
          userId,
          displayName: msg.senderId.displayName || msg.senderId.email,
          messageCount: 0
        };
      }
      acc[userId].messageCount++;
      return acc;
    }, {});

    const topContributors = Object.values(contributorStats)
      .sort((a, b) => b.messageCount - a.messageCount)
      .slice(0, 5);

    // Calculate average response time (simplified)
    const avgResponseTime = calculateAverageResponseTime(messages);

    // Calculate engagement metrics
    const totalReactions = messages.reduce((sum, msg) => sum + (msg.reactions?.length || 0), 0);
    const messagesWithReactions = messages.filter(msg => msg.reactions?.length > 0).length;
    const messagesWithReads = messages.filter(msg => msg.readBy?.length > 0).length;

    const engagement = {
      reactionsRate: totalMessages > 0 ? Math.round((messagesWithReactions / totalMessages) * 100) : 0,
      readRate: totalMessages > 0 ? Math.round((messagesWithReads / totalMessages) * 100) : 0,
      responseRate: calculateResponseRate(messages)
    };

    // Calculate sentiment analysis (simplified - based on reactions and message content)
    const sentiment = analyzeSentiment(messages);

    const analytics = {
      totalMessages,
      activeParticipants,
      messagesPerDay,
      avgResponseTime,
      messageTypes,
      activityTimeline,
      topContributors,
      engagement,
      sentiment,
      dateRange: {
        start: startDate,
        end: now,
        range
      }
    };

    res.json(analytics);

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Erreur lors de la génération des statistiques' });
  }
});

// Get user analytics
router.get('/users/:userId', async (req, res) => {
  try {
    const { range = 'month' } = req.query;
    const userId = req.params.userId;

    // Only allow users to view their own analytics
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Calculate date range
    const now = new Date();
    let startDate;

    switch (range) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get user's conversations
    const conversations = await Conversation.find({
      participants: { $elemMatch: { userId: userId } }
    });

    // Get user's messages
    const messages = await Message.find({
      senderId: userId,
      createdAt: { $gte: startDate }
    }).populate('conversationId', 'name type');

    // Calculate user metrics
    const totalMessages = messages.length;
    const conversationsParticipated = conversations.length;

    // Calculate message types
    const messageTypes = messages.reduce((acc, msg) => {
      acc[msg.messageType] = (acc[msg.messageType] || 0) + 1;
      return acc;
    }, {});

    // Calculate activity by conversation
    const conversationActivity = messages.reduce((acc, msg) => {
      const convId = msg.conversationId._id.toString();
      const convName = msg.conversationId.name || (msg.conversationId.type === 'direct' ? 'Conversation privée' : 'Groupe');

      if (!acc[convId]) {
        acc[convId] = {
          conversationId: convId,
          name: convName,
          messageCount: 0
        };
      }
      acc[convId].messageCount++;
      return acc;
    }, {});

    const topConversations = Object.values(conversationActivity)
      .sort((a, b) => b.messageCount - a.messageCount)
      .slice(0, 5);

    // Calculate daily activity
    const dailyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayMessages = messages.filter(msg =>
        msg.createdAt >= dayStart && msg.createdAt < dayEnd
      ).length;

      dailyActivity.push({
        date: dayStart.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
        messages: dayMessages
      });
    }

    const userAnalytics = {
      totalMessages,
      conversationsParticipated,
      messageTypes,
      topConversations,
      dailyActivity,
      averageMessagesPerDay: Math.round(totalMessages / 7),
      dateRange: {
        start: startDate,
        end: now,
        range
      }
    };

    res.json(userAnalytics);

  } catch (error) {
    console.error('User analytics error:', error);
    res.status(500).json({ message: 'Erreur lors de la génération des statistiques utilisateur' });
  }
});

// Helper functions
function calculateAverageResponseTime(messages) {
  if (messages.length < 2) return '0 min';

  // Sort messages by timestamp
  const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);

  let totalResponseTime = 0;
  let responseCount = 0;

  for (let i = 1; i < sortedMessages.length; i++) {
    const current = sortedMessages[i];
    const previous = sortedMessages[i - 1];

    // Only calculate if different senders (back-and-forth conversation)
    if (current.senderId._id.toString() !== previous.senderId._id.toString()) {
      const responseTime = (current.createdAt - previous.createdAt) / (1000 * 60); // minutes
      if (responseTime < 1440) { // Less than 24 hours
        totalResponseTime += responseTime;
        responseCount++;
      }
    }
  }

  if (responseCount === 0) return '0 min';

  const avgMinutes = Math.round(totalResponseTime / responseCount);
  if (avgMinutes < 60) {
    return `${avgMinutes} min`;
  } else {
    const hours = Math.floor(avgMinutes / 60);
    const mins = avgMinutes % 60;
    return `${hours}h ${mins}min`;
  }
}

function calculateResponseRate(messages) {
  if (messages.length < 2) return 0;

  let responseCount = 0;
  const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);

  for (let i = 1; i < sortedMessages.length; i++) {
    const current = sortedMessages[i];
    const previous = sortedMessages[i - 1];

    if (current.senderId._id.toString() !== previous.senderId._id.toString()) {
      responseCount++;
    }
  }

  return Math.round((responseCount / (messages.length - 1)) * 100);
}

function analyzeSentiment(messages) {
  // Simplified sentiment analysis based on reactions and keywords
  let positive = 0;
  let negative = 0;
  let neutral = 0;

  const positiveWords = ['bien', 'super', 'génial', 'excellent', 'parfait', 'cool', 'awesome', 'great', 'love', '❤️', '👍', '😊', '😂'];
  const negativeWords = ['mal', 'nul', 'terrible', 'horrible', 'mauvais', 'hate', 'angry', '😢', '😡', '👎'];

  messages.forEach(msg => {
    const content = msg.content.toLowerCase();

    // Check for positive indicators
    if (positiveWords.some(word => content.includes(word)) || msg.reactions?.some(r => ['❤️', '👍', '😊', '😂'].includes(r.emoji))) {
      positive++;
    }
    // Check for negative indicators
    else if (negativeWords.some(word => content.includes(word)) || msg.reactions?.some(r => ['😢', '😡', '👎'].includes(r.emoji))) {
      negative++;
    }
    // Neutral otherwise
    else {
      neutral++;
    }
  });

  const total = messages.length;
  if (total === 0) return { positive: 0, negative: 0, neutral: 0 };

  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100)
  };
}

module.exports = router;