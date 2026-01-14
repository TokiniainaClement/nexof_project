import { useEffect, useRef, useState } from 'react';

const useSocket = (token) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (token && !socketRef.current) {
      // Create mock socket for frontend-only functionality
      const mockSocket = {
        connected: true,
        listeners: new Map(),

        on: function(event, callback) {
          if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
          }
          this.listeners.get(event).push(callback);
        },

        off: function(event, callback) {
          if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
              listeners.splice(index, 1);
            }
          }
        },

        emit: function(event, data) {
          console.log('Mock socket emit:', event, data);
          // Simulate responses for certain events
          if (event === 'user_online') {
            setTimeout(() => {
              const connectListeners = this.listeners.get('connect');
              if (connectListeners) {
                connectListeners.forEach(callback => callback());
              }
            }, 100);
          }
        },

        close: function() {
          console.log('Mock socket closed');
          this.connected = false;
          setIsConnected(false);
        }
      };

      socketRef.current = mockSocket;
      setSocket(mockSocket);
      setIsConnected(true);

      // Simulate connection
      setTimeout(() => {
        const connectListeners = mockSocket.listeners.get('connect');
        if (connectListeners) {
          connectListeners.forEach(callback => callback());
        }
      }, 500);

      return () => {
        mockSocket.close();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      };
    }
  }, [token]);

  return { socket, isConnected };
};

export default useSocket;