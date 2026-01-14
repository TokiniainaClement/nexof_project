import { useState, useEffect, useCallback, useRef } from 'react';
import useSocket from './useSocket';
import useNotifications from './useNotifications';
import { MockChatService, mockConversations, mockMessages, mockUsers } from '../services/mockData';

const useChat = (token) => {
  const { socket, isConnected } = useSocket(token);
  const { notifications, notificationSettings, updateSettings, toggleMute } = useNotifications(socket, null, null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [messageStatuses, setMessageStatuses] = useState({});
  const [pagination, setPagination] = useState({});
  const [hasMoreMessages, setHasMoreMessages] = useState({});
  const conversationsRef = useRef([]);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      // Use mock chat service
      const data = await MockChatService.getConversations();
      setConversations(data);
      conversationsRef.current = data;

      // Join conversation rooms (mock)
      if (socket && data.length > 0) {
        socket.emit('join_conversations', data.map(conv => conv._id));
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, [token, socket]);

  // Fetch messages for a conversation with pagination
  const fetchMessages = useCallback(async (conversationId, page = 1, limit = 50) => {
    try {
      setLoading(true);
      // Use mock chat service
      const messages = await MockChatService.getMessages(conversationId);

      setMessages(prev => {
        const existingMessages = prev[conversationId] || [];
        const newMessages = page === 1 ? messages : [...messages, ...existingMessages];

        // Remove duplicates based on message ID
        const uniqueMessages = newMessages.filter((msg, index, self) =>
          index === self.findIndex(m => m._id === msg._id)
        );

        return {
          ...prev,
          [conversationId]: uniqueMessages
        };
      });

      setPagination(prev => ({
        ...prev,
        [conversationId]: {
          currentPage: 1,
          totalPages: 1,
          totalMessages: messages.length
        }
      }));

      setHasMoreMessages(prev => ({
        ...prev,
        [conversationId]: false
      }));

      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load more messages (for infinite scroll)
  const loadMoreMessages = useCallback(async (conversationId) => {
    const currentPage = pagination[conversationId]?.currentPage || 1;
    if (hasMoreMessages[conversationId]) {
      await fetchMessages(conversationId, currentPage + 1);
    }
  }, [pagination, hasMoreMessages, fetchMessages]);

  // Send message
  const sendMessage = useCallback(async (conversationId, content, messageType = 'text') => {
    const tempMessageId = `temp_${Date.now()}`;

    // Create temporary message with sending status
    const tempMessage = {
      _id: tempMessageId,
      conversationId,
      senderId: { _id: currentUser?._id, email: currentUser?.email },
      content,
      messageType,
      createdAt: new Date().toISOString(),
      messageStatus: 'sending',
      readBy: []
    };

    // Add to local state immediately
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), tempMessage]
    }));

    setMessageStatuses(prev => ({
      ...prev,
      [tempMessageId]: 'sending'
    }));

    try {
      // Use mock chat service
      const message = await MockChatService.sendMessage(conversationId, content, currentUser?._id);

      // Update with real message and mark as sent
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId]?.map(msg =>
          msg._id === tempMessageId ? { ...message, messageStatus: 'sent' } : msg
        ) || []
      }));

      setMessageStatuses(prev => ({
        ...prev,
        [message._id]: 'sent'
      }));

      return message;
    } catch (error) {
      console.error('Error sending message:', error);

      // Mark as failed
      setMessageStatuses(prev => ({
        ...prev,
        [tempMessageId]: 'failed'
      }));
    }
  }, [currentUser]);

  // Typing indicators
  const startTyping = useCallback((conversationId) => {
    if (socket && isConnected) {
      socket.emit('typing_start', conversationId);
    }
  }, [socket, isConnected]);

  const stopTyping = useCallback((conversationId) => {
    if (socket && isConnected) {
      socket.emit('typing_stop', conversationId);
    }
  }, [socket, isConnected]);

  // Add reaction
  const addReaction = useCallback((messageId, emoji) => {
    if (socket && isConnected) {
      socket.emit('add_reaction', { messageId, emoji });
    }
  }, [socket, isConnected]);

  // Mark as read
  const markAsRead = useCallback((conversationId, messageId) => {
    if (socket && isConnected) {
      socket.emit('mark_as_read', { conversationId, messageId });
    }
  }, [socket, isConnected]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    // New message received
    const handleNewMessage = (data) => {
      const { message, conversationId, tempMessageId } = data;

      setMessages(prev => {
        const conversationMessages = prev[conversationId] || [];

        // Remove temporary message if it exists
        const filteredMessages = tempMessageId
          ? conversationMessages.filter(msg => msg._id !== tempMessageId)
          : conversationMessages;

        return {
          ...prev,
          [conversationId]: [...filteredMessages, { ...message, messageStatus: 'delivered' }]
        };
      });

      // Update message status
      setMessageStatuses(prev => ({
        ...prev,
        [message._id]: 'delivered',
        [tempMessageId]: undefined
      }));

      // Update conversation's last message
      setConversations(prev =>
        prev.map(conv =>
          conv._id === conversationId
            ? {
                ...conv,
                lastMessage: {
                  messageId: message._id,
                  content: message.content,
                  senderId: message.senderId,
                  timestamp: message.createdAt
                }
              }
            : conv
        )
      );
    };

    // User typing
    const handleUserTyping = (data) => {
      const { userId, conversationId, isTyping } = data;
      setTypingUsers(prev => ({
        ...prev,
        [conversationId]: {
          ...prev[conversationId],
          [userId]: isTyping
        }
      }));
    };

    // Reaction update
    const handleReactionUpdate = (data) => {
      const { messageId, reactions } = data;
      setMessages(prev => {
        const newMessages = { ...prev };
        Object.keys(newMessages).forEach(convId => {
          newMessages[convId] = newMessages[convId].map(msg =>
            msg._id === messageId ? { ...msg, reactions } : msg
          );
        });
        return newMessages;
      });
    };

    // Message read
    const handleMessageRead = (data) => {
      const { conversationId, userId, messageId } = data;
      setMessages(prev => ({
        ...prev,
        [conversationId]: prev[conversationId]?.map(msg =>
          msg._id === messageId
            ? {
                ...msg,
                readBy: [...(msg.readBy || []), { userId, readAt: new Date() }],
                messageStatus: msg.senderId?._id === currentUser?._id ? 'read' : msg.messageStatus
              }
            : msg
        ) || []
      }));

      // Update status for own messages
      setMessageStatuses(prev => ({
        ...prev,
        [messageId]: 'read'
      }));
    };

    // User status change
    const handleUserStatusChange = (data) => {
      const { userId, status, isOnline, lastSeen } = data;
      setOnlineUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, status, isOnline, lastSeen } : user
        )
      );
    };

    // User joined/left
    const handleUserPresence = (data) => {
      const { userId, action, user } = data;
      if (action === 'joined') {
        setOnlineUsers(prev => {
          // Avoid duplicates
          if (prev.some(u => u._id === userId)) {
            return prev.map(u => u._id === userId ? { ...u, ...user } : u);
          }
          return [...prev, user];
        });
      } else if (action === 'left') {
        setOnlineUsers(prev => prev.filter(u => u._id !== userId));
      }
    };

    // Error handling
    const handleError = (error) => {
      console.error('Socket error:', error);
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('reaction_update', handleReactionUpdate);
    socket.on('message_read', handleMessageRead);
    socket.on('user_status_change', handleUserStatusChange);
    socket.on('user_presence', handleUserPresence);
    socket.on('error', handleError);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('reaction_update', handleReactionUpdate);
      socket.off('message_read', handleMessageRead);
      socket.off('user_status_change', handleUserStatusChange);
      socket.off('user_presence', handleUserPresence);
      socket.off('error', handleError);
    };
  }, [socket]);

  // Fetch online users
  const fetchOnlineUsers = useCallback(async () => {
    try {
      // Use mock chat service
      const data = MockChatService.getOnlineUsers();
      setOnlineUsers(data);
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  }, [token]);

  // Fetch current user profile
  const fetchCurrentUser = useCallback(async () => {
    try {
      // Use mock auth service
      const { MockAuthService } = await import('../services/mockData');
      const user = await MockAuthService.getUserProfile(token);
      setCurrentUser(user);
      localStorage.setItem('userId', user._id);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }, [token]);

  // Initialize data
  useEffect(() => {
    if (token) {
      fetchCurrentUser();
      fetchConversations();
      fetchOnlineUsers();
    }
  }, [token, fetchCurrentUser, fetchConversations, fetchOnlineUsers]);

  return {
    conversations,
    messages,
    onlineUsers,
    typingUsers,
    loading,
    isConnected,
    currentUser,
    messageStatuses,
    pagination,
    hasMoreMessages,
    notifications,
    notificationSettings,
    fetchConversations,
    fetchMessages,
    loadMoreMessages,
    sendMessage,
    startTyping,
    stopTyping,
    addReaction,
    markAsRead,
    fetchOnlineUsers,
    fetchCurrentUser,
    updateNotificationSettings: updateSettings,
    toggleMuteConversation: toggleMute
  };
};

export default useChat;