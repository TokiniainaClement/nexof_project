import { useState, useEffect } from 'react';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Réunion équipe',
    description: 'Synchronisation du projet avec l\'équipe',
    startTime: '09:00',
    endTime: '10:30',
    category: 'work',
    location: 'Salle de conférence A',
    tags: ['meeting', 'project'],
    priority: 'high',
    status: 'upcoming',
    date: new Date(),
  },
  {
    id: '2',
    title: 'Présentation client',
    description: 'Présentation des nouvelles fonctionnalités',
    startTime: '14:00',
    endTime: '15:00',
    category: 'work',
    location: 'Auditorium',
    tags: ['presentation', 'client'],
    priority: 'high',
    status: 'upcoming',
    date: new Date(),
  },
  {
    id: '3',
    title: 'Déjeuner',
    description: 'Pause déjeuner avec collègues',
    startTime: '12:30',
    endTime: '13:30',
    category: 'personal',
    location: 'Restaurant du quartier',
    tags: ['lunch'],
    priority: 'low',
    status: 'upcoming',
    date: new Date(),
  },
];

const mockTasks = [
  {
    id: '1',
    title: 'Synchroniser base données',
    description: 'Mettre à jour la base de données avec les dernières modifications',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-15',
    category: 'technical',
    progress: 0,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Analyser logs système',
    description: 'Examiner les logs pour identifier les anomalies',
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2024-01-16',
    category: 'maintenance',
    progress: 45,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Mettre à jour configs',
    description: 'Mettre à jour les fichiers de configuration',
    priority: 'low',
    status: 'completed',
    dueDate: '2024-01-14',
    category: 'technical',
    progress: 100,
    createdAt: new Date(),
  },
];

const mockNotifications = [
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
];

export const useEvents = () => {
  const [events, setEvents] = useState(mockEvents);
  const [loading, setLoading] = useState(false);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id, updates) => {
    setEvents(prev => prev.map(event =>
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const syncEvents = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    // In real implementation, this would sync with backend
  };

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    syncEvents,
  };
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [loading, setLoading] = useState(false);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' :
                          task.status === 'pending' ? 'in_progress' : 'completed';
        return {
          ...task,
          status: newStatus,
          progress: newStatus === 'completed' ? 100 : task.progress
        };
      }
      return task;
    }));
  };

  const syncTasks = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    // In real implementation, this would sync with backend
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    syncTasks,
  };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    dismissNotification,
    markAllAsRead,
  };
};

export const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date(Date.now() - 5 * 60000));

  const sync = async () => {
    setIsSyncing(true);
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastSyncTime(new Date());
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isSyncing,
    lastSyncTime,
    sync,
  };
};