import React from 'react';
import { CheckCircle, Circle, Edit, Trash2, Clock } from 'lucide-react';

const AgendaTaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10 text-red-300';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300';
      case 'low': return 'border-green-500/50 bg-green-500/10 text-green-300';
      default: return 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />;
      default: return <Circle className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="backdrop-blur-md bg-gradient-to-br from-cyan-400/5 to-blue-400/5 border border-cyan-400/40 rounded-lg p-4 hover:border-cyan-400/80 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleStatus?.(task.id)}
            className="hover:scale-110 transition-transform"
          >
            {getStatusIcon(task.status)}
          </button>
          <div className="flex-1">
            <h3 className={`font-semibold transition-colors ${
              task.status === 'completed'
                ? 'text-cyan-300/60 line-through'
                : 'text-cyan-200 group-hover:text-cyan-100'
            }`}>
              {task.title}
            </h3>
            {task.dueDate && (
              <p className="text-xs text-cyan-400/70 mt-1">
                Due: {task.dueDate}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ml-2 ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-cyan-300/80 mb-3">{task.description}</p>
      )}

      {task.progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-cyan-400/70 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-1 bg-gradient-to-r from-cyan-400/30 to-transparent rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {task.category && (
          <span className="text-xs text-cyan-400/70 bg-cyan-500/10 px-2 py-1 rounded">
            {task.category}
          </span>
        )}

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
            >
              <Edit className="w-3 h-3 text-cyan-400" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
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

export default AgendaTaskCard;