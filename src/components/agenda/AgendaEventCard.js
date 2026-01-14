import React from 'react';
import { Clock, MapPin, Tag, Edit, Trash2 } from 'lucide-react';

const AgendaEventCard = ({ event, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10 text-red-300';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300';
      case 'low': return 'border-green-500/50 bg-green-500/10 text-green-300';
      default: return 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'border-green-500/50 bg-green-500/10 text-green-300';
      case 'completed': return 'border-blue-500/50 bg-blue-500/10 text-blue-300';
      default: return 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300';
    }
  };

  return (
    <div className="backdrop-blur-md bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-400/30 rounded-lg p-4 hover:border-cyan-400/60 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-cyan-400 group-hover:animate-spin" />
          <div>
            <h3 className="font-semibold text-cyan-200 group-hover:text-cyan-100 transition-colors">
              {event.title}
            </h3>
            <p className="text-xs text-cyan-400/70">
              {event.startTime} - {event.endTime}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(event.priority)}`}>
            {event.priority}
          </span>
          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
      </div>

      {event.description && (
        <p className="text-sm text-cyan-300/80 mb-3">{event.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-cyan-400/70">
          {event.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{event.location}</span>
            </div>
          )}
          {event.tags && event.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{event.tags.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(event)}
              className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
            >
              <Edit className="w-3 h-3 text-cyan-400" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3 text-red-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaEventCard;