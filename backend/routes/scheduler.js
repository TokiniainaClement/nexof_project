const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// In-memory storage for scheduled messages (in production, use a proper job queue like Redis/Bull)
const scheduledMessages = new Map();

// Schedule a message
router.post('/schedule', async (req, res) => {
  try {
    const { conversationId, content, scheduledFor, repeat = 'none', repeatInterval = 1, repeatUnit = 'days' } = req.body;

    // Verify conversation access
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: { $elemMatch: { userId: req.user.id } }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const scheduledDate = new Date(scheduledFor);
    if (scheduledDate <= new Date()) {
      return res.status(400).json({ message: 'La date doit être dans le futur' });
    }

    // Create scheduled message record
    const scheduledMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: req.user.id,
      content,
      scheduledFor: scheduledDate.toISOString(),
      repeat,
      repeatInterval: repeat === 'none' ? null : repeatInterval,
      repeatUnit: repeat === 'none' ? null : repeatUnit,
      status: 'pending',
      createdAt: new Date().toISOString(),
      nextSend: scheduledDate.toISOString()
    };

    // Store in memory (in production, use database)
    scheduledMessages.set(scheduledMessage.id, scheduledMessage);

    // Schedule the message
    scheduleMessage(scheduledMessage);

    res.json({
      message: 'Message programmé avec succès',
      scheduledMessage: {
        id: scheduledMessage.id,
        scheduledFor: scheduledMessage.scheduledFor,
        status: scheduledMessage.status
      }
    });

  } catch (error) {
    console.error('Error scheduling message:', error);
    res.status(500).json({ message: 'Erreur lors de la programmation' });
  }
});

// Update scheduled message
router.put('/update', async (req, res) => {
  try {
    const { messageId, content, scheduledFor, repeat, repeatInterval, repeatUnit } = req.body;

    const scheduledMessage = scheduledMessages.get(messageId);
    if (!scheduledMessage) {
      return res.status(404).json({ message: 'Message programmé non trouvé' });
    }

    // Verify ownership
    if (scheduledMessage.senderId !== req.user.id) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const scheduledDate = new Date(scheduledFor);
    if (scheduledDate <= new Date()) {
      return res.status(400).json({ message: 'La date doit être dans le futur' });
    }

    // Update message
    scheduledMessage.content = content;
    scheduledMessage.scheduledFor = scheduledDate.toISOString();
    scheduledMessage.repeat = repeat;
    scheduledMessage.repeatInterval = repeat === 'none' ? null : repeatInterval;
    scheduledMessage.repeatUnit = repeat === 'none' ? null : repeatUnit;
    scheduledMessage.nextSend = scheduledDate.toISOString();

    // Reschedule
    clearTimeout(scheduledMessage.timeoutId);
    scheduleMessage(scheduledMessage);

    res.json({ message: 'Message modifié avec succès' });

  } catch (error) {
    console.error('Error updating scheduled message:', error);
    res.status(500).json({ message: 'Erreur lors de la modification' });
  }
});

// Get scheduled messages for conversation
router.get('/:conversationId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: { $elemMatch: { userId: req.user.id } }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Get messages for this conversation and user
    const userScheduledMessages = Array.from(scheduledMessages.values())
      .filter(msg => msg.conversationId === req.params.conversationId && msg.senderId === req.user.id)
      .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor));

    res.json(userScheduledMessages);

  } catch (error) {
    console.error('Error getting scheduled messages:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
});

// Delete scheduled message
router.delete('/:messageId', async (req, res) => {
  try {
    const scheduledMessage = scheduledMessages.get(req.params.messageId);

    if (!scheduledMessage) {
      return res.status(404).json({ message: 'Message programmé non trouvé' });
    }

    // Verify ownership
    if (scheduledMessage.senderId !== req.user.id) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Clear timeout and delete
    if (scheduledMessage.timeoutId) {
      clearTimeout(scheduledMessage.timeoutId);
    }

    scheduledMessages.delete(req.params.messageId);

    res.json({ message: 'Message supprimé avec succès' });

  } catch (error) {
    console.error('Error deleting scheduled message:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

// Helper function to schedule a message
function scheduleMessage(scheduledMessage) {
  const now = new Date();
  const scheduledTime = new Date(scheduledMessage.nextSend);
  const delay = scheduledTime - now;

  if (delay > 0) {
    scheduledMessage.timeoutId = setTimeout(async () => {
      try {
        // Send the message
        await sendScheduledMessage(scheduledMessage);

        // Handle repetition
        if (scheduledMessage.repeat !== 'none') {
          scheduleNextOccurrence(scheduledMessage);
        } else {
          // Remove from scheduled messages
          scheduledMessages.delete(scheduledMessage.id);
        }
      } catch (error) {
        console.error('Error sending scheduled message:', error);
      }
    }, delay);
  }
}

// Send the scheduled message
async function sendScheduledMessage(scheduledMessage) {
  try {
    // Create the message in database
    const message = new Message({
      conversationId: scheduledMessage.conversationId,
      senderId: scheduledMessage.senderId,
      content: scheduledMessage.content,
      messageType: 'text',
      isScheduled: true
    });

    await message.save();

    // Update conversation last message
    await Conversation.findByIdAndUpdate(scheduledMessage.conversationId, {
      lastMessage: {
        messageId: message._id,
        content: message.content,
        senderId: message.senderId,
        timestamp: message.createdAt
      },
      messageCount: await Message.countDocuments({ conversationId: scheduledMessage.conversationId })
    });

    // Broadcast to conversation via WebSocket
    const io = require('../server').io;
    if (io) {
      io.to(scheduledMessage.conversationId).emit('new_message', {
        message: {
          _id: message._id,
          conversationId: message.conversationId,
          senderId: message.senderId,
          content: message.content,
          messageType: message.messageType,
          isScheduled: message.isScheduled,
          createdAt: message.createdAt
        },
        conversationId: scheduledMessage.conversationId
      });
    }

    console.log(`Scheduled message sent: ${message._id}`);

  } catch (error) {
    console.error('Error sending scheduled message:', error);
    throw error;
  }
}

// Schedule next occurrence for repeating messages
function scheduleNextOccurrence(scheduledMessage) {
  const nextDate = new Date(scheduledMessage.nextSend);

  switch (scheduledMessage.repeatUnit) {
    case 'minutes':
      nextDate.setMinutes(nextDate.getMinutes() + scheduledMessage.repeatInterval);
      break;
    case 'hours':
      nextDate.setHours(nextDate.getHours() + scheduledMessage.repeatInterval);
      break;
    case 'days':
      nextDate.setDate(nextDate.getDate() + scheduledMessage.repeatInterval);
      break;
    case 'weeks':
      nextDate.setDate(nextDate.getDate() + (scheduledMessage.repeatInterval * 7));
      break;
    case 'months':
      nextDate.setMonth(nextDate.getMonth() + scheduledMessage.repeatInterval);
      break;
  }

  scheduledMessage.nextSend = nextDate.toISOString();
  scheduledMessage.status = 'pending';

  // Schedule next occurrence
  scheduleMessage(scheduledMessage);
}

// Cleanup function for server shutdown
function cleanupScheduledMessages() {
  for (const [id, message] of scheduledMessages) {
    if (message.timeoutId) {
      clearTimeout(message.timeoutId);
    }
  }
  scheduledMessages.clear();
}

// Export cleanup function
router.cleanup = cleanupScheduledMessages;

module.exports = router;