import { useState, useEffect } from 'react';
import { X, BarChart3, TrendingUp, Users, MessageSquare, Clock, Download } from 'lucide-react';
import { toast } from 'sonner';

export function ChatAnalyticsModal({ isOpen, onClose, conversationId, currentUser, token }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    if (isOpen && conversationId) {
      fetchAnalytics();
    }
  }, [isOpen, conversationId, timeRange]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/chat/analytics/${conversationId}?range=${timeRange}`,
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        throw new Error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Analytics error:', error);
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  const exportAnalytics = () => {
    if (!analytics) return;

    const dataStr = JSON.stringify(analytics, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `chat-analytics-${conversationId}-${timeRange}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-cyan-500/30 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-cyan-100">Statistiques de conversation</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportAnalytics}
              className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
              title="Exporter les statistiques"
            >
              <Download className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="p-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-4">
            <span className="text-sm text-cyan-300">Période:</span>
            <div className="flex gap-2">
              {[
                { value: 'day', label: 'Aujourd\'hui' },
                { value: 'week', label: 'Cette semaine' },
                { value: 'month', label: 'Ce mois' },
                { value: 'year', label: 'Cette année' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setTimeRange(value)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    timeRange === value
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-cyan-300">Chargement des statistiques...</span>
              </div>
            </div>
          ) : analytics ? (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-cyan-300">Messages totaux</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-100">{analytics.totalMessages}</div>
                </div>

                <div className="bg-slate-700/50 border border-violet-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-violet-400" />
                    <span className="text-sm text-violet-300">Participants actifs</span>
                  </div>
                  <div className="text-2xl font-bold text-violet-100">{analytics.activeParticipants}</div>
                </div>

                <div className="bg-slate-700/50 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-300">Messages/jour</span>
                  </div>
                  <div className="text-2xl font-bold text-green-100">{analytics.messagesPerDay}</div>
                </div>

                <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span className="text-sm text-orange-300">Temps réponse moyen</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-100">{analytics.avgResponseTime}</div>
                </div>
              </div>

              {/* Message Types Chart */}
              <div className="bg-slate-700/50 border border-cyan-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-cyan-100 mb-4">Types de messages</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.messageTypes).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm text-cyan-300 capitalize">{type}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-cyan-400 h-2 rounded-full"
                            style={{ width: `${(count / analytics.totalMessages) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-cyan-100 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-slate-700/50 border border-violet-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-violet-100 mb-4">Activité par jour</h3>
                <div className="space-y-2">
                  {analytics.activityTimeline.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-violet-300">{day.date}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-violet-400 h-2 rounded-full"
                            style={{ width: `${(day.messages / Math.max(...analytics.activityTimeline.map(d => d.messages))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-violet-100 w-8 text-right">{day.messages}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-slate-700/50 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-100 mb-4">Contributeurs les plus actifs</h3>
                <div className="space-y-3">
                  {analytics.topContributors.map((user, index) => (
                    <div key={user.userId} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xs font-bold text-background">
                          {user.displayName[0]}
                        </div>
                        <span className="text-sm text-green-300">{user.displayName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: `${(user.messageCount / Math.max(...analytics.topContributors.map(u => u.messageCount))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-green-100 w-8 text-right">{user.messageCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-100 mb-4">Taux d'engagement</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-orange-300">Messages avec réactions</span>
                      <span className="text-sm text-orange-100">{analytics.engagement.reactionsRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-orange-300">Messages lus</span>
                      <span className="text-sm text-orange-100">{analytics.engagement.readRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-orange-300">Taux de réponse</span>
                      <span className="text-sm text-orange-100">{analytics.engagement.responseRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 border border-pink-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-pink-100 mb-4">Analyse des sentiments</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-300">Messages positifs</span>
                      <span className="text-sm text-pink-100">{analytics.sentiment.positive}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-300">Messages neutres</span>
                      <span className="text-sm text-pink-100">{analytics.sentiment.neutral}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-300">Messages négatifs</span>
                      <span className="text-sm text-pink-100">{analytics.sentiment.negative}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <span className="text-cyan-300">Aucune donnée disponible</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}