import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState('default');
  const [registration, setRegistration] = useState(null);

  // Check if push notifications are supported
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  // Register service worker
  const registerServiceWorker = useCallback(async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      setRegistration(reg);
      return reg;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      toast.error('Les notifications push ne sont pas supportées sur ce navigateur');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        toast.success('Notifications activées ! 🎉');
        return true;
      } else {
        toast.error('Permission de notification refusée');
        return false;
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast.error('Erreur lors de la demande de permission');
      return false;
    }
  }, [isSupported]);

  // Subscribe to push notifications
  const subscribe = useCallback(async (userId) => {
    if (!registration) {
      toast.error('Service Worker non enregistré');
      return null;
    }

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
      });

      // Send subscription to backend
      const response = await fetch('http://localhost:5000/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          subscription,
          userId
        })
      });

      if (response.ok) {
        setIsSubscribed(true);
        toast.success('Abonnement aux notifications réussi');
        return subscription;
      } else {
        throw new Error('Failed to subscribe on backend');
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      toast.error('Erreur lors de l\'abonnement aux notifications');
      return null;
    }
  }, [registration]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    try {
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();

        // Notify backend
        await fetch('http://localhost:5000/api/notifications/unsubscribe', {
          method: 'POST',
          headers: {
            'x-auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint
          })
        });

        setIsSubscribed(false);
        toast.success('Désabonnement des notifications réussi');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast.error('Erreur lors du désabonnement');
    }
  }, [registration]);

  // Send notification (for testing)
  const sendTestNotification = useCallback(async () => {
    if (!isSubscribed) {
      toast.error('Vous n\'êtes pas abonné aux notifications');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/notifications/test', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      if (response.ok) {
        toast.success('Notification de test envoyée !');
      } else {
        throw new Error('Failed to send test notification');
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast.error('Erreur lors de l\'envoi de la notification de test');
    }
  }, [isSubscribed]);

  // Initialize push notifications
  const initialize = useCallback(async (userId) => {
    if (!isSupported) return;

    const reg = await registerServiceWorker();
    if (!reg) return;

    // Check existing subscription
    const existingSubscription = await reg.pushManager.getSubscription();
    setIsSubscribed(!!existingSubscription);

    // Auto-subscribe if permission granted and not already subscribed
    if (permission === 'granted' && !existingSubscription && userId) {
      await subscribe(userId);
    }
  }, [isSupported, permission, registerServiceWorker, subscribe]);

  // Utility function to convert VAPID key
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return {
    isSupported,
    isSubscribed,
    permission,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    initialize
  };
};

export default usePushNotifications;