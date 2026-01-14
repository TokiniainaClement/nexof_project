import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const useNotifications = (socket, currentUser, selectedChat) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    soundEnabled: true,
    desktopEnabled: true,
    showPreviews: true,
    muteList: []
  });

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationSettings(prev => ({
        ...prev,
        desktopEnabled: permission === 'granted'
      }));
    }
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (notificationSettings.soundEnabled) {
      // Create a simple beep sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.warn('Could not play notification sound:', error);
      }
    }
  }, [notificationSettings.soundEnabled]);

  // Show desktop notification
  const showDesktopNotification = useCallback((title, body, icon = '/favicon.ico') => {
    if (notificationSettings.desktopEnabled && 'Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon,
        tag: 'nexof-chat',
        requireInteraction: false,
        silent: !notificationSettings.soundEnabled
      });

      // Auto-close after 5 seconds
      setTimeout(() => notification.close(), 5000);

      // Add to notifications list
      const notificationItem = {
        id: Date.now(),
        title,
        body,
        timestamp: new Date(),
        read: false,
        type: 'message'
      };

      setNotifications(prev => [notificationItem, ...prev].slice(0, 50)); // Keep last 50
    }
  }, [notificationSettings]);

  // Handle new message notifications
  const handleNewMessage = useCallback((data) => {
    const { message, conversationId } = data;

    // Don't notify for own messages
    if (message.senderId._id === currentUser?._id) return;

    // Don't notify if chat is currently selected
    if (selectedChat === conversationId) return;

    // Check if conversation is muted
    if (notificationSettings.muteList.includes(conversationId)) return;

    const senderName = message.senderId.displayName || message.senderId.email;
    const previewText = notificationSettings.showPreviews ? message.content : 'New message';

    // Check for mentions
    const mentionRegex = new RegExp(`@${currentUser?.displayName || currentUser?.email}\\b`, 'i');
    const isMention = mentionRegex.test(message.content);

    if (isMention) {
      // Special handling for mentions
      toast.success(`@${currentUser?.displayName || currentUser?.email} - ${senderName}: ${previewText}`, {
        duration: 6000,
        action: {
          label: 'Reply',
          onClick: () => {
            window.dispatchEvent(new CustomEvent('navigateToChat', {
              detail: { conversationId }
            }));
          }
        }
      });

      showDesktopNotification(
        'You were mentioned!',
        `${senderName} mentioned you`
      );
    } else {
      // Regular message notification
      toast.success(`${senderName}: ${previewText}`, {
        duration: 4000,
        action: {
          label: 'View',
          onClick: () => {
            window.dispatchEvent(new CustomEvent('navigateToChat', {
              detail: { conversationId }
            }));
          }
        }
      });

      showDesktopNotification(
        `New message from ${senderName}`,
        previewText
      );
    }

    // Play sound
    playNotificationSound();

  }, [currentUser, selectedChat, notificationSettings, showDesktopNotification, playNotificationSound]);

  // Handle user mentions
  const handleMention = useCallback((data) => {
    const { message, conversationId } = data;

    if (message.senderId._id === currentUser?._id) return;

    const senderName = message.senderId.displayName || message.senderId.email;

    toast.success(`@${currentUser?.displayName || currentUser?.email} mentioned you`, {
      duration: 6000,
      action: {
        label: 'Reply',
        onClick: () => {
          window.dispatchEvent(new CustomEvent('navigateToChat', {
            detail: { conversationId }
          }));
        }
      }
    });

    showDesktopNotification(
      'You were mentioned',
      `${senderName} mentioned you in a conversation`
    );

    playNotificationSound();
  }, [currentUser, showDesktopNotification, playNotificationSound]);

  // Handle typing indicators
  const handleTyping = useCallback((data) => {
    const { userId, conversationId } = data;

    if (userId === currentUser?._id) return;
    if (selectedChat !== conversationId) return;

    // Could show typing indicator in chat header
    // For now, just log it
    console.log(`User ${userId} is typing in ${conversationId}`);
  }, [currentUser, selectedChat]);

  // Update notification settings
  const updateSettings = useCallback((newSettings) => {
    setNotificationSettings(prev => ({ ...prev, ...newSettings }));
    localStorage.setItem('chatNotificationSettings', JSON.stringify({ ...notificationSettings, ...newSettings }));
  }, [notificationSettings]);

  // Mute/unmute conversation
  const toggleMute = useCallback((conversationId) => {
    setNotificationSettings(prev => {
      const isMuted = prev.muteList.includes(conversationId);
      const newSettings = {
        ...prev,
        muteList: isMuted
          ? prev.muteList.filter(id => id !== conversationId)
          : [...prev.muteList, conversationId]
      };

      localStorage.setItem('chatNotificationSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', handleNewMessage);
    socket.on('mention', handleMention);
    socket.on('user_typing', handleTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('mention', handleMention);
      socket.off('user_typing', handleTyping);
    };
  }, [socket, handleNewMessage, handleMention, handleTyping]);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatNotificationSettings');
    if (saved) {
      try {
        setNotificationSettings(JSON.parse(saved));
      } catch (error) {
        console.warn('Could not parse notification settings:', error);
      }
    }

    // Request notification permission on mount
    requestPermission();
  }, [requestPermission]);

  return {
    notifications,
    notificationSettings,
    updateSettings,
    toggleMute,
    markAsRead,
    clearNotifications,
    requestPermission
  };
};

export default useNotifications;