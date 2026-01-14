// Service Worker for Push Notifications
const CACHE_NAME = 'nexof-chat-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('Push received:', event);

  let data = {};

  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || 'Vous avez un nouveau message',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1,
      conversationId: data.conversationId,
      messageId: data.messageId,
      senderId: data.senderId
    },
    actions: [
      {
        action: 'view',
        title: 'Voir',
        icon: '/icon-192x192.png'
      },
      {
        action: 'reply',
        title: 'Répondre',
        icon: '/icon-192x192.png'
      }
    ],
    requireInteraction: true,
    silent: false,
    tag: data.conversationId || 'nexof-chat' // Group notifications by conversation
  };

  // Custom notification title and body based on message type
  let title = 'Nexof Chat';

  if (data.type === 'message') {
    title = `${data.senderName || 'Quelqu\'un'} vous a envoyé un message`;
    options.body = data.content || 'Nouveau message';
  } else if (data.type === 'reaction') {
    title = 'Nouvelle réaction';
    options.body = `${data.senderName} a réagi à votre message`;
  } else if (data.type === 'mention') {
    title = 'Vous avez été mentionné';
    options.body = `${data.senderName} vous a mentionné`;
  } else if (data.type === 'call') {
    title = 'Appel entrant';
    options.body = `${data.senderName} vous appelle`;
    options.actions = [
      {
        action: 'accept',
        title: 'Accepter',
        icon: '/icon-192x192.png'
      },
      {
        action: 'decline',
        title: 'Refuser',
        icon: '/icon-192x192.png'
      }
    ];
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);

  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  if (action === 'view' || !action) {
    // Open the chat app and navigate to the conversation
    event.waitUntil(
      clients.openWindow(`/chat?conversation=${data.conversationId}`)
    );
  } else if (action === 'reply') {
    // Open chat with reply mode
    event.waitUntil(
      clients.openWindow(`/chat?conversation=${data.conversationId}&reply=${data.messageId}`)
    );
  } else if (action === 'accept') {
    // Handle call acceptance (would need additional logic)
    event.waitUntil(
      clients.openWindow(`/chat?conversation=${data.conversationId}&acceptCall=true`)
    );
  } else if (action === 'decline') {
    // Call is automatically declined by not opening
    console.log('Call declined via notification');
  }
});

// Background sync for offline messages
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);

  if (event.tag === 'send-pending-messages') {
    event.waitUntil(sendPendingMessages());
  }
});

// Function to send pending messages when back online
async function sendPendingMessages() {
  try {
    // Get pending messages from IndexedDB or similar
    // This would need to be implemented based on your offline storage strategy
    console.log('Sending pending messages...');
  } catch (error) {
    console.error('Error sending pending messages:', error);
  }
}

// Message event for communication with the main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});