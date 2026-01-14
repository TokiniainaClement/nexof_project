import { useState, useEffect } from 'react';
import { X, Clock, Calendar, Send, Trash2, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

export function MessageSchedulerModal({ isOpen, onClose, conversationId, currentUser, token }) {
  const [scheduledMessages, setScheduledMessages] = useState([]);
  const [showComposer, setShowComposer] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [formData, setFormData] = useState({
    content: '',
    scheduledFor: '',
    repeat: 'none',
    repeatInterval: 1,
    repeatUnit: 'days'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadScheduledMessages();
    }
  }, [isOpen]);

  const loadScheduledMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/scheduled/${conversationId}`, {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setScheduledMessages(data);
      }
    } catch (error) {
      console.error('Error loading scheduled messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim() || !formData.scheduledFor) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    const scheduledDate = new Date(formData.scheduledFor);
    if (scheduledDate <= new Date()) {
      toast.error('La date doit être dans le futur');
      return;
    }

    setLoading(true);
    try {
      const endpoint = editingMessage ? 'update' : 'schedule';
      const method = editingMessage ? 'PUT' : 'POST';

      const response = await fetch(`http://localhost:5000/api/messages/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          ...formData,
          conversationId,
          messageId: editingMessage?.id
        })
      });

      if (response.ok) {
        toast.success(editingMessage ? 'Message modifié' : 'Message programmé');
        resetForm();
        loadScheduledMessages();
      } else {
        throw new Error('Failed to schedule message');
      }
    } catch (error) {
      console.error('Error scheduling message:', error);
      toast.error('Erreur lors de la programmation');
    } finally {
      setLoading(false);
    }
  };

  const deleteScheduledMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/scheduled/${messageId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        toast.success('Message supprimé');
        loadScheduledMessages();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const editScheduledMessage = (message) => {
    setEditingMessage(message);
    setFormData({
      content: message.content,
      scheduledFor: new Date(message.scheduledFor).toISOString().slice(0, 16),
      repeat: message.repeat || 'none',
      repeatInterval: message.repeatInterval || 1,
      repeatUnit: message.repeatUnit || 'days'
    });
    setShowComposer(true);
  };

  const resetForm = () => {
    setFormData({
      content: '',
      scheduledFor: '',
      repeat: 'none',
      repeatInterval: 1,
      repeatUnit: 'days'
    });
    setEditingMessage(null);
    setShowComposer(false);
  };

  const formatScheduledTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRepeatLabel = (message) => {
    if (message.repeat === 'none') return 'Pas de répétition';

    const interval = message.repeatInterval;
    const unit = message.repeatUnit;

    const unitLabels = {
      minutes: 'minute(s)',
      hours: 'heure(s)',
      days: 'jour(s)',
      weeks: 'semaine(s)',
      months: 'mois'
    };

    return `Tous les ${interval} ${unitLabels[unit]}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-cyan-500/30 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-cyan-100">Messages programmés</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComposer(!showComposer)}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              {showComposer ? 'Annuler' : 'Nouveau message'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-140px)]">
          {/* Scheduled Messages List */}
          <div className="flex-1 border-r border-cyan-500/30 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-cyan-100 mb-4">Messages programmés</h3>

              {scheduledMessages.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-cyan-400/50 mx-auto mb-4" />
                  <p className="text-cyan-300/70">Aucun message programmé</p>
                  <p className="text-sm text-cyan-400/50 mt-2">Cliquez sur "Nouveau message" pour en créer un</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scheduledMessages.map((message) => (
                    <div
                      key={message.id}
                      className="bg-slate-700/50 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-cyan-100 mb-2">{message.content}</p>
                          <div className="flex items-center gap-4 text-sm text-cyan-300/70">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatScheduledTime(message.scheduledFor)}</span>
                            </div>
                            {message.repeat !== 'none' && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{getRepeatLabel(message)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => editScheduledMessage(message)}
                            className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4 text-cyan-400" />
                          </button>
                          <button
                            onClick={() => deleteScheduledMessage(message.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-cyan-400/70">
                        <span>Status: {message.status === 'pending' ? 'En attente' : 'Envoyé'}</span>
                        {message.nextSend && (
                          <span>Prochain envoi: {formatScheduledTime(message.nextSend)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Composer Panel */}
          {showComposer && (
            <div className="w-96 border-l border-cyan-500/30 p-6">
              <h3 className="text-lg font-medium text-cyan-100 mb-4">
                {editingMessage ? 'Modifier le message' : 'Nouveau message programmé'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Message Content */}
                <div>
                  <label className="block text-sm text-cyan-300 mb-2">Message</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 placeholder-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none"
                    rows={4}
                    placeholder="Tapez votre message..."
                    required
                  />
                </div>

                {/* Schedule Date/Time */}
                <div>
                  <label className="block text-sm text-cyan-300 mb-2">Date et heure d'envoi</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>

                {/* Repeat Options */}
                <div>
                  <label className="block text-sm text-cyan-300 mb-2">Répétition</label>
                  <select
                    value={formData.repeat}
                    onChange={(e) => setFormData(prev => ({ ...prev, repeat: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  >
                    <option value="none">Pas de répétition</option>
                    <option value="interval">À intervalle régulier</option>
                  </select>
                </div>

                {formData.repeat === 'interval' && (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm text-cyan-300 mb-2">Intervalle</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.repeatInterval}
                        onChange={(e) => setFormData(prev => ({ ...prev, repeatInterval: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-cyan-300 mb-2">Unité</label>
                      <select
                        value={formData.repeatUnit}
                        onChange={(e) => setFormData(prev => ({ ...prev, repeatUnit: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                      >
                        <option value="minutes">Minutes</option>
                        <option value="hours">Heures</option>
                        <option value="days">Jours</option>
                        <option value="weeks">Semaines</option>
                        <option value="months">Mois</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {editingMessage ? 'Modifier' : 'Programmer'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}