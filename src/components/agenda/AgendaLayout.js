import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgendaHeader from './AgendaHeader';
import AgendaCalendar from './AgendaCalendar';
import AgendaDeviceStatus from './AgendaDeviceStatus';
import AgendaEventCard from './AgendaEventCard';
import AgendaTaskCard from './AgendaTaskCard';
import AgendaNotificationPanel from './AgendaNotificationPanel';
import { useEvents, useTasks, useNotifications, useSync } from '../../hooks/useAgenda';
import { Plus, Filter, Calendar, CheckSquare } from 'lucide-react';

const AgendaLayout = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('events');

  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();
  const { notifications, markAsRead, dismissNotification } = useNotifications();
  const { isSyncing, lastSyncTime, sync } = useSync();

  const handleHome = () => {
    navigate('/');
  };

  const filteredEvents = events.filter((event) => {
    const sameDay =
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear();
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    return sameDay && categoryMatch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const timeA = parseInt(a.startTime.replace(':', ''));
    const timeB = parseInt(b.startTime.replace(':', ''));
    return timeA - timeB;
  });

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;
    return categoryMatch;
  });

  const daysWithEvents = new Set(
    events.map((e) => e.date.getDate())
  );

  const handleSync = async () => {
    await sync();
  };

  const lastSyncTimeFormatted = lastSyncTime ? lastSyncTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) : 'Never';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AgendaHeader onSync={handleSync} lastSync={lastSyncTimeFormatted} isSyncing={isSyncing} onHome={handleHome} />

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 backdrop-blur-xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 border-r border-cyan-500/20 overflow-y-auto">
          <div className="p-4 space-y-4">
            <AgendaCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              eventsOnDates={daysWithEvents}
            />
            <AgendaDeviceStatus />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-cyan-400">
                  {selectedDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
                <p className="text-cyan-300/70 mt-1">
                  {activeTab === 'events'
                    ? `${sortedEvents.length} event${sortedEvents.length !== 1 ? 's' : ''} today`
                    : `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>

              <button className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md inline-flex items-center justify-center">
                <Plus className="w-4 h-4" />
                {activeTab === 'events' ? 'New Event' : 'New Task'}
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'events'
                    ? 'bg-cyan-600 text-white'
                    : 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Events
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'tasks'
                    ? 'bg-cyan-600 text-white'
                    : 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Tasks
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'work', 'personal', 'social', 'technical', 'maintenance'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      : 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20'
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
              {activeTab === 'events' ? (
                sortedEvents.length > 0 ? (
                  sortedEvents.map((event) => (
                    <AgendaEventCard
                      key={event.id}
                      event={event}
                      onEdit={(e) => console.log('Edit event:', e)}
                      onDelete={deleteEvent}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Filter className="w-12 h-12 text-cyan-300/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">No events</h3>
                    <p className="text-cyan-300/70 mb-4">
                      {selectedCategory === 'all'
                        ? 'No events scheduled for this date'
                        : `No ${selectedCategory} events scheduled for this date`}
                    </p>
                    <button className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md inline-flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                      Create Event
                    </button>
                  </div>
                )
              ) : (
                filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <AgendaTaskCard
                      key={task.id}
                      task={task}
                      onEdit={(t) => console.log('Edit task:', t)}
                      onDelete={deleteTask}
                      onToggleStatus={toggleTaskStatus}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckSquare className="w-12 h-12 text-cyan-300/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">No tasks</h3>
                    <p className="text-cyan-300/70 mb-4">
                      {selectedCategory === 'all'
                        ? 'No tasks available'
                        : `No ${selectedCategory} tasks available`}
                    </p>
                    <button className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md inline-flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                      Create Task
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </main>

        {/* Notification Panel */}
        <div className="p-4">
          <AgendaNotificationPanel
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onDismiss={dismissNotification}
          />
        </div>
      </div>
    </div>
  );
};

export default AgendaLayout;