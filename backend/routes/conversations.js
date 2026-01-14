const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Create a new conversation
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, type, participantIds, isPublic } = req.body;
    const creatorId = req.user.id;

    // Validate input
    if (!type || !['direct', 'group'].includes(type)) {
      return res.status(400).json({ message: 'Type de conversation invalide' });
    }

    if (type === 'group' && !name) {
      return res.status(400).json({ message: 'Le nom est requis pour les groupes' });
    }

    // For direct conversations, ensure only 2 participants
    if (type === 'direct') {
      if (!participantIds || participantIds.length !== 1) {
        return res.status(400).json({ message: 'Une conversation directe doit avoir exactement 2 participants' });
      }

      // Check if direct conversation already exists
      const existingConversation = await Conversation.findOne({
        type: 'direct',
        participants: {
          $all: [
            { $elemMatch: { userId: creatorId } },
            { $elemMatch: { userId: participantIds[0] } }
          ]
        }
      });

      if (existingConversation) {
        return res.status(409).json({
          message: 'Une conversation directe existe déjà avec cet utilisateur',
          conversation: existingConversation
        });
      }
    }

    // Create participants array
    const participants = [{ userId: creatorId, role: 'admin' }];

    if (participantIds) {
      participantIds.forEach(userId => {
        if (userId !== creatorId) {
          participants.push({ userId, role: 'member' });
        }
      });
    }

    // Create conversation
    const conversation = new Conversation({
      type,
      name: type === 'group' ? name : null,
      description: type === 'group' ? description : null,
      participants,
      createdBy: creatorId,
      settings: {
        isPublic: type === 'group' ? isPublic || false : false,
        allowInvites: type === 'group'
      }
    });

    await conversation.save();

    // Populate participants for response
    await conversation.populate('participants.userId', 'email displayName avatar status');

    res.status(201).json({
      message: 'Conversation créée avec succès',
      conversation
    });

  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la conversation' });
  }
});

// Get user's conversations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, limit = 50, offset = 0 } = req.query;

    let query = {
      participants: {
        $elemMatch: { userId: userId }
      }
    };

    if (type && ['direct', 'group'].includes(type)) {
      query.type = type;
    }

    const conversations = await Conversation.find(query)
      .populate('participants.userId', 'email displayName avatar status')
      .populate('lastMessage.senderId', 'email displayName')
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    // Add unread counts for each conversation
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await conv.getUnreadCount(userId);
        return {
          ...conv.toObject(),
          unreadCount
        };
      })
    );

    res.json({
      conversations: conversationsWithUnread,
      total: await Conversation.countDocuments(query)
    });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des conversations' });
  }
});

// Get conversation by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: {
        $elemMatch: { userId: userId }
      }
    })
    .populate('participants.userId', 'email displayName avatar status')
    .populate('createdBy', 'email displayName');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation non trouvée' });
    }

    res.json({ conversation });

  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la conversation' });
  }
});

// Update conversation
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;
    const updates = req.body;

    // Check if user is admin
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: {
        $elemMatch: { userId: userId, role: 'admin' }
      }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'description', 'settings'];
    const updateData = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        if (key === 'settings') {
          updateData.settings = { ...conversation.settings, ...updates.settings };
        } else {
          updateData[key] = updates[key];
        }
      }
    });

    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      updateData,
      { new: true }
    ).populate('participants.userId', 'email displayName avatar status');

    res.json({
      message: 'Conversation mise à jour',
      conversation: updatedConversation
    });

  } catch (error) {
    console.error('Error updating conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour' });
  }
});

// Add participant to group
router.post('/:id/members', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;
    const { newParticipantId, role = 'member' } = req.body;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      type: 'group',
      participants: {
        $elemMatch: { userId: userId, role: 'admin' }
      }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Check if user exists
    const userExists = await User.findById(newParticipantId);
    if (!userExists) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Add participant
    const added = conversation.addParticipant(newParticipantId, role);
    if (!added) {
      return res.status(409).json({ message: 'Utilisateur déjà dans le groupe' });
    }

    await conversation.save();
    await conversation.populate('participants.userId', 'email displayName avatar status');

    res.json({
      message: 'Membre ajouté avec succès',
      conversation
    });

  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du membre' });
  }
});

// Update participant role
router.put('/:id/members/:memberId/role', authMiddleware, async (req, res) => {
  try {
    const { conversationId, memberId } = req.params;
    const userId = req.user.id;
    const { role } = req.body;

    if (!['admin', 'moderator', 'member'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: {
        $elemMatch: { userId: userId, role: 'admin' }
      }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Find and update participant role
    const participant = conversation.participants.find(p => p.userId.toString() === memberId);
    if (!participant) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }

    participant.role = role;
    await conversation.save();

    res.json({ message: 'Rôle mis à jour avec succès' });

  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle' });
  }
});

// Remove participant from group
router.delete('/:id/members/:memberId', authMiddleware, async (req, res) => {
  try {
    const { conversationId, memberId } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: {
        $elemMatch: { userId: userId, role: 'admin' }
      }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Cannot remove yourself if you're the only admin
    const adminCount = conversation.participants.filter(p => p.role === 'admin').length;
    const targetParticipant = conversation.participants.find(p => p.userId.toString() === memberId);

    if (targetParticipant?.role === 'admin' && adminCount === 1 && memberId === userId) {
      return res.status(400).json({ message: 'Impossible de supprimer le dernier administrateur' });
    }

    const removed = conversation.removeParticipant(memberId);
    if (!removed) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }

    await conversation.save();

    res.json({ message: 'Membre retiré avec succès' });

  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ message: 'Erreur lors du retrait du membre' });
  }
});

// Leave conversation
router.post('/:id/leave', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: {
        $elemMatch: { userId: userId }
      }
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation non trouvée' });
    }

    // Cannot leave if you're the only admin
    const adminCount = conversation.participants.filter(p => p.role === 'admin').length;
    const isAdmin = conversation.participants.find(p => p.userId.toString() === userId)?.role === 'admin';

    if (isAdmin && adminCount === 1) {
      return res.status(400).json({ message: 'Impossible de quitter : vous êtes le dernier administrateur' });
    }

    conversation.removeParticipant(userId);
    await conversation.save();

    res.json({ message: 'Conversation quittée avec succès' });

  } catch (error) {
    console.error('Error leaving conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la sortie de la conversation' });
  }
});

// Delete conversation (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: {
        $elemMatch: { userId: userId, role: 'admin' }
      }
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Soft delete by marking as inactive
    conversation.isActive = false;
    await conversation.save();

    res.json({ message: 'Conversation supprimée avec succès' });

  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

module.exports = router;