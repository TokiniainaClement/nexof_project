import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';

const AgendaNotificationPanel = ({
  notifications = [],
  onMarkAsRead,
  onDismiss
}) => {
  const defaultNotifications = [
    {
      id: '1',
      type: 'reminder',
      title: 'Réunion dans 15 minutes',
      message: 'Réunion équipe à 09:00',
      timestamp: '08:45',
      read: false,
    },
    {
      id: '2',
      type: 'alert',
      title: 'Tâche en retard',
      message: 'Synchroniser base données - délai dépassé',
      timestamp: '08:30',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Synchronisation terminée',
      message: 'Données mises à jour avec succès',
      timestamp: '08:15',
      read: true,
    },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Bell className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getNotificationStyle = (type, read) => {
    const baseStyle = "backdrop-blur-md border rounded p-3 transition-all duration-300";
    const readStyle = read ? "opacity-60" : "";

    switch (type) {
      case 'reminder':
        return `${baseStyle} bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-400/30 ${readStyle}`;
      case 'alert':
        return `${baseStyle} bg-gradient-to-r from-red-500/5 to-orange-500/5 border-red-400/30 ${readStyle}`;
      case 'success':
        return `${baseStyle} bg-gradient-to-r from-green-500/5 to-cyan-500/5 border-green-400/30 ${readStyle}`;
      default:
        return `${baseStyle} bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-cyan-400/30 ${readStyle}`;
    }
  };

  const unreadCount = displayNotifications.filter(n => !n.read).length;

  return (
    <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-400/30 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-purple-400" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{unreadCount}</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold text-purple-300">Notifications</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayNotifications.map((notification) => (
          <div key={notification.id} className={getNotificationStyle(notification.type, notification.read)}>
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-purple-200 truncate">
                  {notification.title}
                </h4>
                <p className="text-xs text-purple-300/80 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-purple-400/60 mt-2">
                  {notification.timestamp}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {!notification.read && onMarkAsRead && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="p-1 hover:bg-purple-500/20 rounded transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-3 h-3 text-purple-400" />
                  </button>
                )}
                {onDismiss && (
                  <button
                    onClick={() => onDismiss(notification.id)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    title="Dismiss"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayNotifications.length === 0 && (
        <div className="text-center py-8">
          <Bell className="w-8 h-8 text-purple-300/50 mx-auto mb-2" />
          <p className="text-sm text-purple-300/70">No notifications</p>
        </div>
      )}
    </div>
  );
};

export default AgendaNotificationPanel;